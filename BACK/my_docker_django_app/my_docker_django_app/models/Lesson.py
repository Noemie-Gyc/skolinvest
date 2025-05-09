from django.db import models;
from .Module import Module;
from .Section  import Section;

class Lesson(models.Model):
    publication_date = models.DateField(blank = True)
    modification_date = models.DateField(auto_now=True)
    title = models.CharField(max_length=255, null = False)
    url_video = models.CharField(max_length=255, null = False)
    module = models.ForeignKey(Module, on_delete = models.CASCADE)
    section = models.ForeignKey(Section, on_delete = models.CASCADE)


    def __str__(self):
        return self.title