from django.urls import path
from .views import (
    login_view,
    register_view,
    logout_view,
    get_user_details,
    forgot_password_view,
    reset_password_view,
    verify_email_view,
    resend_verification_view,
)

AppName = 'authentication'

urlpatterns = [
    path('login/', login_view, name='login'),
    path('register/', register_view, name='register'),
    path('logout/', logout_view, name='logout'),
    path('get-user-details/', get_user_details, name='get_user_details'),
    path('forgot-password/', forgot_password_view, name='forgot_password'),
    path('reset-password/', reset_password_view, name='reset_password'),
    path('verify-email/', verify_email_view, name='verify_email'),
    path('resend-verification/', resend_verification_view, name='resend_verification'),
]