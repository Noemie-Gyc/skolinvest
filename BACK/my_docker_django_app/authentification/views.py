from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth.models import User

class AdminOnlyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        if not self.user.is_superuser:
            raise AuthenticationFailed("Seuls les administrateurs peuvent se connecter.")

        return data

class AdminOnlyTokenObtainPairView(TokenObtainPairView):
    serializer_class = AdminOnlyTokenObtainPairSerializer