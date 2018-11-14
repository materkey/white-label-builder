from rest_framework import serializers
import django.contrib.auth.password_validation as validators
from rest_framework.serializers import ModelSerializer

from core.models import User


class UserEditSerializer(ModelSerializer):
    password = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'password')

    def validate_password(self, data):
        validators.validate_password(password=data, user=User)
        return data

    def create(self, validated_data):
        return User.objects.create_user(
            validated_data.get('username'), validated_data.get('email'), validated_data.get('password'),
            first_name=validated_data.get('first_name'), last_name=validated_data.get('last_name')
        )
    def update(self, instance, validated_data):
        instance.username = validated_data.get('username')
        instance.email = validated_data.get('email')
        instance.set_password(validated_data.get('password'))
        instance.first_name = validated_data.get('first_name')
        instance.last_name = validated_data.get('last_name')
        instance.save()
        return instance



class UserReadSerializer(ModelSerializer):
    # def __init__(self, user):
        # if user.id ==

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', )
