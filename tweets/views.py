from django.shortcuts import render
from django.http import HttpResponse, Http404, JsonResponse
from .models import Tweet
import random

# Create your views here.

# home view
def home_view(request, *args, **kwargs):
    status = 200
    template_name = "pages/home.html"
    context = {}
    return render(request, template_name, context, status)


def tweet_list_view(request, *args, **kwargs):
    '''
    Rest API VIEW
    Consume by Javascript or Swift/Java/IOS/Android
    return json data
    '''
    
    queryset = Tweet.objects.all()
    tweetList = [ {
        "id" : x.id,
        "content" : x.content,
        "likes" : random.randint(0, 100)
        } for x in queryset ] 
    data = {
        "response" : tweetList
    }
    return JsonResponse(data)



# tweet_id is in kwargs "tweet_id" if not specified as argument
def tweet_detail_view(request, tweet_id, *args, **kwargs):
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
        obj = Tweet.objects.get(id=tweet_id)
        data["content"] = obj.content
    except:
        data["message"] = "Not Found"
        status = 404
        raise Http404

    # similar to json.dumps() content_type='application/json'
    return JsonResponse(data, status=status)
    
