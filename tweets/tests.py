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

    def test_tweets_related_name(self):
        user = self.user
        self.assertEqual(user.tweets.count(), 2)

    def test_tweet_list(self):
        client = self.get_client()
        response = client.get('/api/tweets/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 3)
       #print(response.json())

    def test_action_like(self):
        client = self.get_client()
        response = client.post('/api/tweets/action/', {'id': 1, 'action': 'like'})
        #self.assertEqual(len(response.json()), 3)
        like_count = response.json().get('likes')
        #print(response.json())
        user = self.user
        user_like_instances_count = user.tweetlike_set.count()
        user_liked_tweets_count = user.tweet_user.count()

        self.assertEqual(response.status_code, 200)
        self.assertEqual(like_count, 1)
        self.assertEqual(user_like_instances_count, 1)
        self.assertEqual(user_like_instances_count, user_liked_tweets_count)

    def test_action_unlike(self):
        client = self.get_client()
        response = client.post('/api/tweets/action/', {'id': 2, 'action': 'like'})
        self.assertEqual(response.status_code, 200)

        response = client.post('/api/tweets/action/', {'id': 2, 'action': 'unlike'})
        #self.assertEqual(len(response.json()), 3)
        like_count = response.json().get('likes')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(like_count, 0)
        #print(response.json())

    def test_action_retweet(self):
        client = self.get_client()
        current_count = self.currentCount
        response = client.post('/api/tweets/action/', {'id': 2, 'action': 'retweet'})
        data = response.json()
        newTweetID = data.get('id')

        self.assertEqual(response.status_code, 201)
        self.assertNotEqual(2, newTweetID)
        self.assertEqual(current_count + 1, newTweetID)

    def test_tweet_create_api(self):
        request_data = {
            'content': "This is a test tweet through api"
        }
        client = self.get_client()
        response = client.post('/api/tweets/create/', request_data)
        response_data = response.json()
        newTweetID = response_data.get('id')

        self.assertEqual(response.status_code, 201)
        self.assertEqual(self.currentCount + 1, newTweetID)
    
    def test_tweet_detail_api(self):
        client = self.get_client()
        response = client.get('/api/tweets/2/')
        data = response.json()
        tweetID = data.get('id')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(tweetID, 2)

    def test_tweet_delete_api(self):
        client = self.get_client()
        response = client.delete('/api/tweets/1/delete/')
        self.assertEqual(response.status_code, 200)

        response = client.delete('/api/tweets/1/delete/')
        response_wrong_permissions = client.delete('/api/tweets/3/delete/')
        # print(response_wrong_permissions.json()) 

        self.assertEqual(response.status_code, 404)
        self.assertEqual(response_wrong_permissions.status_code, 403)
        # data = response.json()
        # _msg = data.get('message')
        # print(_msg)

    
    





