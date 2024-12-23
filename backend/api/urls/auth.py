from django.urls import path
from ..views import auth
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('add_user_picture', auth.AddUserPicture.as_view(), name='add_user_picture'),
    path('upload_file', auth.upload_file, name='upload_file'),
    path('FollowNewUser', auth.follow_user.as_view(), name='FollowNewUser'),
    path('UserList', auth.UserList.as_view(), name='UserList'),
    path('UserAuthInfo', auth.UserAuthInfo.as_view(), name='UserAuthInfos'),
	path('register', auth.UserRegister.as_view(), name='register'),
	path('login', auth.UserLogin.as_view(), name='login'),
	path('logout', auth.UserLogout.as_view(), name='logout'),
	path('user', auth.UserView.as_view(), name='user'),
]