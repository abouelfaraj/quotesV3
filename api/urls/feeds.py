from django.urls import path
from ..views import feeds

urlpatterns = [
    path('feeds', feeds.getFeedsWhereIamfollow.as_view(), name='getFeedsWhereIamfollow'),
    path('addNewFeed', feeds.addNewFeed.as_view(), name='addNewFeed'),
     path('typefeeds', feeds.TypeFeedView.as_view(), name='typefeeds'),
]