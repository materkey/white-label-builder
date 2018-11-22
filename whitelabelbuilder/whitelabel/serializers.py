from rest_framework.serializers import ModelSerializer

from core.serializers import UserReadSerializer

from whitelabel.models import Task


class TaskReadSerializer(ModelSerializer):
    author = UserReadSerializer()

    class Meta:
        model = Task
        fields = ('id', 'title', 'is_successful', 'author', 'service_id', 'url')


class TaskEditSerializer(ModelSerializer):

    class Meta:
        model = Task
        fields = ('id', 'title', 'is_successful', 'author', 'service_id', 'primary_color', 'about_us', 'vk', 'instagram', 'facebook', 'site')
