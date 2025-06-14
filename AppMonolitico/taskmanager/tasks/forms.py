from django import forms
from .models import Lista, Tarea

class ListaForm(forms.ModelForm):
    class Meta:
        model = Lista
        fields = ['nombre'] 
        widgets = {
            'nombre': forms.TextInput(attrs={
                'placeholder': 'Ingrese el nombre de la lista',
                'id': 'nombre',
            }),
        }
        labels = {
            'nombre': 'Nombre de la Lista',
        }

class TareaForm(forms.ModelForm):
    class Meta:
        model = Tarea
        fields = ['titulo', 'descripcion', 'completada', 'lista']
        widgets = {
            'titulo': forms.TextInput(attrs={'placeholder': 'Título de la tarea'}),
            'descripcion': forms.Textarea(attrs={'placeholder': 'Descripción'}),
            'completada': forms.CheckboxInput(),
            'lista': forms.Select(),
        }
        labels = {
            'titulo': 'Título',
            'descripcion': 'Descripción',
            'completada': '¿Completada?',
            'lista': 'Lista a la que pertenece',
        }
