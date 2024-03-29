from django.contrib.auth import get_user_model
from rest_framework import authentication

User = get_user_model()

class DevAuthentication(authentication.BasicAuthentication):
    def authenticate(self, request):
        qs = User.objects.filter(id=4)
        user = qs.first()
        return (user, None)