from django.urls import path
from .views import (
    login_view,
    register_view,
    logout_view,
    get_user_details,
    forgot_password_view,
    reset_password_view,  # Import the new views
)

AppName = 'authentication'

urlpatterns = [
    path('login/', login_view, name='login'),
    path('register/', register_view, name='register'),
    path('logout/', logout_view, name='logout'),
    path('get-user-details/', get_user_details, name='get_user_details'),
    path('forgot-password/', forgot_password_view, name='forgot_password'),  # Forgot Password endpoint
    path('reset-password/', reset_password_view, name='reset_password'),    # Reset Password endpoint
]