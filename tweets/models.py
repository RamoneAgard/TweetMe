from django.db import models

# Create your models here.
''' 
black=True -- not required in Django
null=True -- not required in DB
upload_to -- directory to store file, DB saves location 
'''

class Tweet(models.Model):
    # id = models.AutoField(primary_key = True) -- created when stored
    content = models.TextField(blank=True, null=True)
    image = models.FieldFile(upload_to='images/', black=True, null=True)
