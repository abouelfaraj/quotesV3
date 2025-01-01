from rest_framework.authentication import SessionAuthentication
from rest_framework import permissions
from rest_framework.views import APIView
from django.http import JsonResponse
from ..serializers.feed import feedSerializer
from ..forms.feeds import FeedForm
from ..models.Feed import Feed, TypeFeed
from ..models.Following import Following
from django.utils import timezone

def apiInfos(request):
    return JsonResponse({
        "name":"quotes API",
        "description":"API's for quotes socail media application", 
        "permissions":"Allowd by user authentication",
        "version": "0.3.0", 
        "date": str(timezone.now())
        })

class addNewFeed(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,) 
    
    def post(self, request):
        user = request.user.id
        type_feed = 1        
        content = request.data['content']
        
        newFeed = FeedForm({
            'user': user,
            'type_feed': type_feed,
            'content': content})
        if newFeed.is_valid():
            newFeed.save()
            return JsonResponse(safe=False, status=201)
        
        return JsonResponse({'error': 'Invalid data'}, status=400)
    
class getFeedsAll(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)
    
    def get(self, request):
        user = request.user
        feeds = Feed.objects.filter(user=user).order_by('created_at').all()
        allFeeds = feedSerializer(feeds, many=True)
        return JsonResponse({"Response": "True", "Search": allFeeds.data})
    
class getFeedsWhereIamfollow(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)  
    
    def get(self, request):
        followed_user_ids = Following.objects.filter(follower=request.user).values_list('followed', flat=True)
        
        feeds = Feed.objects.filter(user__in=followed_user_ids).select_related('user').values(
            'id', 'user__first_name','user__last_name', 'content', 'created_at'
        ).order_by('-created_at')
        
        feeds_list = []
        for feed in feeds:
            feeds_list.append({
                'id': feed['id'],
                'user': feed['user__first_name'] + ' ' + feed['user__last_name'],
                'content': feed['content'],
                'created_at': feed['created_at'],
                'likes_count': Feed.objects.get(id=feed['id']).likes_total(),
            })

        return JsonResponse(feeds_list, safe=False)
    
class TypeFeedView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        type_feeds = TypeFeed.objects.all().values('id', 'name', 'svg_path')
        return JsonResponse(list(type_feeds), safe=False)