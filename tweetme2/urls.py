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
from tweets.views import (
    home_view, 
    tweet_detail_view, 
    tweet_list_view,
    tweet_create_view,
    tweet_delete_view,
    tweet_action_view
)

urlpatterns = [
    path('admin/', admin.site.urls),
    # path for home page
    path('', home_view),
    # path to list view
    path('tweets', tweet_list_view),
    # path to a sepcific tweet
    path('tweets/<int:tweet_id>', tweet_detail_view),
    # path to create a tweet
    path('create-tweet', tweet_create_view),
    # path to Tweets api points
    path('api/tweets/', include('tweets.urls')),

    
]
