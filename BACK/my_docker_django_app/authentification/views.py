from rest_framework_simplejwt.views import TokenObtainPairView,  TokenRefreshView
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework import status
from .serializers import StaffTokenObtainPairSerializer
import logging

# This class enables obtaining access token + refresh token. Inherits from TokenObtainPairView that will be overloaded to sent back tokens through cookies
class CookieTokenObtainPairView(TokenObtainPairView):
    permission_classes = [AllowAny]

    # This serializer rejects all the users that are not authorized : all except is_superuser and is_staff 
    # This is taken into consideration instead of the native serializer, so if the check is not valid, there will be an error.
    serializer_class = StaffTokenObtainPairSerializer

    # Overload method POST to manage response after the authentication
    def post(self, request, *args, **kwargs):
        # call the native post method from TokenObtainPairview to get the access and refresh token
        response = super().post(request, *args, **kwargs)
        access_token = response.data.get("access")
        refresh_token = response.data.get("refresh")

        if not access_token or not refresh_token:
            # Supposed to send an HTTP error
            return response

        response.set_cookie(
            key="access",
            value=access_token,
            path="/",
            httponly=True, # prevent from XSS attacks. JS can't read the document.cookie, data is never exposed to JS code.
            samesite="Strict", # Should be "strict" in production mode, Lax limits the cross sites requests
            secure=True, # Should be true in production mode (HTTPS)
         ) 
        response.set_cookie(
            key="refresh",
            value=refresh_token,
            path="/",
            httponly=True,
            samesite="Strict",
            secure=True,
        )

        logger = logging.getLogger(__name__)
        logger.info("Successfully logged in")
        # return final response with the cookies one containing the access token, the other one containing the resfresh token. 
        return response

# This class enables obtaining a NEW access considering the refresh token provided inside the cookie. TokenRefreshView is overloaded to get the refresh token the cookie. 
class CookieTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        # get the refresh token from the cookie. 
        refresh_token = request.COOKIES.get('refresh')
        if refresh_token is None:
            return Response({"detail": "Refresh token missing."}, status=status.HTTP_401_UNAUTHORIZED)
        
        # In order to be able to use the native post method, we must reinject the refresh_token inside the request object properly
        request.data['refresh'] = refresh_token
        try:
            response = super().post(request, *args, **kwargs)

        # if token is invalid of expired, the error is catch and return a 401 error message. 
        except TokenError as e:
            return Response({"detail": str(e)}, status=status.HTTP_401_UNAUTHORIZED)
        
        # if the "try" worked we got the response, and it should contain our new access token. 
        access_token = response.data.get("access")
        if access_token:
            response.set_cookie(
                key="access",
                value=access_token,
                httponly=True,
                samesite="Strict",
                secure=True,
                path="/",
            )

        return response

class LogoutView(APIView):
    def post(self, request):
        response = Response({"detail": "Déconnexion réussie"}, status=status.HTTP_200_OK)
        
        response.delete_cookie('access', path='/')
        response.delete_cookie('refresh', path='/')
        
        return response
