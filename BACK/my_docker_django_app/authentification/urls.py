from django.urls import path
from .views import CookieTokenObtainPairView

urlpatterns = [
    path('token/', CookieTokenObtainPairView.as_view(), name='token_obtain_pair'),
    #    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]