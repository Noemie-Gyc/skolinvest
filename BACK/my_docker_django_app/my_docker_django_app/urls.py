
from django.contrib import admin
from django.urls import include, path
from .views import api_home
from .views import ModuleListView, EditableModuleListView, SectionListCreateView, SectionDetailView, ModuleDetailView


urlpatterns = [
    path('admin', admin.site.urls),
    path("api/home/", api_home),
    path('api/auth/', include('authentification.urls')),
    path('api/public/modules/', ModuleListView.as_view()),
    path('api/admin/modules/', EditableModuleListView.as_view()),
    path('api/modules/<int:pk>/', ModuleDetailView.as_view(), name='module-detail'),
    # route to create a section (POST) or to get the whole list of section (GET)
    path('api/sections/', SectionListCreateView.as_view(), name='section-list-create'),
    # route with called to patch, get and delete
    path('api/sections/<int:pk>/', SectionDetailView.as_view(), name='section-detail'),
]




