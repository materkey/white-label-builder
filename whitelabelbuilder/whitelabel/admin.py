from django.contrib import admin

from whitelabel.models import Task


@admin.register(Task)
class WhitelabelAdmin(admin.ModelAdmin):
    pass
