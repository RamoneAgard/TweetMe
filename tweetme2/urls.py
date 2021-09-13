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
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView

from accounts.views import (
    login_view,
    logout_view,
    register_view
)

from tweets.views import ( 
    tweet_detail_view, 
    tweet_list_view,
    tweet_profile_view,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    # # paths to accounts app which handle login, logout, and registration
    path('login/', login_view),
    path('logout/', logout_view),
    path('register/', register_view),
    # path to list view / home page
    path('', tweet_list_view),
    # path to a sepcific tweet in detail view
    path('<int:tweet_id>', tweet_detail_view),
    # path to user tweets/profile
    path('profile/<str:username>', tweet_profile_view),
    # path to Tweets api points
    path('api/tweets/', include('tweets.api.urls')),
    # path to react front app
    path('react/', TemplateView.as_view(template_name='react_via_dj.html')),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)