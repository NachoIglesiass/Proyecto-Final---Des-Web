from rest_framework import serializers
from taskmanager.models import Lista, Tarea, Comentario, Etiqueta



class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comentario
        fields = ['id','texto', 'tarea', 'fecha']
        read_only_fields = ['fecha', 'autor']



class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Etiqueta
        fields = ['id', 'nombre', 'tareas']
        


class TaskSerializer(serializers.ModelSerializer):
     comentarios = CommentSerializer (many=True, read_only=True)
     etiquetas = TagSerializer (many=True, read_only=True)
     class Meta:
         model = Tarea
         fields = ['id','titulo', 'descripcion', 'completada', 'lista', 'fecha_creacion', 'comentarios',  'etiquetas']
         read_only_fields = ['fecha_creacion']



class ListSerializer(serializers.ModelSerializer):
    tareas = TaskSerializer(many=True, read_only=True)
    propietario = serializers.StringRelatedField(read_only = True )

    class Meta:
        model = Lista
        fields = ['id','nombre', 'propietario','tareas']
        read_only_fields = ['propietario']
