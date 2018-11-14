import unittest

from django.test import TestCase

# Create your tests here.
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from core.models import User


class UserTests(APITestCase):
    def test_create_user(self):
        url = reverse('user-list')
        data = {'username': 'test', 'email': 'test@test.com', 'first_name': 'Test', 'last_name': 'Tester',
                'password': 'testpass'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.all().first().username, 'test')
        self.assertEqual(User.objects.all().first().first_name, 'Test')
        self.assertEqual(User.objects.all().first().last_name, 'Tester')