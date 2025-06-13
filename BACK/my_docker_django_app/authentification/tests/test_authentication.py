# Imports user model by default
from django.contrib.auth.models import User
# This django rest framework imports the test class that will use an http test client
from rest_framework.test import APITestCase
# Import constants as status.HTTP_200_OK
from rest_framework import status
# Imports a function that will generate the URL from the name of the route
from django.urls import reverse

# Name of the class that heritates from APITestCase
# Test the authentication on the back office app.
class JWTAuthenticationTests(APITestCase):
    
    # Function that will be used for each case : take our URL associated to 'token_obtain_pair', get each case username and password
    # return a JSON response with data found in our test database.
    def authenticate(self, username, password):
        url = reverse('token_obtain_pair')
        data = {"username": username, "password": password}
        return self.client.post(url, data, format='json')
    
    # First test case : check if the super_user can connect properly
    def test_superuser_can_authenticate(self):
        User.objects.create_user(
            username="superuser",
            password="superpass",
            is_superuser=True,
            is_staff=False
        )

        response = self.authenticate("superuser", "superpass")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)

    # Second test case : check if the is_staff can connect properly
    def test_staff_user_can_authenticate(self):
        User.objects.create_user(
            username="staffuser",
            password="staffpass",
            is_staff=True,
            is_superuser=False
        )

        response = self.authenticate("staffuser", "staffpass")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)
    
    # Third test case : check if the user has both is_staff and is_superuser properties can connect properly
    def test_staff_and_superuser_can_authenticate(self):
        User.objects.create_user(
            username="bothuser",
            password="bothpass",
            is_staff=True,
            is_superuser=True
        )

        response = self.authenticate("bothuser", "bothpass")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)

    # Fourth test case : check if the user has none of is_staff and is_superuser properties cannot connect properly
    def test_non_privileged_user_cannot_authenticate(self):
        User.objects.create_user(
            username="regularuser",
            password="nopass",
            is_staff=False,
            is_superuser=False
        )

        response = self.authenticate("regularuser", "nopass")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("non autorisé", str(response.data).lower())
