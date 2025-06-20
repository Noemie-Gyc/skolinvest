from django.urls import include, path
from . import modules, sections

urlpatterns = [
    path('modules/', include(modules.urlpatterns)),
    path('sections/', include(sections.urlpatterns))
]