# Generated by Django 2.1.3 on 2018-11-22 11:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('whitelabel', '0002_auto_20181122_0306'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='logo',
            field=models.ImageField(blank=True, null=True, upload_to='logos'),
        ),
    ]
