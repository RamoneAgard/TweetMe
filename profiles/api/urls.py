from django.urls import path

from .views import (
    profile_detail_api_view,
    #user_follow_view,
)

'''
BASE URL AT /api/profile/ 
'''

urlpatterns = [
    # api request to follow a user
    path('<str:username>/', profile_detail_api_view),
    # api request to follow a user
    path('<str:username>/follow', profile_detail_api_view)
]