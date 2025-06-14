from django.urls import path
from tasks import views
from tasks.views import (
    ListCreateView, ListView, ListUpdateView, ListDeleteView,
    TaskCreateView, TaskListView, TaskUpdateView, TaskDeleteView
)

urlpatterns = [
    # Dashboards (home)
    path('task_dashboard/', views.task_dashboard, name="task_dashboard"),
    path('list_dashboard/', views.list_dashboard, name="list_dashboard"),

    # Rutas de Listas
    path('listas/', ListView.as_view(), name='list'), 
    path('listas/create/', ListCreateView.as_view(), name='lista_create'),
    path('listas/update/<int:pk>/', ListUpdateView.as_view(), name='lista_update'),
    path('listas/delete/<int:pk>/', ListDeleteView.as_view(), name='lista_delete'),

    # Rutas de Tareas
    path('tasks/list', TaskListView.as_view(), name='task_list'),
    path('tasks/create/', TaskCreateView.as_view(), name='task_create'),
    path('tasks/update/<int:pk>/', TaskUpdateView.as_view(), name='task_update'),
    path('tasks/delete/<int:pk>/', TaskDeleteView.as_view(), name='task_delete'),
    path('tarea/<int:pk>/detail', views.task_detail, name='task_detail'),
]
