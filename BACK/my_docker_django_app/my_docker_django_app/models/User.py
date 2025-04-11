from django.db import models;

class Role(models.TextChoices):
    ADMIN = 'admin', 'Administrateur'
    APPRENANT = 'apprenant', 'Apprenant'

class User(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    role = models.CharField(
        max_length=10,
        choices = Role.choices,  
        default = Role.APPRENANT,  
    )

    def __str__(self):
        return f"{self.first_name} {self.last_name}"