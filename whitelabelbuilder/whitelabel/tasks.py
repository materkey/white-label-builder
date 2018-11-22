import shlex

import os
from celery import shared_task
from subprocess import call, check_call
from urllib.parse import quote

# class Bundle:
#     task_id
#     service_id
from whitelabel.models import Task


@shared_task
def build_task(task_uuid, service_id, primary_color, about_us, vk, instagram, facebook, site, title):
    # print("BUILD_TASK")
    # bundle = Bundle(task_id, service_id))
    # print(task_uuid)
    # print(service_id)
    primary_color = "\\" + primary_color
    call('./build.sh {} {} {} {} {} {} {} {} {}'.format(task_uuid, service_id, primary_color,
    quote(about_us), vk, instagram, facebook, site, quote(title)), shell=True)
    # build_task_gradle.apply_async([task_uuid, service_id], {})
    # print("after generate")
    task = Task.objects.get(uuid=task_uuid)
    # print(Task.objects.get(uuid=task_uuid))
    # print(task.is_successful)
    # print(task.url)

    task.is_successful = True
    # print(task.is_successful)
    task.url = "/static/{}/whitelabel.apk".format(task_uuid)
    # print(task.url)
    task.save()
    # task = Task.objects.all().filter(uuid=task_uuid)[0]
    # task.is_successful = True
    # task.url = "/static/{}/whitelabel.apk".format(task_uuid)
    # task.commit()

    # if
    # os.listdir()
    # call('sh /home/materkey/lectoriy/src/build.sh', shell=True)

# @shared_task
# def build_task_gradle(task_uuid, service_id):
#     call('./build.sh {} {}'.format(task_uuid, service_id), shell=True)