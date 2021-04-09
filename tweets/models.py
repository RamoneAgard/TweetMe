from django.db import models
from django.conf import settings
import random

User = settings.AUTH_USER_MODEL

# Create your models here.
''' 
black=True -- not required in Django
null=True -- not required in DB
upload_to -- directory to store file, DB saves location 
'''

class TweetLike(models.Model):
    user = models.ForeignKey(User, on_delete= models.CASCADE)
    tweet = models.ForeignKey('Tweet', on_delete= models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add= True)

class Tweet(models.Model):
    # id = models.AutoField(primary_key = True) -- created when stored
    user = models.ForeignKey(User, on_delete = models.CASCADE) # each tweet has one user
    # Parent tweet for reference if this is a retweet
    parent = models.ForeignKey("self", null = True, on_delete = models.SET_NULL)
    content = models.TextField(blank = True, null = True)
    likes = models.ManyToManyField(User, related_name= 'tweet_user', blank=True, through= TweetLike)
    image = models.FileField(upload_to ='images/', blank = True, null = True)
    timestamp = models.DateTimeField(auto_now_add= True)

    # def __str__(self):
    #     return self.content 
    
    class Meta:
        ordering = ['-id']

    @property
    def is_retweet(self):
        return self.parent != None

    # Old Way of Serializing data 
    def serialize(self):
        return {
                "id" : self.id,
                "content" : self.content,
                "likes" : random.randint(0, 100)
            } 