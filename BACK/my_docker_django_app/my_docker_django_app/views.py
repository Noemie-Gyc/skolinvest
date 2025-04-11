from django.http import JsonResponse
from my_docker_django_app.models import User, Module, Section, Lesson

def api_home(request):
    return JsonResponse({"message": "Hello from Django API!"})

"""
from rest_framework.response import Response
from rest_framework.views import APIView

class HomeAPI(APIView):
    def get(self, request):
        return Response({"message": "Hello from DRF!"})
"""