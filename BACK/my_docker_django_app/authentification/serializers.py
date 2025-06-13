from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers

# This add a additional condition to the TokenObtainPairSerializer
class StaffTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        user = self.user
        if not (user.is_staff or user.is_superuser):
            raise serializers.ValidationError("Accès interdit : utilisateur non autorisé")
        return data