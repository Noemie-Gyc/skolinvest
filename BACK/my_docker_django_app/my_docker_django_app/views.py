from django.http import JsonResponse
from my_docker_django_app.models import Module, Section
from .serializers import ModuleSerializer, SectionSerializer
from rest_framework.generics import RetrieveAPIView
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
    
# RetrieveAPIView is a native class to get the detail of an instance identified by the primary key
class ModuleDetailView(RetrieveAPIView):
    queryset = Module.objects.all()
    serializer_class = ModuleSerializer
    permission_classes = [IsAuthenticated]


class EditableModuleListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        if not user.is_staff and not user.is_superuser:
            return Response({"detail": "Accès interdit."}, status=status.HTTP_403_FORBIDDEN)

        modules = Module.objects.all()
        serializer = ModuleSerializer(modules, many=True)
        return Response(serializer.data)

class SectionListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        sections = Section.objects.all()
        serializer = SectionSerializer(sections, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = SectionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SectionDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return Section.objects.get(pk=pk)
        except Section.DoesNotExist:
            return None

    def get(self, request, pk):
        section = self.get_object(pk)
        if not section:
            return Response({"detail": "Section introuvable"}, status=status.HTTP_404_NOT_FOUND)
        serializer = SectionSerializer(section)
        return Response(serializer.data)

    def patch(self, request, pk):
        section = self.get_object(pk)
        if not section:
            return Response({"detail": "Section introuvable"}, status=status.HTTP_404_NOT_FOUND)
        # partial true enables avoiding writing every field in the json
        serializer = SectionSerializer(section, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        section = self.get_object(pk)
        if not section:
            return Response({"detail": "Section introuvable"}, status=status.HTTP_404_NOT_FOUND)
        section.delete()
        # 204 error means the response has no content has this is deleted.
        return Response(status=status.HTTP_204_NO_CONTENT)