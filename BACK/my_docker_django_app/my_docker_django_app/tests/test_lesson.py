from rest_framework.test import APITestCase
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.urls import reverse
from django.contrib.auth.models import User
from my_docker_django_app.models import Lesson
from my_docker_django_app.models import Module
from my_docker_django_app.models import Section

class LessonCRUDPermissionsTests(APITestCase):
    def setUp(self):
        # Admin user
        self.admin_user = User.objects.create_user(
            username="admin", password="adminpass", is_staff=True
        )
        self.admin_token = str(RefreshToken.for_user(self.admin_user).access_token)

        # Normal user
        self.normal_user = User.objects.create_user(
            username="user", password="userpass", is_staff=False
        )
        self.normal_token = str(RefreshToken.for_user(self.normal_user).access_token)

        # Lesson creation for detail, update, delete tests
        self.module = Module.objects.create(title="Test Module", user_id=self.admin_user.id)
        self.section = Section.objects.create(title="Test Section", module_id=self.module.id)
        self.lesson = Lesson.objects.create(title="Test Lesson", module_id=self.module.id, section_id=self.section.id)


    def authenticate(self, token):
        self.client.cookies['access'] = token

    def test_detail_lesson_as_normal_user(self):
        self.authenticate(self.normal_token)
        url = reverse("lesson-detail", args=[self.lesson.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_detail_lesson_anonymous(self):
        url = reverse("lesson-detail", args=[self.lesson.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_update_lesson_as_admin(self):
        self.authenticate(self.admin_token)
        url = reverse("lesson-detail", args=[self.lesson.id])
        response = self.client.patch(url, {"title": "video finance"}, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)


