from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient

from .models import Tweet

# Create your tests here.
User = get_user_model()

class TweetTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username = 'abc', password = 'somepass')
        self.userB = User.objects.create_user(username = 'def', password = 'somepass')
        Tweet.objects.create(user = self.user, content = "first test tweet")
        Tweet.objects.create(user = self.user, content = "second test tweet")
        Tweet.objects.create(user = self.userB, content = "third test tweet")
        self.currentCount = Tweet.objects.all().count()

    #--Example test--
    # def test_user_created(self):
    #     user = User.objecs.get(username = 'abc')
    #     self.assertEqual(user.username, 'abc')
    #     self.assertEqual(self.user.username, 'abc')

    def test_tweet_created(self):
        tweet = Tweet.objects.create(user = self.user, content = "forth test tweet")
        self.assertEqual(tweet.id, 4) 
        self.assertEqual(tweet.user , self.user)
    
    def get_client(self):
        client = APIClient()
        client.login(username = self.user.username, password = 'somepass')
        return client

    def test_api_login(self):
        client = self.get_client()
        response = client.get('/api/tweets/')
        self.assertEqual(response.status_code, 200)
        #print(response) 

    def test_tweet_list(self):
        client = self.get_client()
        response = client.get('/api/tweets/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 3)
       #print(response.json())

    def test_action_like(self):
        client = self.get_client()
        response = client.post('/api/tweets/action/', {'id': 1, 'action': 'like'})
        self.assertEqual(response.status_code, 200)
        #self.assertEqual(len(response.json()), 3)
        like_count = response.json().get('likes')
        self.assertEqual(like_count, 1)
        #print(response.json())

    def test_action_unlike(self):
        client = self.get_client()
        response = client.post('/api/tweets/action/', {'id': 2, 'action': 'like'})
        self.assertEqual(response.status_code, 200)
        response = client.post('/api/tweets/action/', {'id': 2, 'action': 'unlike'})
        self.assertEqual(response.status_code, 200)
        #self.assertEqual(len(response.json()), 3)
        like_count = response.json().get('likes')
        self.assertEqual(like_count, 0)
        #print(response.json())

    def test_action_retweet(self):
        client = self.get_client()
        current_count = self.currentCount
        response = client.post('/api/tweets/action/', {'id': 2, 'action': 'retweet'})
        self.assertEqual(response.status_code, 201)
        data = response.json()
        newTweetID = data.get('id')
        self.assertNotEqual(2, newTweetID)
        self.assertEqual(current_count + 1, newTweetID)

    def test_tweet_create_api(self):
        request_data = {
            'content': "This is a test tweet through api"
        }
        client = self.get_client()
        response = client.post('/api/tweets/create/', request_data)
        self.assertEqual(response.status_code, 201)
        response_data = response.json()
        newTweetID = response_data.get('id')
        self.assertEqual(self.currentCount + 1, newTweetID)
    
    def test_tweet_detail_api(self):
        client = self.get_client()
        response = client.get('/api/tweets/2/')
        self.assertEqual(response.status_code, 200)
        data = response.json()
        tweetID = data.get('id')
        self.assertEqual(tweetID, 2)

    def test_tweet_delete_api(self):
        client = self.get_client()
        response = client.delete('/api/tweets/1/delete/')
        self.assertEqual(response.status_code, 200)
        response = client.delete('/api/tweets/1/delete/')
        self.assertEqual(response.status_code, 404)
        response_wrong_permissions = client.delete('/api/tweets/3/delete/')
        # print(response_wrong_permissions.json())
        self.assertEqual(response_wrong_permissions.status_code, 403)
        # data = response.json()
        # _msg = data.get('message')
        # print(_msg)

    
    





