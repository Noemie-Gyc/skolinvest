from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth.models import User
from my_docker_django_app.models import Module, Section

class SectionAPITests(APITestCase):
    # Function that sets up the environment to test the CRUD
    def setUp(self):
        # Creation of a user in the test_database with the right to connect to back office
        self.user = User.objects.create_user(
        username="testuser",
        password="testpass",
        is_staff=True 
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
        self.module = Module.objects.create(title="Test Module",  publication_date= "2025-06-13", user_id = self.user.id)

    # test our CREATE method
    def test_create_section(self):
        url = "/api/sections/"
        data = {
            "title": "Test Section",
            "publication_date": "2025-06-13",
            "module": self.module.id
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Section.objects.count(), 1)

    # Test our GET method to see the list of the sections, if we have two instances in our database we should have only two element in our list
    def test_list_sections(self):
        Section.objects.create(title="S1", publication_date="2025-06-13", module=self.module)
        Section.objects.create(title="S2", publication_date="2025-06-13", module=self.module)

        url = "/api/sections/"
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    # Test our UPDATE/PATCH method
    def test_update_section(self):
        section = Section.objects.create(title="Old Title", publication_date="2025-06-13", module=self.module)
        url = f"/api/sections/{section.id}/"
        data = {"title": "Updated Title"}
        response = self.client.patch(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        section.refresh_from_db()
        self.assertEqual(section.title, "Updated Title")

    # Test our DELETE method
    def test_delete_section(self):
        section = Section.objects.create(title="To delete", publication_date="2025-06-13", module=self.module)
        url = f"/api/sections/{section.id}/"
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Section.objects.filter(id=section.id).exists())

    # Test a not exisiting section call, should have an error 404
    def test_section_not_found(self):
        url = "/api/sections/9999/"
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    # Test CREATE method with invalid data for example, an empty title
    def test_create_invalid_section(self):
        url = "/api/sections/"
        data = {
            "title": "",  
            "module": 9999  
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)