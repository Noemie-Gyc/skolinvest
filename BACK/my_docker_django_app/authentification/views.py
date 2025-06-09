from rest_framework_simplejwt.views import TokenObtainPairView,  TokenRefreshView
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework import status
from .serializers import StaffTokenObtainPairSerializer

class CookieTokenObtainPairView(TokenObtainPairView):
    permission_classes = [AllowAny]
    serializer_class = StaffTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        access_token = response.data.get("access")
        refresh_token = response.data.get("refresh")

        if not access_token or not refresh_token:
            return response

        response.set_cookie(
            key="access",
            value=access_token,
            path="/",
            httponly=True,
            samesite="Lax",
            secure=False, # Passe à True en prod HTTPS
         ) 
        response.set_cookie(
            key="refresh",
            value=refresh_token,
            path="/",
            httponly=True,
            samesite="Lax",
            secure=False,
        )
        return response
    
class CookieTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get('refresh')
        if refresh_token is None:
            return Response({"detail": "Refresh token missing."}, status=status.HTTP_401_UNAUTHORIZED)

        request.data['refresh'] = refresh_token
        try:
            response = super().post(request, *args, **kwargs)
        except TokenError as e:
            return Response({"detail": str(e)}, status=status.HTTP_401_UNAUTHORIZED)

        access_token = response.data.get("access")
        if access_token:
            response.set_cookie(
                key="access",
                value=access_token,
                httponly=True,
                samesite="Lax",
                secure=False,
                path="/",
            )

        return response

class LogoutView(APIView):
    def post(self, request):
        response = Response({"detail": "Déconnexion réussie"}, status=status.HTTP_200_OK)
        
        response.delete_cookie('access', path='/')
        response.delete_cookie('refresh', path='/')
        
        return response
