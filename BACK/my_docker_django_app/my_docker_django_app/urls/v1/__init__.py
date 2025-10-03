from django.urls import include, path
from . import modules, sections, lessons, tests

urlpatterns = [
    path('modules/', include(modules.urlpatterns)),
    path('sections/', include(sections.urlpatterns)),
    path('lessons/', include(lessons.urlpatterns)),
    path('tests/', include(tests.urlpatterns))
]