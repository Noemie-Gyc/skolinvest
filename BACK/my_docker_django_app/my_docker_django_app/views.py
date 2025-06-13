from django.http import JsonResponse
from my_docker_django_app.models import Module
from .serializers import ModuleSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

def api_home(request):
    return JsonResponse({"message": "Hello from Django API!"})

class ModuleListView(APIView):
    def get(self, request):
        modules = Module.objects.all()
        serializer = ModuleSerializer(modules, many=True)
        return Response(serializer.data)


class EditableModuleListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        if not user.is_staff and not user.is_superuser:
            return Response({"detail": "Accès interdit."}, status=status.HTTP_403_FORBIDDEN)

        modules = Module.objects.all()
        serializer = ModuleSerializer(modules, many=True)
        return Response(serializer.data)