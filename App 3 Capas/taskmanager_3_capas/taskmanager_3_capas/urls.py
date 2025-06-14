from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-taskmanager/', include('taskmanager.api.urls')), 
    path('api-account/', include('users.api.urls')), 
]