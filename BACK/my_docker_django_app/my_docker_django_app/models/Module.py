from django.db import models;
from .User import User

class Status(models.TextChoices):
    PUBLISHED = 'published', 'Published'
    DRAFT = 'draft', 'Draft'

class Module(models.Model):
    publication_date = models.DateField(blank = True)
    modification_date = models.DateField
    title = models.CharField(max_length=255, null = False)
    thumbnail = models.CharField(max_length=255)
    status = models.CharField(
        max_length=10,
        choices=Status.choices, 
        default=Status.DRAFT  
    )
    user = models.ForeignKey(User, on_delete = models.PROTECT)

    
    def __str__(self):
        return self.title
  