from django.urls import path
from .views import TagCreateView, TagUpdateView, TagDeleteView

urlpatterns = [
    path('tarea/<int:tarea_id>/etiqueta/nuevo/', TagCreateView.as_view(), name='create_tag'),
    path('etiqueta/<int:pk>/editar/', TagUpdateView.as_view(), name='update_tag'),
    path('etiqueta/<int:pk>/eliminar/', TagDeleteView.as_view(), name='delete_tag'),
]
