from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser

class UserModel(AbstractUser):
    pass

class UserProfile(models.Model):
    
    class Meta:
        db_table = 'auth_user_profile'
        
    userProfile = models.OneToOneField(User, related_name='userProfile', on_delete=models.CASCADE)
    slug = models.TextField()
    country = models.CharField(max_length=20)
    city = models.CharField(max_length=20)
    profession = models.CharField(max_length=50)
    picture = models.BinaryField()