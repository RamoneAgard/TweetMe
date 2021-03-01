from django.contrib import admin

# Register your models here.
from .models import Tweet, TweetLike

class TweetLikeAdmin(admin.TabularInline):
    model = TweetLike

class TweetAdmin(admin.ModelAdmin):
    # can change __str__ of model in model definition
    inlines = [TweetLikeAdmin]
    list_display = ['__str__', 'user']
    search_fields = ['content','user__username', 'user__email']
    class Meta:
        model = Tweet

admin.site.register(Tweet, TweetAdmin)