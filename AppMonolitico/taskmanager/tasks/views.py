from django.shortcuts import render,redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.urls import reverse_lazy
from django.contrib import messages
from django.views.generic import ListView, CreateView, UpdateView, DeleteView
from .models import Lista, Tarea
from .forms import ListaForm, TareaForm
from django.views.generic import TemplateView

# Create your views here.

@login_required
def list_dashboard(request):
    return render(request, 'list/list_dashboard.html', {
        'title': "List"
    })

@login_required
def task_dashboard(request):
    listas = Lista.objects.filter(propietario=request.user)
    return render(request, 'task/task_dashboard.html', {
        'title': "Task",
        'lists': listas,
    })

@login_required
def task_detail(request, pk):
    tarea = get_object_or_404(Tarea, pk=pk)
    comentarios = tarea.comentarios.all()
    etiquetas = tarea.etiquetas.all()
    return render(request, 'task/task_detail.html', {
        'object': tarea,
        'comentarios': comentarios
    })


# Create
class ListCreateView(CreateView):
    model = Lista
    form_class = ListaForm
    template_name = 'list/create_list.html'
    success_url = reverse_lazy('list_dashboard')

    def form_valid(self, form):
        # Asignamos el usuario logueado como propietario
        form.instance.propietario = self.request.user
        messages.success(self.request, "¡Lista creada exitosamente!")
        return super().form_valid(form)



# Read
class ListView(ListView):
    model = Lista
    template_name = 'list/list_list.html'
    context_object_name = 'lists'



# Update
class ListUpdateView( UpdateView):
    model = Lista
    form_class = ListaForm
    template_name = 'list/update_list.html'
    success_url = reverse_lazy('list')

    def form_valid(self, form):
        messages.success(self.request, "¡Lista actualizada exitosamente!")
        return super().form_valid(form)



# Delete
class ListDeleteView( DeleteView):
    model = Lista
    template_name = 'list/delete_list.html'
    success_url = reverse_lazy('list')

    def delete(self, request, *args, **kwargs):
        messages.success(self.request, "¡Lista eliminada exitosamente!")
        return super().delete(request, *args, **kwargs)
    

# TAREAS

# Create
class TaskCreateView(CreateView):
    model = Tarea
    form_class = TareaForm
    template_name = 'task/create_task.html'
    success_url = reverse_lazy('task_list')

    def form_valid(self, form):
        messages.success(self.request, "¡Tarea creada exitosamente!")
        return super().form_valid(form)



# Read 
class TaskListView(TemplateView):
    template_name = 'task/list_task.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['listas'] = Lista.objects.filter(propietario=self.request.user).prefetch_related('tareas')
        return context


# Update
class TaskUpdateView(UpdateView):
    model = Tarea
    form_class = TareaForm
    template_name = 'task/update_task.html'
    success_url = reverse_lazy('task_list')


    def form_valid(self, form):
        messages.success(self.request, "¡Tarea actualizada exitosamente!")
        return super().form_valid(form)
    

# Delete
class TaskDeleteView(DeleteView):
    model = Tarea
    template_name = 'task/delete_task.html'
    success_url = reverse_lazy('task_list')


    def delete(self, request, *args, **kwargs):
        messages.success(self.request, "¡Tarea eliminada exitosamente!")
        return super().delete(request, *args, **kwargs)
    
