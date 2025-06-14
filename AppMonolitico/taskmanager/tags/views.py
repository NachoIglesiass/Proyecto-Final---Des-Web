from django.views.generic.edit import CreateView, UpdateView, DeleteView
from .models import Etiqueta
from .forms import TagForm
from django.urls import reverse_lazy
from django.shortcuts import render,redirect, get_object_or_404
from tasks.models import Tarea
# Create your views here.



class TagCreateView(CreateView):
    model = Etiqueta
    form_class = TagForm
    template_name = 'tags/create_tag.html'
    
    def form_valid(self, form):
        tarea = get_object_or_404(Tarea, pk=self.kwargs['tarea_id'])
        # Guardamos primero la etiqueta sin commitear
        self.object = form.save(commit=False)
        self.object.save() 
        self.object.tareas.add(tarea)  # Asociamos la tarea
        
        return redirect(self.get_success_url())  # Ahora no da error

  
    def get_success_url(self):
        tarea = self.object.tareas.first()
        return reverse_lazy('task_detail', kwargs={'pk': tarea.pk})



class TagUpdateView(UpdateView):
    model = Etiqueta
    form_class = TagForm
    template_name = 'tags/update_tag.html'

    def get_success_url(self):
        tarea = self.object.tareas.first()
        return reverse_lazy('task_detail', kwargs={'pk': tarea.pk})
    


class TagDeleteView(DeleteView):
    model = Etiqueta
    template_name = 'tags/delete_tag.html'

    def get_success_url(self):
        tarea = self.object.tareas.first()
        return reverse_lazy('task_detail', kwargs={'pk': tarea.pk})






