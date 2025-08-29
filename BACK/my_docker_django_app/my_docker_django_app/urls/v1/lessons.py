from django.urls import path
from my_docker_django_app.views.v1.lessons import LessonListCreateView, LessonDetailView

urlpatterns = [
    path('', LessonListCreateView.as_view(), name='lesson-list-create'),
    path('<int:pk>/', LessonDetailView.as_view(), name='lesson-detail'),
]
