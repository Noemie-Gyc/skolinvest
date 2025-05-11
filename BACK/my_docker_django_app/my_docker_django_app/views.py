from django.http import JsonResponse
from my_docker_django_app.models import Module
from .serializers import ModuleSerializer
from rest_framework.response import Response
from rest_framework.views import APIView

def api_home(request):
    return JsonResponse({"message": "Hello from Django API!"})

class ModuleListView(APIView):
    def get(self, request):
        modules = Module.objects.all()
        serializer = ModuleSerializer(modules, many=True)
        return Response(serializer.data)
