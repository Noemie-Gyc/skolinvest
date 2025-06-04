from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny

class CookieTokenObtainPairView(TokenObtainPairView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        access_token = response.data.get("access")

        # Ajoute le cookie HTTP visible par Next.js middleware
        response.set_cookie(
            key="access",
            value=access_token,
            path="/",
            httponly=False,  # True = JS can't read it
            samesite="Strict",
            secure=False,    # True si HTTPS
        )

        return response
