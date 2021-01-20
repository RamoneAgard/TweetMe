import random
from django.conf import settings
from django.shortcuts import render, redirect
from django.http import HttpResponse, Http404, JsonResponse
from django.utils.http import is_safe_url

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

def tweet_list_view(request, *args, **kwargs):
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

def tweet_create_view(request, *args, **kwargs):
    context = {}
    next_url = request.POST.get('next') or None
    template_name = 'components/forms.html'
    form = TweetForm(request.POST or None)
    if form.is_valid():
        obj = form.save(commit = False)
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
        obj = Tweet.objects.get(id = tweet_id)
        data["content"] = obj.content
    except:
        data["message"] = "Not Found"
        status = 404
        raise Http404

    # similar to json.dumps() content_type='application/json'
    return JsonResponse(data, status = status)
    
