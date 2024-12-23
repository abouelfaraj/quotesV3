from django.db import models
from django.contrib.auth.models import User
from .Following import Following

class TypeFeed(models.Model):
    name = models.CharField(max_length=100)
    svg_path = models.TextField(default='<!-- SVG Placeholder -->')
    
    def __str__(self):
        return self.name

class Feed(models.Model):
        
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    type_feed = models.ForeignKey(TypeFeed, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    likes = models.ManyToManyField(User, related_name='feed_likes', blank=True)
    # followed_users = models.ManyToManyField(User, related_name='following', blank=True)

    def __str__(self):
        return f"{self.user.username} - {self.type_feed.name}"
    
    def likes_total(self):
        return self.likes.count()