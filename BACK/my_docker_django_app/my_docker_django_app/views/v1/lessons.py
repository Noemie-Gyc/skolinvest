from my_docker_django_app.models import Lesson
from my_docker_django_app.serializers import LessonSerializer
from users.permissions import IsBackOfficeUser
from rest_framework.generics import (
    ListCreateAPIView, RetrieveUpdateDestroyAPIView
)
from rest_framework.permissions import IsAuthenticated

# All lessons or create a new lesson
class LessonListCreateView(ListCreateAPIView):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer
    permission_classes = [IsBackOfficeUser]

# Retrieve, update, or delete a specific lesson
class LessonDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer
    permission_classes = [IsBackOfficeUser]