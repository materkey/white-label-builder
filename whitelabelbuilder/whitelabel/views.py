from rest_framework.viewsets import ModelViewSet

from whitelabel.models import Task
from whitelabel.serializers import TaskReadSerializer, TaskEditSerializer


class TaskViewSet(ModelViewSet):
    def get_queryset(self):
        qs = super().get_queryset()
        if not self.request.user.is_authenticated:
            return []
        return qs

    queryset = Task.objects.all()
    serializer_class = TaskReadSerializer

    def get_serializer_class(self):
        # print(self.get_object())
        serializer_class = self.serializer_class
        if self.request.method == 'POST':
            serializer_class = TaskEditSerializer
        return serializer_class
