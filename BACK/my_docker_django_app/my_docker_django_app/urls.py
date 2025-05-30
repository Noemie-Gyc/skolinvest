"""
URL configuration for my_docker_django_app project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"
"""



from django.contrib import admin
from django.urls import include, path
from .views import api_home
from .views import ModuleListView
# from .views import AdminDataView

urlpatterns = [
    path('admin', admin.site.urls),
    path("api/home/", api_home),
    path('api/auth/', include('authentification.urls')),
    path('api/modules/', ModuleListView.as_view(), name='module-list'),
    # La route de l'API
]





""""

from django.urls import path
from .views import HomeAPI

urlpatterns = [
    path("api/home/", HomeAPI.as_view()),  # Nouvelle route avec DRF
]

"
"""


