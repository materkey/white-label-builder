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


@receiver(post_save, sender=Task)
def starting_task_execution(instance, created=False, **kwargs):
    if created:
        build_task.apply_async([instance.uuid], {})

