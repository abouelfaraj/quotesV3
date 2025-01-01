from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from ..models.UserProfile import UserProfile
from django.core.exceptions import ValidationError
import base64

UserModel = get_user_model()

class UserProfileSerializer(serializers.ModelSerializer):
    picture = serializers.SerializerMethodField()

    class Meta:
        model = UserProfile
        fields = ('slug', 'country', 'city', 'profession', 'picture')

    def get_picture(self, obj):
        if obj.picture:
            return base64.b64encode(obj.picture).decode('utf-8')
        return None
    
    
class UserSerializer(serializers.ModelSerializer):
    userProfile = UserProfileSerializer()

    class Meta:
        model = UserModel
        fields = ('email', 'username', 'first_name', 'last_name','userProfile')

    def create(self, validated_data):
        profile_data = validated_data.pop('userProfile')
        user = UserModel.objects.create(**validated_data)
        UserProfile.objects.create(user=user, **profile_data)
        return user

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('userProfile', None)
        userProfile = instance.userProfile

        instance.email = validated_data.get('email', instance.email)
        instance.username = validated_data.get('username', instance.username)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.save()

        if profile_data:
            userProfile.phone = profile_data.get('phone', userProfile.phone)
            userProfile.address = profile_data.get('address', userProfile.address)
            userProfile.save()

        return instance

class UserLoginSerializer(serializers.Serializer):
	email = serializers.EmailField()
	password = serializers.CharField()
 
	def check_user(self, clean_data):
		user = authenticate(username=clean_data['email'], password=clean_data['password'])
		if user is None:
			raise ValidationError('user not found')
		return user
    
class UserRegisterSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = UserModel
        fields = '__all__'
        
    def create(self, clean_data):
        user_obj = UserModel.objects.create_user(username=clean_data['username'], email=clean_data['email'], password=clean_data['password'])
        user_obj.save()
        return user_obj

class UserAuthInfoSerializer(serializers.ModelSerializer):
    userProfile = UserProfileSerializer()

    class Meta:
        model = UserModel
        fields = ('email', 'username', 'first_name', 'last_name', 'userProfile')

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('userProfile', None)
        userProfile = instance.userProfile

        instance.email = validated_data.get('email', instance.email)
        instance.username = validated_data.get('username', instance.username)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.save()

        if profile_data:
            userProfile.slug = profile_data.get('slug', userProfile.slug)
            userProfile.country = profile_data.get('country', userProfile.country)
            userProfile.city = profile_data.get('city', userProfile.city)
            userProfile.profession = profile_data.get('profession', userProfile.profession)
            userProfile.picture = profile_data.get('picture', userProfile.picture)
            userProfile.save()

        return instance
