from django.test import TestCase
from django.contrib.auth.models import User
from django.contrib.auth.models import User, AnonymousUser
from rest_framework.test import force_authenticate
from rest_framework.test import APIRequestFactory
from rest_framework.views import APIView
from rest_framework.response import Response
from users.permissions import IsBackOfficeUser


class MockView(APIView):
    permission_classes = [IsBackOfficeUser]
    
    def get(self, request):
        return Response({'message': 'success'})


class IsBackOfficeUserPermissionTest(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.view = MockView.as_view()
        
        # Creation of different types of users
        self.normal_user = User.objects.create_user(
            username='normal_user',
            password='testpass',
            is_staff=False,
            is_superuser=False
        )
        
        self.staff_user = User.objects.create_user(
            username='staff_user', 
            password='testpass',
            is_staff=True,
            is_superuser=False
        )
        
        self.superuser = User.objects.create_user(
            username='superuser',
            password='testpass',
            is_staff=False,
            is_superuser=True
        )
    # User not connected
    def test_permission_denied_for_not_connected_user(self):
        request = self.factory.get('/')
        request.user = AnonymousUser()

        response = self.view(request)
        self.assertEqual(response.status_code, 401)
        self.assertIn('Authentication credentials were not provided.', str(response.data['detail']))
        print(response.status_code)
        print(response.data)

    # User authenticated but neither staff nor superuser
    def test_permission_failed_for_normal_user(self):
        request = self.factory.get('/')
        request.user = self.normal_user
        force_authenticate(request, user=self.normal_user)
        
        response = self.view(request)
        self.assertEqual(response.status_code, 403)
        self.assertIn("Sorry, tu ne fais pas partie de la team administrateur.", response.data['detail'])

    # User authenticated and is staff
    def test_permission_succeed_for_staff_user(self):
        request = self.factory.get('/')
        request.user = self.staff_user
        force_authenticate(request, user=self.staff_user)
        response = self.view(request)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['message'], 'success')

    # User authenticated and is superuser
    def test_permission_succeed_for_superuser(self):
        request = self.factory.get('/')
        request.user = self.superuser
        force_authenticate(request, user=self.superuser)
        
        response = self.view(request)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['message'], 'success')
