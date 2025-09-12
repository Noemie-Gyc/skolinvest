from my_docker_django_app.models import Section
from my_docker_django_app.serializers import  SectionSerializer
from users.permissions import IsBackOfficeUser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

class SectionListCreateView(APIView):
    permission_classes = [IsBackOfficeUser]

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

# Section CRUD is created manually. This way is better if we want to customize the methods in the future. We could have used the native django methods
# as done in the module.
class SectionDetailView(APIView):
    permission_classes = [IsBackOfficeUser]

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
        # 204 error means the response has no content as this is deleted.
        return Response(status=status.HTTP_204_NO_CONTENT)
    