from django.db import models
from django.contrib.auth.models import User

class UserPicture(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    picture = models.BinaryField()
    
    class Meta:
        db_table = 'auth_user_picture'
        
    def __str__(self):
        return f"{self.user.username}'s Picture" 