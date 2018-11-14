from django.shortcuts import render
from django.contrib.auth import logout
from rest_framework.decorators import list_route
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from core.models import User
from core.permissions import IsOwnerOrReadOnly
from core.serializers import UserReadSerializer, UserEditSerializer


def logout_view(request):
    logout(request)
    user = request.user

    return render(request, 'core/login.html', {'user': user})


def login_view(request):
    user = request.user

    return render(request, 'core/login.html', {'user': user})


def cabinet_view(request):
    user = request.user

    return render(request, 'core/cabinet.html', {'user': user})


class UserViewSet(ModelViewSet):
    def get_queryset(self):
        qs = super().get_queryset()
        if not self.request.user.is_authenticated:
            return []
        return qs

    queryset = User.objects.all()
    serializer_class = UserReadSerializer
    permission_classes = (IsOwnerOrReadOnly, )

    def get_serializer_class(self):
        # print(self.get_object())
        serializer_class = self.serializer_class
        if self.request.method == 'POST':
            serializer_class = UserEditSerializer
        return serializer_class

    @list_route()
    def current(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            raise AuthenticationFailed()
        serializer = self.get_serializer_class()(request.user)
        return Response(serializer.data)
