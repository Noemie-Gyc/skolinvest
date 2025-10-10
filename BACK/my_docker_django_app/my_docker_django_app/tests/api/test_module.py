from rest_framework.test import APITestCase
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.urls import reverse
from django.contrib.auth.models import User
from my_docker_django_app.models import Module

class ModulesAPITests(APITestCase):
    # Function that sets up the environment to test the CRUD
    def setUp(self):
        # Creation of a user in the test_database with the right to connect to back office
        self.user = User.objects.create_user(
        username="testuser",
        password="testpass",
        is_staff=True,
        is_superuser=False
        )
        # Generation of the token required to access to the section's edition by calling the URL to check user
        response = self.client.post('/api/auth/token/', {
        'username': 'testuser',
        'password': 'testpass',
        })
        self.assertEqual(response.status_code, 200)
        access_token = response.data['access']
        # Add the access token to the cookie "access" of the fake client. Client is a django tool to mock HTTP request to the app without the real server.
        # Mock a client on the browser or Postman
        self.client.cookies['access'] = access_token
        self.client.login(username="testuser", password="testpass")
        
        # Mock the creation of the Module with the mandatory datas. 
        self.module = Module.objects.create(title="Module mocké", user_id = self.user.id)

    def test_create_module(self):
        url = reverse("module-create")
        data = {
            "title": "Module créé via test",
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Module.objects.count(), 2)

    def test_list_public_modules(self):
        url = reverse("module-list")
        self.client.logout()  # simulate public access (pas authentifié)
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)

    def test_get_module_detail(self):
        url = reverse("module-detail", args=[self.module.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["title"], "Module mocké")

    def test_update_module(self):
        url = reverse("module-update", args=[self.module.id])
        data = {"title": "Titre modifié"}
        response = self.client.patch(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.module.refresh_from_db()
        self.assertEqual(self.module.title, "Titre modifié")

    def test_delete_module(self):
        url = reverse("module-delete", args=[self.module.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Module.objects.filter(id=self.module.id).exists())

    def test_list_public_modules(self):
        url = reverse("module-list")
        self.client.logout()  
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)
    
    
