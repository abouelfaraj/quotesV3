from django.contrib import admin
from .models.Feed import Feed, TypeFeed
from .models.Following import Following


@admin.register(TypeFeed)
class TypeFeedAdmin(admin.ModelAdmin):
    list_display = ('name',)

@admin.register(Feed)
class FeedAdmin(admin.ModelAdmin):
    list_display = ('user', 'type_feed', 'created_at')
    list_filter = ('user', 'type_feed')
    search_fields = ('user__username', 'type_feed__name')
    
@admin.register(Following)
class FollowingAdmin(admin.ModelAdmin):
    list_display = ('follower', 'followed')
    search_fields = ('follower__username', 'followed__username')