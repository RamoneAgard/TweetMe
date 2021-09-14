from django.urls import path
from django.conf import settings

from .views import ( 
    profile_detail_view, 
    profile_update_view,
)

urlpatterns = [
    path('edit', profile_update_view),
    path('<str:username>', profile_detail_view),
    
]