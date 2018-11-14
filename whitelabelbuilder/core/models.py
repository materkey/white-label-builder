from __future__ import unicode_literals

from django.contrib.auth.models import AbstractUser
from django.db import models
from whitelabelbuilder import settings


class User(AbstractUser):
    comments_count = models.PositiveIntegerField(default=0)


class AuthoredMixin(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.DO_NOTHING, verbose_name='Автор')

    def get_author(self):
        return self.author or "UNKNOWN"

    class Meta:
        abstract = True


class DatedMixin(models.Model):
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Дата изменения')

    class Meta:
        abstract = True


class PublicationMixin(models.Model):
    text = models.CharField(max_length=255, verbose_name='Текст')
    is_deleted = models.BooleanField(default=False, verbose_name='Удален')

    class Meta:
        abstract = True
