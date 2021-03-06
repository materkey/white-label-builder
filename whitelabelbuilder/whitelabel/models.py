import uuid

from django.db.models import UUIDField

from whitelabelbuilder import settings
from django.db import models


class Task(models.Model):
    uuid = UUIDField(default=uuid.uuid4, editable=False)
    service_id = models.PositiveIntegerField(verbose_name='Идентификатор задачи')
    title = models.CharField(max_length=255, verbose_name='Имя задачи')

    about_us = models.CharField(max_length=255, verbose_name='О ресторане')
    vk = models.CharField(max_length=255, verbose_name='Ссылка в VK')
    instagram = models.CharField(max_length=255, verbose_name='Ссылка в Instagram')
    facebook = models.CharField(max_length=255, verbose_name='Ссылка в Facebook')
    site = models.CharField(max_length=255, verbose_name='Ссылка на сайт')

    primary_color = models.CharField(max_length=7, verbose_name='Главный цвет')
    url = models.CharField(max_length=255, verbose_name='Адрес загрузки')
    is_successful = models.BooleanField(verbose_name='Признак выполнения', default=False)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.DO_NOTHING, verbose_name='Автор')

    logo = models.ImageField(upload_to='logos', blank=True, null=True)
    about_us_photo = models.ImageField(upload_to='about_us_photos', blank=True, null=True)

    def get_author(self):
        return self.author or "UNKNOWN"

    def get_title(self):
        return u'Пользователь %s назначил задачу сборки' % self.author

    def get_service_id(self):
        return self.service_id

    def get_primary_color(self):
        return self.primary_color

    def get_id(self):
        return self.id

    def get_uuid(self):
        return self.uuid

    def __str__(self):
        return u'Задача: от %s' % self.author.username

    class Meta:
        verbose_name = u'Задача'
        verbose_name_plural = u'Задачи'
