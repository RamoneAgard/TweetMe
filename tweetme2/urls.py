"""tweetme2 URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
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
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView

from accounts.views import (
    login_view,
    logout_view,
    register_view
)

from tweets.views import ( 
    home_view,
    tweet_detail_view, 
    tweet_list_view,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    # path to user feed view / home page
    path('', home_view),
    # # paths to accounts app which handle login, logout, and registration
    path('login/', login_view),
    path('logout/', logout_view),
    path('register/', register_view),
    # path to global list view
    path('global/', tweet_list_view),
    # path to a sepcific tweet in detail view
    path('<int:tweet_id>', tweet_detail_view),
    # path to Profile app views 
    re_path(r'profiles?/', include('profiles.urls')),
    # path to Tweets api points
    path('api/tweets/', include('tweets.api.urls')),
    # path to Profile api views 
    re_path(r'api/profiles?/', include('profiles.api.urls')),
    # *TEST URL* path to react front app Tweet Component
    path('react/', TemplateView.as_view(template_name='react_via_dj.html')),
    
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)