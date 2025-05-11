from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.tokens import RefreshToken
import json
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator

# Function to generate JWT tokens
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            identifier = data.get('username')  # Can be username or email
            password = data.get('password')

            # Check if identifier and password are provided
            if not identifier or not password:
                return JsonResponse({'error': 'Username/Email and password are required'}, status=400)

            # Check if the identifier is an email
            if '@' in identifier:
                try:
                    user = User.objects.get(email=identifier)
                    username = user.username  # Get the username associated with the email
                except User.DoesNotExist:
                    return JsonResponse({'error': 'Invalid email or password'}, status=400)
            else:
                username = identifier  # Treat the identifier as a username

            # Authenticate user
            user = authenticate(request, username=username, password=password)

            if user is not None:
                # Generate tokens for the authenticated user
                tokens = get_tokens_for_user(user)
                login(request, user)  # Log the user in
                return JsonResponse({'message': 'Login successful', 'tokens': tokens})
            else:
                return JsonResponse({'error': 'Invalid username/email or password'}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)
        except Exception as e:
            return JsonResponse({'error': f'An unexpected error occurred: {str(e)}'}, status=500)

    return JsonResponse({'error': 'POST request required'}, status=400)

@csrf_exempt
def register_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        firstname = data.get('firstname')  # Get first name
        lastname = data.get('lastname')    # Get last name
        email = data.get('email')          # Get email

        # Validate password strength
        try:
            validate_password(password)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

        # Check if the username or email already exists
        if User.objects.filter(username=username).exists():
            return JsonResponse({'error': 'Username already exists'}, status=400)
        if User.objects.filter(email=email).exists():
            return JsonResponse({'error': 'Email already exists'}, status=400)

        # Create a new user
        user = User.objects.create_user(
            username=username,
            password=password,
            first_name=firstname,  # Save first name
            last_name=lastname,    # Save last name
            email=email            # Save email
        )

        # Generate tokens for the newly created user
        tokens = get_tokens_for_user(user)

        return JsonResponse({'message': 'Registration successful', 'tokens': tokens})

    return JsonResponse({'error': 'POST request required'}, status=400)

@csrf_exempt
def logout_view(request):
    if request.method == 'POST':
        logout(request)
        return JsonResponse({'message': 'Logout successful'})
    return JsonResponse({'error': 'POST request required'}, status=400)

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_details(request):
    user = request.user
    return JsonResponse({
        'username': user.username,
        'email': user.email,
        'first_name': user.first_name,
        'last_name': user.last_name,
    })

from django.core.mail import send_mail
from django.utils.crypto import get_random_string
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth.hashers import make_password
import json

# Forgot Password View
@csrf_exempt
def forgot_password_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data.get('email')

            if not email:
                return JsonResponse({'error': 'Email is required'}, status=400)

            try:
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                return JsonResponse({'message': 'If the email is registered, you will receive reset instructions shortly.'})

            # Generate a password reset token
            token = default_token_generator.make_token(user)
            reset_url = f"http://localhost:3000/reset-password?token={token}"

            # Send reset email
            send_mail(
                subject="Password Reset Request",
                message=f"Click the link below to reset your password:\n\n{reset_url}",
                from_email="noreply@studais.com",
                recipient_list=[email],
            )

            return JsonResponse({'message': 'If the email is registered, you will receive reset instructions shortly.'})
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)
        except Exception as e:
            return JsonResponse({'error': f'An unexpected error occurred: {str(e)}'}, status=500)

    return JsonResponse({'error': 'POST request required'}, status=400)

# Reset Password View
@csrf_exempt
def reset_password_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            token = data.get('token')
            new_password = data.get('password')

            if not token or not new_password:
                return JsonResponse({'error': 'Token and new password are required'}, status=400)

            try:
                # Find the user associated with the token
                user = User.objects.get(email=data.get('email'))
                if not default_token_generator.check_token(user, token):
                    return JsonResponse({'error': 'Invalid or expired token'}, status=400)

                # Validate the new password
                validate_password(new_password)

                # Update the user's password
                user.password = make_password(new_password)
                user.save()

                return JsonResponse({'message': 'Password reset successful'})
            except User.DoesNotExist:
                return JsonResponse({'error': 'Invalid token or user not found'}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)
        except Exception as e:
            return JsonResponse({'error': f'An unexpected error occurred: {str(e)}'}, status=500)

    return JsonResponse({'error': 'POST request required'}, status=400)