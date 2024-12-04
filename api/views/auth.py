from django.contrib.auth import login, logout, authenticate, update_session_auth_hash
from django.contrib.auth.models import User
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from ..serializers import UserRegisterSerializer, UserLoginSerializer, UserSerializer, UserAuthInfoSerializer
from rest_framework import permissions, status
from ..validations import custom_validation, validate_email, validate_password
from django.http import JsonResponse
from ..models.Following import Following
from ..models.UserPicture import UserPicture
from django.core.files.storage import FileSystemStorage


class UserRegister(APIView):
    permission_classes = (permissions.AllowAny,)
    
    def post(self, request):
        clean_data = custom_validation(request.data)
        serializer = UserRegisterSerializer(data=clean_data)
        
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(clean_data)
            update_session_auth_hash(request, user)

            user = authenticate(username=clean_data['username'], password=clean_data['password'])
            if user is not None:
                login(request, user)

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(status=status.HTTP_400_BAD_REQUEST)

class UserAuthInfo(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)
 
    def post(self, request):
        user = request.user
        data = request.data

        serializer = UserAuthInfoSerializer(instance=user, data=data, partial=True)
        if serializer.is_valid(raise_exception=True):
            user = serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

 
def upload_file(request):
    return JsonResponse({'message': 'File uploaded successfully'})
    
class AddUserPicture(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)
    
    def post(self, request):
        user = request.user
        user_picture = request.FILES.get('picture')

        if user_picture:
            picture_content = user_picture.read()
            
        if user_picture:
            user_picture_instance, created = UserPicture.objects.update_or_create(
                user=user,
                defaults={'picture': picture_content},
            )

            if created:
                return JsonResponse({"message": "Picture added successfully.","file_url":user_picture.name}, status=status.HTTP_201_CREATED)
            else:
                return JsonResponse({"message": "Picture updated successfully."}, status=status.HTTP_200_OK)
        
        return JsonResponse({"error": "No picture provided."}, status=status.HTTP_400_BAD_REQUEST)

    
class UserLogin(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = (SessionAuthentication,)
	def post(self, request):
		data = request.data
		assert validate_email(data)
		assert validate_password(data)
		serializer = UserLoginSerializer(data=data)
		if serializer.is_valid(raise_exception=True):
			user = serializer.check_user(data)
			login(request, user)
			serializer = UserSerializer(user)
			return Response({'user': serializer.data}, status=status.HTTP_200_OK)


class UserLogout(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = ()
	def post(self, request):
		logout(request)
		return Response(status=status.HTTP_200_OK)


class UserView(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (SessionAuthentication,)
	
	def get(self, request):
		serializer = UserSerializer(request.user)
		return Response({'user': serializer.data}, status=status.HTTP_200_OK)

    
class UserList(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        user = request.user
        following_ids = Following.objects.filter(follower=user).values_list('followed_id', flat=True)
        users = User.objects.exclude(id__in=following_ids)[:10].values('id', 'first_name', 'last_name', 'email')
        
        return JsonResponse(list(users), safe=False)
		
class follow_user(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        followed_id = request.data.get('followed_id')
        follower = request.user
        followed_user = User.objects.get(id=followed_id)
        FollowNewUser = Following.objects.create(follower=follower, followed=followed_user)
        if (FollowNewUser):
            return JsonResponse({'message': 'Followed successfully'}, status=201)
        
        return JsonResponse({'error': 'Invalid request'}, status=400)