from django.urls import path
from my_docker_django_app.views.v1.modules import (
    ModuleListView, EditableModuleListView, ModuleDetailView,
    ModuleCreateView, ModuleUpdateView, ModuleDeleteView
)

urlpatterns = [
    path('public/', ModuleListView.as_view(), name='module-list'),
    path('admin/', EditableModuleListView.as_view(), name='module-admin-list'),
    path('create/', ModuleCreateView.as_view(), name='module-create'),
    path('<int:pk>/', ModuleDetailView.as_view(), name='module-detail'),
    path('<int:pk>/update/', ModuleUpdateView.as_view(), name='module-update'),
    path('<int:pk>/delete/', ModuleDeleteView.as_view(), name='module-delete'),
]