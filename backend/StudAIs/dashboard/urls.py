from django.urls import path
from .views import dashboard

AppName = 'dashboard'

urlpatterns = [
    path('api/dashboard', dashboard, name='dashboard-api'),
]
