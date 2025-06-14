from django.shortcuts import render,redirect, get_object_or_404
from django.http import HttpResponseForbidden
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .forms import RegisterForm
from .models import CustomUser

# Create your views here.

def register_page(request):
    if request.user.is_authenticated:
        return redirect('home_dashboard')
    else:
        if request.method == 'POST':
            user_form = RegisterForm(request.POST)
            if user_form.is_valid():
                user_form.save()
                messages.success(request, "¡Usuario creado con éxito! Ahora podés iniciar sesión.")
                return redirect('login')
        else:
            user_form = RegisterForm()
    return render(request, 'register.html', {
        'title': 'Register',
        'user_form': user_form,
    })



def login_page(request):
    if request.user.is_authenticated:
        return redirect('home_dashboard')
    else:
        if request.method == 'POST':
            username = request.POST.get('username')
            password = request.POST.get('password')

            user = authenticate(request, username=username, password=password)

            if user is not None:
                login(request, user)
                return redirect('home_dashboard')
            else:
                messages.warning(request, "Credenciales incorrectas. Intenta nuevamente.")
    return render (request, 'login.html',{
        'title':"Login"
    })


def logout_page(request):
    logout(request)
    return redirect('login')
   
