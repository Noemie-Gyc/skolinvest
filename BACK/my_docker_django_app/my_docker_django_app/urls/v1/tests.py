from django.urls import path
from my_docker_django_app.views.v1 import e2eTest

urlpatterns = [
    path('cleanup/', e2eTest.cleanup_test_e2e_data, name='cleanup_test_data'),
]