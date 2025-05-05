from django.db import models

class RecentActivity(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class UserProgress(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    quizzes_completed = models.IntegerField(default=0)
    questions_asked = models.IntegerField(default=0)

    def __str__(self):
        return f"Progress for {self.user.username}"
