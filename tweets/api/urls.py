from django.urls import path
from .views import (
    tweet_detail_view,
    tweet_feed_view, 
    tweet_list_view,
    tweet_create_view,
    tweet_delete_view,
    tweet_action_view,
)

'''
BASE URL AT /api/tweets/ 
'''

urlpatterns = [
    # path to list view
    path('', tweet_list_view),
    # path to user's following feed
    path('feed/', tweet_feed_view),
    # api path to tweet actions (like, retweet) 
    path('action/', tweet_action_view),
    # path to create a tweet
    path('create/', tweet_create_view),
    # path to a sepcific tweet
    path('<int:tweet_id>/', tweet_detail_view),
    # api path to delete a tweet
    path('<int:tweet_id>/delete/', tweet_delete_view),
    

    
]