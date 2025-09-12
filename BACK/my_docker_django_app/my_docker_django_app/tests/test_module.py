from rest_framework.test import APITestCase
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.urls import reverse
from django.contrib.auth.models import User
from my_docker_django_app.models import Module

class ModuleCRUDPermissionsTests(APITestCase):
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

        # Module creation for detail, update, delete tests
        self.module = Module.objects.create(title="Test Module", user_id=self.admin_user.id)

    def authenticate(self, token):
        self.client.cookies['access'] = token

    def test_create_module_as_admin(self):
        self.authenticate(self.admin_token)
        url = reverse("module-create")
        response = self.client.post(url, {"title": "Nouveau module"}, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_module_as_normal_user(self):
        self.authenticate(self.normal_token)
        url = reverse("module-create")
        response = self.client.post(url, {"title": "Nouveau module"}, format="json")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_create_module_anonymous(self):
        url = reverse("module-create")
        response = self.client.post(url, {"title": "Nouveau module"}, format="json")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_list_modules_anonymous(self):
        url = reverse("module-list")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_detail_module_as_admin(self):
        self.authenticate(self.admin_token)
        url = reverse("module-detail", args=[self.module.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_detail_module_as_normal_user(self):
        self.authenticate(self.normal_token)
        url = reverse("module-detail", args=[self.module.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_detail_module_anonymous(self):
        url = reverse("module-detail", args=[self.module.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_update_module_as_admin(self):
        self.authenticate(self.admin_token)
        url = reverse("module-update", args=[self.module.id])
        response = self.client.patch(url, {"title": "Module modifié"}, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_module_as_normal_user(self):
        self.authenticate(self.normal_token)
        url = reverse("module-update", args=[self.module.id])
        response = self.client.patch(url, {"title": "Non autorisé"}, format="json")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_update_module_anonymous(self):
        url = reverse("module-update", args=[self.module.id])
        response = self.client.patch(url, {"title": "Non autorisé"}, format="json")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_delete_module_as_admin(self):
        self.authenticate(self.admin_token)
        url = reverse("module-delete", args=[self.module.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_delete_module_as_normal_user(self):
        self.authenticate(self.normal_token)
        url = reverse("module-delete", args=[self.module.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_delete_module_anonymous(self):
        url = reverse("module-delete", args=[self.module.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_list_modules_as_admin(self):
        self.authenticate(self.admin_token)
        url = reverse("module-admin-list")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_list_modules_public(self):
        url = reverse("module-list")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    
