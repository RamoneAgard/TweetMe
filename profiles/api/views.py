from django.conf import settings
from django.shortcuts import render, redirect
from django.http import HttpResponse, Http404, JsonResponse
from django.contrib.auth import get_user_model
from rest_framework import serializers

# from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from ..models import Profile
from ..serializers import PublicProfileSerializer

ALLOWED_HOSTS = settings.ALLOWED_HOSTS
User = get_user_model()
# Create your views here.

@api_view(['GET']) # client must send POST method
def profile_detail_api_view(request, username, *args, **kwargs):
    query_set = Profile.objects.filter(user__username = username)
    status = 200
    if not query_set.exists():
        status = 404
        return Response({"detail" : "User Not Found"}, status)
    profile_obj = query_set.first()
    serializer = PublicProfileSerializer(instance = profile_obj, context = {"request" : request})
    return Response(serializer.data, status)



@api_view(['GET','POST']) # client must send POST method
@permission_classes([IsAuthenticated])
def user_follow_view(request, username, *args, **kwargs):
    current_user = request.user
    if current_user.username == username:
        response_data = {
        "count": current_user.profile.followers.count()
        }
        return Response(response_data, status = 200)
        
    follow_user_qs = User.objects.filter(username = username)
    if not follow_user_qs.exists():
        return Response({}, status = 404)
    follow_user = follow_user_qs.first()
    follow_user_profile = follow_user.profile
    # --another way
    # profile = Profile.objects.filter(user__username = username).first()
    # try:
    #     data = request.data
    # except:
    #     pass

    data = request.data or {}
    action = data.get("action")
    if action == "follow":
        follow_user_profile.followers.add(current_user)
    elif action == "unfollow":
        follow_user_profile.followers.remove(current_user)
    else:
        pass
    response_data = {
        "count": follow_user_profile.followers.count()
    }
    return Response(response_data, status = 200)

