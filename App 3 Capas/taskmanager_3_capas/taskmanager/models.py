from django.db import models
from django.contrib.auth.models import User

# Create your models here.


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

    def __str__(self):
        return self.titulo
    

class Comentario(models.Model):
    tarea = models.ForeignKey(Tarea, on_delete=models.CASCADE, related_name='comentarios')
    autor = models.ForeignKey(User, on_delete=models.CASCADE)
    texto = models.TextField()
    fecha = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.texto



class Etiqueta(models.Model):
    nombre = models.CharField(max_length=30)
    tareas = models.ManyToManyField(Tarea, related_name='etiquetas')

    def __str__(self):
        return self.nombre
