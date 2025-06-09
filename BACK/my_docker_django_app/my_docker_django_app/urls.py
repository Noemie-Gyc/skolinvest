
from django.contrib import admin
from django.urls import include, path
from .views import api_home
from .views import ModuleListView
from .views import EditableModuleListView
# from .views import AdminDataView

urlpatterns = [
    path('admin', admin.site.urls),
    path("api/home/", api_home),
    path('api/auth/', include('authentification.urls')),
    path('api/public/modules/', ModuleListView.as_view()),
    path('api/admin/modules/', EditableModuleListView.as_view()),
]




