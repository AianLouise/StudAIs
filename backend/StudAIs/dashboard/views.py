from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import RecentActivity, UserProgress

@api_view(['GET'])
def dashboard(request):
    # Fetch recent activities
    recent_activities = RecentActivity.objects.all().order_by('-created_at')[:5]
    recent_activities_data = [
        {"title": activity.title, "description": activity.description}
        for activity in recent_activities
    ]

    # Fetch user progress (use a default user or skip authentication)
    try:
        # Replace `request.user` with a default user or handle unauthenticated access
        progress_data = UserProgress.objects.first()  # Example: Fetch the first user's progress
        progress = {
            "quizzesCompleted": progress_data.quizzes_completed if progress_data else 0,
            "questionsAsked": progress_data.questions_asked if progress_data else 0,
        }
    except Exception:
        progress = {"quizzesCompleted": 0, "questionsAsked": 0}

    # Return the response
    return Response({
        "recentActivities": recent_activities_data,
        "progress": progress,
    })