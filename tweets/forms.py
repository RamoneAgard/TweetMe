from django.conf import settings
from django import forms
from .models import Tweet

MAX_CONTENT_LENGTH = settings.MAX_CONTENT_LENGTH

class TweetForm(forms.ModelForm):
    class Meta:
        model = Tweet
        fields = ['content']
    
    def clean_content(self):
        content = self.cleaned_data.get("content")
        if len(content) > MAX_CONTENT_LENGTH:
            raise forms.ValidationError("This tweet is too long")
        return content