from adjacent import Client
from django.db.models.signals import post_save, post_init, pre_init
from django.dispatch import receiver

from whitelabel.models import Task
from whitelabel.tasks import *


@receiver(post_save, sender=Task)
def built_notify(instance, created, **kwargs):
    # print("IN MSG SEND")
    # print(instance.is_successful)
    if instance.is_successful:
        client = Client()
        client.publish("news", {"msg": "Приложение {} собрано".format(instance.title), "url": "{}".format(instance.url),
                                "value": {
                                    "id": instance.id,
                                    "url": instance.url,
                                    "is_successful": instance.is_successful,
                                }})
        response = client.send()
        print("MSG SENT")


@receiver(post_save, sender=Task)
def starting_task_execution(instance, created=False, **kwargs):
    if created:
        # print('START_TASK')
        build_task.apply_async([instance.get_uuid(), instance.get_service_id(), instance.get_primary_color()], {})

    # start_celery_task()

    # if created:
    #     e = Event()
    #     e.title = instance.get_title()
    #     e.author = instance.get_author()
    #     e.object = instance
    #     e.save()

# post_init.connect(starting_task_execution, sender=Task)
