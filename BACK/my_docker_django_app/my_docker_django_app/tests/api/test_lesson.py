from rest_framework import status
from rest_framework.test import APITestCase
from django.urls import reverse
from django.contrib.auth.models import User
from my_docker_django_app.models import Module, Section

class LessonsAPITests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="testuser",
            password="testpass",
            is_staff= True,
        )
        response = self.client.post('/api/auth/token/', {
            'username': 'testuser',
            'password': 'testpass',
        })
        self.assertEqual(response.status_code, 200)
        access_token = response.data['access']
        self.client.cookies['access'] = access_token

        # creation of useful data for lesson creation
        self.module = Module.objects.create(title="Module test", user=self.user)
        self.section = Section.objects.create(title="Section test", module=self.module)

    def test_create_lesson_with_invalid_video_url_fails(self):
        url = reverse("lesson-list-create")  
        data = {
            "title": "Leçon avec url invalide",
            "url_video": "https://dailymotion.com/video/xyz",  
            "module": self.module.id,
            "section": self.section.id,
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("url_video", response.data)
        self.assertEqual(response.data["url_video"][0], "L’URL doit être un lien YouTube ou Vimeo.")
