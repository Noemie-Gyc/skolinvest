from django.urls import path
from my_docker_django_app.views.v1.sections import (
   SectionListCreateView, SectionDetailView
)

urlpatterns = [
    # route to create a section (POST) or to get the whole list of section (GET)
    path('', SectionListCreateView.as_view(), name='section-list-create'),
    # route with called to patch, get and delete
    path('<int:pk>/', SectionDetailView.as_view(), name='section-detail'),
]