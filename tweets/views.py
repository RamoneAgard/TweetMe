from django.conf import settings
from django.db.models.query_utils import Q
from django.shortcuts import render, redirect
from django.http import HttpResponse, Http404, JsonResponse




ALLOWED_HOSTS = settings.ALLOWED_HOSTS
# Create your views here.

# home view
def home_view(request, *args, **kwargs):
    status = 200
    template_name = "pages/home.html"
    context = {}
    return render(request, template_name, context, status)

def tweet_list_view(request, *args, **kwargs):
    status = 200
    template_name = "tweets/list.html"
    context = {}
    return render(request, template_name, context, status)

def tweet_detail_view(request, tweet_id, *args, **kwargs):
    status = 200
    template_name = "tweets/detail.html"
    context = {"tweet_id": tweet_id}
    return render(request, template_name, context, status)

def tweet_profile_view(request, username, *args, **kwargs):
    status = 200
    template_name = "tweets/profile.html"
    context = {"profile_username": username}
    return render(request, template_name, context, status)

