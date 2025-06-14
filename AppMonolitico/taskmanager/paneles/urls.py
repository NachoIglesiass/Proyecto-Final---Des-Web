from django.urls import path
from paneles import views

urlpatterns = [
    path('', views.landing, name="landing"),
    path('landing/', views.landing, name="landing"),
    path('home/', views.home_dashboard, name="home_dashboard"),

]