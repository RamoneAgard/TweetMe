from django.urls import path

'''
BASE URL AT /api/tweets/ 
'''

urlpatterns = [
    # path to list view
    path('', tweet_list_view),
]