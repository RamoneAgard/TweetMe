from django.contrib import admin

# Register your models here.
from .models import Tweet

class TweetAdmin(admin.ModelAdmin):
    # can change __str__ of model in model definition
    list_display = ['__str__', 'user']
    search_fields = ['content','user__username', 'user__email']
    class meta:
        model = Tweet

admin.site.register(Tweet, TweetAdmin)