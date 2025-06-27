from django.db import models;
from .Module import Module;

class Section(models.Model):
    publication_date = models.DateField(blank = True, null=True)
    modification_date = models.DateField(auto_now=True)
    title = models.CharField(max_length=255, null = False)
    module = models.ForeignKey(Module, on_delete = models.CASCADE, related_name='sections')

    
    def __str__(self):
        return self.title