from django.urls import path

from .views import (
    user_follow_view,
)

'''
BASE URL AT /api/profile/ 
'''

urlpatterns = [
    # path to list view
    path('<str:username>/follow', user_follow_view)
]