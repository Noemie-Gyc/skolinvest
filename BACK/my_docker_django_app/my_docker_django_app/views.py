from django.http import JsonResponse

def api_home(request):
    return JsonResponse({"message": "Hello from Django API!"})

"""
from rest_framework.response import Response
from rest_framework.views import APIView

class HomeAPI(APIView):
    def get(self, request):
        return Response({"message": "Hello from DRF!"})
"""