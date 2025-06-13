from rest_framework_simplejwt.authentication import JWTAuthentication

# We created our own authenfication because SimpleJWT  requires the following HTTP header : Authorization: Bearer <access_token> 
# while we store our token in the cookie HttpOnly. The token must be read from the cookie not from the header authorization
class CookieJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        
        raw_token = request.COOKIES.get("access")
        if raw_token is None:
            return None

        validated_token = self.get_validated_token(raw_token)
        # if token is valid, we get the user and return it to django rest framework to link it to the request. 
        return self.get_user(validated_token), validated_token