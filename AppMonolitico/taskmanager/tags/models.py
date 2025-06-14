from django.db import models
from tasks.models import Tarea


# Create your models here.

class Etiqueta(models.Model):
    nombre = models.CharField(max_length=30)
    tareas = models.ManyToManyField(Tarea, related_name='etiquetas')

    def __str__(self):
        return self.nombre



