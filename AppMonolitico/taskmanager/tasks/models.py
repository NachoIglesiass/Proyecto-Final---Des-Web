from django.db import models
from django.contrib.auth import get_user_model

# Create your models here.

User = get_user_model()

class Lista(models.Model):
    nombre = models.CharField(max_length=100)
    propietario = models.ForeignKey(User, on_delete=models.CASCADE, related_name='listas')

    def __str__(self):
        return self.nombre

class Tarea(models.Model):
    titulo = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True)
    completada = models.BooleanField(default=False)
    lista = models.ForeignKey(Lista, on_delete=models.CASCADE, related_name='tareas')
    fecha_creacion = models.DateTimeField(auto_now_add=True)