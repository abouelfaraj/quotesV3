"""
URL configuration for quotes project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    
    # Add Django site authentication urls (for login, logout, password management)
    path('accounts/', include('django.contrib.auth.urls')),

    path('admin/', admin.site.urls),
        
    # APIs
    path('api/', include("api.urls.feeds")),
    path('api/', include("api.urls.auth")),
    
    # Internationalization
    path('i18n/', include('django.conf.urls.i18n')),
    
    # Serve the Frontend app
    path('feeds/', TemplateView.as_view(template_name='index.html')),
    path('api/token-auth/', obtain_auth_token),
    ]
