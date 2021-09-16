from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
# Create your tests here.
from .models import Profile

User = get_user_model()

class ProfileTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username = 'abc', password = 'somepass')
        self.userB = User.objects.create_user(username = 'def', password = 'somepass')

    def get_client(self):
        client = APIClient()
        client.login(username = self.user.username, password = 'somepass')
        return client

    def test_profile_created_via_signal(self):
        qs = Profile.objects.all()
        self.assertEqual(qs.count(), 2)

    def test_following(self):
        first = self.user
        second = self.userB
        first.profile.followers.add(second)
        second_user_following_whom = second.following.all()
        qs = second_user_following_whom.filter(user = first)
        first_user_folowing_none = first.following.all()
        self.assertTrue(qs.exists())
        self.assertFalse(first_user_folowing_none.exists())

    def test_follow_api_endpoint(self):
        client = self.get_client()
        response = client.post(f"/api/profiles/{self.userB.username}/follow",
            {"action": "follow"}
        )
        response_data = response.json()
        count = response_data.get("count")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(count, 1)


    def test_unfollow_api_endpoint(self):
        first = self.userB
        second = self.user
        first.profile.followers.add(second)
        client = self.get_client()
        response = client.post(f"/api/profiles/{self.userB.username}/follow",
            {"action": "unfollow"}
        )
        response_data = response.json()
        count = response_data.get("count")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(count, 0)

    def test_cannot_follow_api_endpoint(self):
        client = self.get_client()
        response = client.post(f"/api/profiles/{self.user.username}/follow",
            {"action": "follow"}
        )
        response_data = response.json()
        count = response_data.get("count")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(count, 0)

    


