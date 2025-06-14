from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.

class CustomUser(AbstractUser):
    created_at = models.DateTimeField(auto_now_add=True, verbose_name = "Creado el")
    updated_at = models.DateTimeField(auto_now=True, verbose_name = "Ultima Actualizacion el")

    def __str__(self):
        return f"{self.first_name} {self.last_name} - ({self.username})"