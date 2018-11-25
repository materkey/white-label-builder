import pathlib
import shutil
from subprocess import call

from celery import shared_task

from whitelabel.models import Task


@shared_task
def build_task(uuid):
    instance = Task.objects.get(uuid=uuid)
    if instance.about_us_photo.name:
        about_us_photo_db = instance.about_us_photo.file
        path = '../white-label/res/drawable'
        pathlib.Path(path).mkdir(parents=True, exist_ok=True)
        about_us_photo_folder = open(path + '/about_photo.jpg', 'wb')
        print(shutil.copyfileobj(about_us_photo_db, about_us_photo_folder))
        about_us_photo_folder.close()
    if instance.logo.name:
        logo_db = instance.logo.file
        path = '../white-label/res/drawable'
        pathlib.Path(path).mkdir(parents=True, exist_ok=True)
        logo_folder = open(path + '/logo.png', 'wb')
        shutil.copyfileobj(logo_db, logo_folder)
        logo_folder.close()

        path_logo = '../white-label/res/mipmap-hdpi'
        pathlib.Path(path_logo).mkdir(parents=True, exist_ok=True)
        shutil.copy(path + '/logo.png', path_logo + '/ic_launcher_custom.png')

        path_logo = '../white-label/res/mipmap-mdpi'
        pathlib.Path(path_logo).mkdir(parents=True, exist_ok=True)
        shutil.copy(path + '/logo.png', path_logo + '/ic_launcher_custom.png')

        path_logo = '../white-label/res/mipmap-xhdpi'
        pathlib.Path(path_logo).mkdir(parents=True, exist_ok=True)
        shutil.copy(path + '/logo.png', path_logo + '/ic_launcher_custom.png')

        path_logo = '../white-label/res/mipmap-xxhdpi'
        pathlib.Path(path_logo).mkdir(parents=True, exist_ok=True)
        shutil.copy(path + '/logo.png', path_logo + '/ic_launcher_custom.png')

        path_logo = '../white-label/res/mipmap-xxxhdpi'
        pathlib.Path(path_logo).mkdir(parents=True, exist_ok=True)
        shutil.copy(path + '/logo.png', path_logo + '/ic_launcher_custom.png')

    primary_color = "\\" + instance.primary_color
    call('./build.sh \"{}\" \"{}\" {} \"{}\" \"{}\" \"{}\" \"{}\" \"{}\" \"{}\"'.format(instance.uuid,
                                                                                        instance.service_id,
                                                                                        primary_color,
                                                                                        instance.about_us, instance.vk,
                                                                                        instance.instagram,
                                                                                        instance.facebook,
                                                                                        instance.site, instance.title),
         shell=True)
    task = Task.objects.get(uuid=uuid)
    task.is_successful = True
    task.url = "/static/{}/whitelabel.apk".format(uuid)
    task.save()
