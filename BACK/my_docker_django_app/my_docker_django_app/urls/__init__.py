
from django.urls import include, path
from django.contrib import admin

urlpatterns = [
    path('api/v1/', include('my_docker_django_app.urls.v1')),
    path('admin/', admin.site.urls),
    path('api/auth/', include('authentification.urls')),
]