from django.urls import path
from .views import login_view, register_view, logout_view, get_user_details

urlpatterns = [
    path('login/', login_view, name='login'),
    path('register/', register_view, name='register'),
    path('logout/', logout_view, name='logout'),
    path('get-user-details/', get_user_details, name='get_user_details'),
]