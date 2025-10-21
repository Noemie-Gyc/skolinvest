from rest_framework import status
from rest_framework.test import APITestCase
from django.urls import reverse
from django.contrib.auth.models import User
from my_docker_django_app.models import Module, Section, Lesson

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
        #self.client.login(username="testuser", password="testpass")

        self.module = Module.objects.create(title="Module test", publication_date= "2025-06-13", user=self.user)
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


    # test our CREATE method
    def test_create_lesson(self):
        url = "/api/v1/lessons/"
        data = {
            "title": "Test Lesson",
            "url_video": "https://www.youtube.com/watch?v=Wq8BqYus40A&list=RDWq8BqYus40A&start_radio=1",  
            "module": self.module.id,
            "section": self.section.id,
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Lesson.objects.count(), 1)

 # Test our GET method to see the list of the sections, if we have two instances in our database we should have only two element in our list
    def test_list_lesson(self):
        Lesson.objects.create(title="L1", publication_date="2025-06-13", module=self.module, section=self.section)
        Lesson.objects.create(title="L2", publication_date="2025-06-13", module=self.module, section=self.section)

        url = "/api/v1/lessons/"
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    # Test our UPDATE/PATCH method
    def test_update_lesson(self):
        lesson = Lesson.objects.create(title="Old Title", publication_date="2025-06-13", module=self.module, section=self.section)
        url = f"/api/v1/lessons/{lesson.id}/"
        data = {"title": "Updated Title"}
        response = self.client.patch(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        lesson.refresh_from_db()
        self.assertEqual(lesson.title, "Updated Title")

    # Test our DELETE method
    def test_delete_lesson(self):
        lesson = Lesson.objects.create(title="To delete", publication_date="2025-06-13", module=self.module, section=self.section)
        url = f"/api/v1/lessons/{lesson.id}/"
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Lesson.objects.filter(id=lesson.id).exists())

    # Test a not exisiting section call, should have an error 404
    def test_lesson_not_found(self):
        url = "/api/v1/lessons/9999/"
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    # Test CREATE method with invalid data for example, an empty title
    def test_create_invalid_lesson(self):
        url = "/api/v1/lessons/"
        data = {
            "title": "",  
            "module": 9999  
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

   