from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import CustomUser

class RegisterForm(UserCreationForm):

    first_name = forms.CharField(
        label='Nombre',
        required=False,
        widget=forms.TextInput(attrs={
            'placeholder': 'Ingrese el nombre',
            'id': 'first_name'
        })
    )

    last_name = forms.CharField(
        label='Apellido',
        required=False,
        widget=forms.TextInput(attrs={
            'placeholder': 'Ingrese el apellido',
            'id': 'last_name'
        })
    )

    username = forms.CharField(
        label='Nombre de usuario',
        required=True,
        widget=forms.TextInput(attrs={
            'placeholder': 'Ingrese un nombre de usuario',
            'id': 'username'
        })
    )

    email = forms.EmailField(
        label='Email',
        required=True,
        widget=forms.EmailInput(attrs={
            'placeholder': 'Ingrese un email',
            'id': 'email'
        })
    )

    password1 = forms.CharField(
        required=True,
        label='Contraseña',
        widget=forms.PasswordInput(attrs={
            'placeholder': 'Cree una contraseña',
            'id': 'password1'
        })
    )

    password2 = forms.CharField(
        required=True,
        label='Confirmar contraseña',
        widget=forms.PasswordInput(attrs={
            'placeholder': 'Confirme la contraseña',
            'id': 'password2'
        })
    )

    class Meta:
        model = CustomUser
        fields = ['first_name', 'last_name', 'username', 'email', 'password1', 'password2']
