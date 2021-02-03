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

class Tweet(models.Model):
    # id = models.AutoField(primary_key = True) -- created when stored
    user = models.ForeignKey(User, on_delete = models.CASCADE) # each tweet has one user
    content = models.TextField(blank = True, null = True)
    image = models.FileField(upload_to ='images/', blank = True, null = True)

    # def __str__(self):
    #     return self.content 
    
    class Meta:
        ordering = ['-id']

    def serialize(self):
        return {
                "id" : self.id,
                "content" : self.content,
                "likes" : random.randint(0, 100)
            } 