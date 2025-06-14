from django.urls import path
from .views import CommentCreateView, ComentarioUpdateView, ComentarioDeleteView

urlpatterns = [
    path('tarea/<int:tarea_id>/comentario/nuevo/', CommentCreateView.as_view(), name='create_comment'),
    path('comentario/<int:pk>/editar/', ComentarioUpdateView.as_view(), name='update_comment'),
    path('comentario/<int:pk>/eliminar/', ComentarioDeleteView.as_view(), name='delete_comment'),
]
