from django.contrib.auth import login, logout, authenticate, update_session_auth_hash
from django.contrib.auth.models import User
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from django.http import JsonResponse
from ..serializers.user import (
    UserSerializer,
    UserAuthInfoSerializer,
    UserLoginSerializer,
    UserRegisterSerializer,
    UserProfileSerializer
)
from ..validations import (
    custom_validation,
    validate_email,
    validate_password
)
from ..models.Following import Following
from ..models.UserProfile import UserProfile
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


class AddUserPicture(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    def post(self, request):
        user = request.user
        user_picture = request.FILES.get('picture')

        if user_picture:
            picture_content = user_picture.read()
            user_picture_instance, created = UserProfile.objects.update_or_create(
                userProfile=user,
                defaults={'picture': picture_content},
            )
            
            serializer = UserProfileSerializer(user_picture_instance)
            base64_picture = serializer.get_picture(user_picture_instance)

            if created:
                return JsonResponse({"message": "Picture added successfully.", "file_content": base64_picture}, status=status.HTTP_201_CREATED)
            else:
                return JsonResponse({"message": "Picture updated successfully.", "file_content": base64_picture}, status=status.HTTP_200_OK)

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
            user = User.objects.select_related('userProfile').get(id=user.id)
            user_serializer = UserSerializer(user)
            return Response({'user': user_serializer.data}, status=status.HTTP_200_OK)


class UserLogout(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)


class UserView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response({'user': serializer.data}, status=status.HTTP_200_OK)


class UserList(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        user = request.user
        following_ids = Following.objects.filter(follower=user).values_list('followed_id', flat=True)
        users = User.objects.exclude(id__in=following_ids).values('id', 'first_name', 'last_name', 'email')[:10]

        return JsonResponse(list(users), safe=False)


class FollowUser(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        followed_id = request.data.get('followed_id')
        follower = request.user

        try:
            followed_user = User.objects.get(id=followed_id)
            Following.objects.create(follower=follower, followed=followed_user)
            return JsonResponse({'message': 'Followed successfully'}, status=201)
        except User.DoesNotExist:
            return JsonResponse({'error': 'User does not exist.'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

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
            
def upload_file(request):
    return JsonResponse({'message': 'File uploaded successfully'})