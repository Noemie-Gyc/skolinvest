from my_docker_django_app.models import Module
from my_docker_django_app.serializers import ModuleSerializer
from rest_framework.generics import (
    CreateAPIView, 
    RetrieveAPIView, 
    UpdateAPIView, 
    DestroyAPIView
)
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.permissions import AllowAny

# This class is to visualize the whole list of the modules available on the public app
# ModuleListView only get the modules that has the field 'status' == 'published'
class ModuleListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        # only expose published modules for the public API
        modules = Module.objects.filter(status='published').order_by('id')
        # Return a list of minimal representations (id and title) for each published module
        data = [{'id': m.id, 'title': m.title} for m in modules]
        return Response(data)
    
# RetrieveAPIView is a native class to get the detail of an instance identified by the primary key
class ModuleDetailView(RetrieveAPIView):
    queryset = Module.objects.all()
    serializer_class = ModuleSerializer
    permission_classes = [AllowAny]

# CreateAPIView is a native class to create a view
class ModuleCreateView(CreateAPIView):
    queryset = Module.objects.all()
    serializer_class = ModuleSerializer
    permission_classes = [IsAuthenticated]

    # This function is to automatically update the user_id in the creation of the module. 
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ModuleUpdateView(UpdateAPIView):
    queryset = Module.objects.all()
    serializer_class = ModuleSerializer
    permission_classes = [IsAuthenticated]

class ModuleDeleteView(DestroyAPIView):
    queryset = Module.objects.all()
    serializer_class = ModuleSerializer
    permission_classes = [IsAuthenticated]

# The edition of the module is only allowed for user is_staff or superuser. In a future we could have user 'student' and we don't want them 
# to update the modules and access to the back office (also restricted via the authentification app)
class EditableModuleListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        if not user.is_staff or not user.is_superuser:
            return Response({"detail": "Accès interdit."}, status=status.HTTP_403_FORBIDDEN)

        modules = Module.objects.all()
        serializer = ModuleSerializer(modules, many=True)
        return Response(serializer.data)