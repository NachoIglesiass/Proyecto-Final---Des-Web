from django import forms
from .models import Etiqueta


class TagForm(forms.ModelForm):
    class Meta:
        model = Etiqueta
        fields = ['nombre']
        widgets = {
            'nombre': forms.Textarea(attrs={'rows': 3, 'placeholder': 'Escribe tu etiqueta...'}),
        }
        labels = {
            'nombre': 'Etiqueta',
        }
