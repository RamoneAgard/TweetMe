from django.conf import settings
from django.db.models.query_utils import Q
from django.shortcuts import render, redirect
from django.http import HttpResponse, Http404, JsonResponse
from django.utils.http import is_safe_url
from django.contrib.auth import get_user_model

# from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from ..models import Profile

ALLOWED_HOSTS = settings.ALLOWED_HOSTS
User = get_user_model()
# Create your views here.

@api_view(['POST']) # client must send POST method
@permission_classes([IsAuthenticated])
def user_follow_view(request, username, *args, **kwargs):
    current_user = request.user
    to_follow_user = ...
    return Response({}, status = 400)

