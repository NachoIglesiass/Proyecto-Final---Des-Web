from taskmanager.models import Lista, Tarea, Etiqueta, Comentario
from rest_framework import viewsets, permissions
from .serializers import ListSerializer,TaskSerializer, CommentSerializer, TagSerializer



class ListViewSet(viewsets.ModelViewSet):
    serializer_class = ListSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
         return Lista.objects.filter(propietario=self.request.user)

    def perform_create(self, serializer):
        serializer.save(propietario=self.request.user)



class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

        
    def get_queryset(self):
         return Tarea.objects.filter(lista__propietario=self.request.user)



class TagViewSet(viewsets.ModelViewSet):
    serializer_class = TagSerializer
    permission_classes = [permissions.IsAuthenticated]


    def get_queryset(self):
         return Etiqueta.objects.filter(tareas__lista__propietario=self.request.user)



class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]


    def get_queryset(self):
         return Comentario.objects.filter(autor=self.request.user)

    def perform_create(self, serializer):
        serializer.save(autor=self.request.user)

