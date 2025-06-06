from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny

class CookieTokenObtainPairView(TokenObtainPairView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        access_token = response.data.get("access")

        # Add the cookie HTTP visible by Next.js middleware
        response.set_cookie(
            key="access",
            value=access_token,
            path="/",
            httponly=True,
            samesite="Strict",
            secure=True,
        )

        return response
