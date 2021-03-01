import random
from django.conf import settings
from django.shortcuts import render, redirect
from django.http import HttpResponse, Http404, JsonResponse
from django.utils.http import is_safe_url

from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import TweetSerializer, TweetActionSerializer

from .models import Tweet
from .forms import TweetForm

ALLOWED_HOSTS = settings.ALLOWED_HOSTS
# Create your views here.

# home view
def home_view(request, *args, **kwargs):
    status = 200
    template_name = "pages/home.html"
    context = {}
    return render(request, template_name, context, status)


# Django Rest Framework
@api_view(['GET'])
def tweet_list_view(request, *args, **kwargs):
    queryset = Tweet.objects.all()
    serializer = TweetSerializer(queryset, many = True)
    return Response(serializer.data)

# Django Rest Framework
@api_view(['POST']) # client must send POST method
# @authentication_classes([SessionAuthentication]) if we wanted to specify how to be authenticated
@permission_classes([IsAuthenticated])
def tweet_create_view(request, *args, **kwargs):
    serializer = TweetSerializer(data = request.POST)
    if serializer.is_valid(raise_exception = True):
        serializer.save(user = request.user)
        return Response(serializer.data, status = 201)
    return Response({}, status = 400)


# Django Rest Framework
@api_view(['GET'])
def tweet_detail_view(request, tweet_id, *args, **kwargs):
    queryset = Tweet.objects.filter(id = tweet_id)
    if not queryset.exists():
        return Response({}, status = 404)
    obj = queryset.first()
    serializer = TweetSerializer(obj)
    return Response(serializer.data, status = 200)

# Django Rest Framework
@api_view(['DELETE', 'POST'])
@permission_classes([IsAuthenticated])
def tweet_delete_view(request, tweet_id, *args, **kwargs):
    queryset = Tweet.objects.filter(id = tweet_id)
    if not queryset.exists():
        return Response({}, status = 404)
    queryset = queryset.filter(user = request.user)
    if not queryset.exists():
        return Response({"message": "You cannot delete this tweet"}, status = 404)
    obj = queryset.first()
    obj.delete()
    return Response({"message": "Tweet removed"}, status = 200)

# Django Rest Framework
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def tweet_action_view(request, *args, **kwargs):
    '''
    id is required
    Actions: like, unlike, retweet
    '''
    serializer = TweetActionSerializer(data = request.POST)
    if serializer.is_valid(raise_exception = True):
        data = serializer.validated_data
        tweet_id = data.get("id")
        action = data.get("action")

    queryset = Tweet.objects.filter(id = tweet_id)
    if not queryset.exists():
        return Response({}, status = 404)
    obj = queryset.first()
    if action == "like":
        obj.likes.add(request.user)
    elif action == "unlike":
        obj.likes.remove(request.user)
    elif action == "retweet":
        #todo 
        pass


        
    return Response({"message": "Tweet liked"}, status = 200)

# Pure Django
def tweet_list_view_pure_django(request, *args, **kwargs):
    '''
    Rest API VIEW
    Consume by Javascript or Swift/Java/IOS/Android
    return json data
    '''
    
    queryset = Tweet.objects.all()
    tweetList = [ x.serialize() for x in queryset ] 
    data = {
        "response" : tweetList
    }
    return JsonResponse(data)


def tweet_create_view_pure_django(request, *args, **kwargs):
    '''
    REST API Create View -> Django Rest Framework
    '''
    # request.user is AnonymousUser if not authenticated
    user = request.user 
    if not request.user.is_authenticated:
        # user = None
        if request.is_ajax:
            return JsonResponse({}, status=401)
        return redirect(settings.LOGIN_URL)
    context = {}
    next_url = request.POST.get('next') or None
    template_name = 'components/forms.html'
    form = TweetForm(request.POST or None)
    if form.is_valid():
        obj = form.save(commit = False)
        obj.user = user
        obj.save()
        if request.is_ajax():
            return JsonResponse(obj.serialize(), status = 201) # 201 == created items
        if next_url != None and is_safe_url(next_url, ALLOWED_HOSTS):
           return redirect(next_url)
        form = TweetForm()
    if form.errors:
        if request.is_ajax():
            return JsonResponse(form.errors, status = 400)
    context['form'] = form
    return render(request, template_name, context)


# tweet_id is in kwargs "tweet_id" if not specified as argument
def tweet_detail_view_pure_django(request, tweet_id, *args, **kwargs):
    '''
    Rest API VIEW
    Consume by Javascript or Swift/Java/IOS/Android
    return json data
    '''
    # create dictionary for json data and status
    data = { 
        "id": tweet_id
    }
    status = 200

    try:
        obj = Tweet.objects.get(id = tweet_id)
        data["content"] = obj.content
    except:
        data["message"] = "Not Found"
        status = 404
        raise Http404

    # similar to json.dumps() content_type='application/json'
    return JsonResponse(data, status = status)
    
