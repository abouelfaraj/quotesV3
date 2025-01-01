from rest_framework import serializers
from ..models.Feed import Feed
from django.core.exceptions import ValidationError

FeedModel = Feed

class feedSerializer(serializers.ModelSerializer):
	class Meta:
		model = FeedModel
		fields = "__all__"