from django.db import models;
from .Module import Module;
from .Section  import Section;

class Lesson(models.Model):
    publication_date = models.DateField(blank = True, null=True)
    modification_date = models.DateField(auto_now=True)
    title = models.CharField(max_length=255, null = False)
    """url_video = models.CharField(max_length=255, null = True)"""
    url_video = models.FileField(upload_to='videos/', null=True, blank=True)
    module = models.ForeignKey(Module, on_delete = models.CASCADE)
    section = models.ForeignKey(Section, on_delete = models.CASCADE, related_name='lessons')


    def __str__(self):
        return self.title