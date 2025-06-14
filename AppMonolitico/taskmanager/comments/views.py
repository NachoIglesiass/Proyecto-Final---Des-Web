from django.views.generic.edit import CreateView, UpdateView, DeleteView
from .models import Comentario
from .forms import ComentarioForm
from django.urls import reverse_lazy
from django.shortcuts import render,redirect, get_object_or_404
from tasks.models import Tarea
# Create your views here.



class CommentCreateView(CreateView):
    model = Comentario
    form_class = ComentarioForm
    template_name = 'comments/create_comment.html'
    
    def form_valid(self, form):
        tarea = get_object_or_404(Tarea, pk=self.kwargs['tarea_id'])
        form.instance.tarea = tarea
        form.instance.autor = self.request.user
        return super().form_valid(form)
    
    def get_success_url(self):
        return reverse_lazy('task_detail', kwargs={'pk': self.object.tarea.pk})



class ComentarioUpdateView(UpdateView):
    model = Comentario
    form_class = ComentarioForm
    template_name = 'comments/update_comment.html'

    def get_success_url(self):
        return reverse_lazy('task_detail', kwargs={'pk': self.object.tarea.pk})
    


class ComentarioDeleteView(DeleteView):
    model = Comentario
    template_name = 'comments/delete_comment.html'

    def get_success_url(self):
        return reverse_lazy('task_detail', kwargs={'pk': self.object.tarea.pk})


