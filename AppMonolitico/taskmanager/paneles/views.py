from django.shortcuts import render, redirect

# Create your views here.


def landing(request):
    if request.user.is_authenticated:
         return redirect('home_dashboard')  
    return render(request, 'landing/landing.html', {
        'title': 'Landing'
    })



def home_dashboard(request):
     return render (request, 'home/home_dashboard.html',{
          'title': "Home",
     })

