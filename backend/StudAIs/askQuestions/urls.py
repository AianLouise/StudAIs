from django.urls import path
from . import views

AppName = 'askQuestions'

urlpatterns = [
    path('api/ask-question/', views.ask_question, name='ask_question'),
]
