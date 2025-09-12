from my_docker_django_app.models import Module
from my_docker_django_app.serializers import ModuleSerializer
from users.permissions import IsBackOfficeUser
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
# TODO ModuleListView only get the modules that has the field 'status' == 'published'
class ModuleListView(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        modules = Module.objects.all()
        serializer = ModuleSerializer(modules, many=True)
        return Response(serializer.data)
    
# RetrieveAPIView is a native class to get the detail of an instance identified by the primary key
class ModuleDetailView(RetrieveAPIView):
    queryset = Module.objects.all()
    serializer_class = ModuleSerializer
    permission_classes = [IsBackOfficeUser]

# CreateAPIView is a native class to create a view
class ModuleCreateView(CreateAPIView):
    queryset = Module.objects.all()
    serializer_class = ModuleSerializer
    permission_classes = [IsBackOfficeUser]

    # This function is to automatically update the user_id in the creation of the module. 
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ModuleUpdateView(UpdateAPIView):
    queryset = Module.objects.all()
    serializer_class = ModuleSerializer
    permission_classes = [IsBackOfficeUser]

class ModuleDeleteView(DestroyAPIView):
    queryset = Module.objects.all()
    serializer_class = ModuleSerializer
    permission_classes = [IsBackOfficeUser]

# The edition of the module is only allowed for user is_staff or superuser. In a future we could have user 'student' and we don't want them 
# to update the modules and access to the back office (also restricted via the authentification app)
class EditableModuleListView(APIView):
    permission_classes = [IsBackOfficeUser]

    def get(self, request):
        modules = Module.objects.all()
        serializer = ModuleSerializer(modules, many=True)
        return Response(serializer.data)