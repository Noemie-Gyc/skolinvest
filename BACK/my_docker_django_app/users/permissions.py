from rest_framework.permissions import BasePermission
import logging

logger = logging.getLogger(__name__)

# Customed permission's view to only allow users with 'back_office' attribute.
class IsBackOfficeUser(BasePermission):
    def has_permission(self, request, view):
        user = request.user
        
        if not user.is_authenticated:
            self.message = "Vous devez être connecté pour accéder à cette ressource."
            # {request.META.get('REMOTE_ADDR')} enables getting IP address of the requester
            logger.warning(f"Tentative d'accès non authentifié à {view.__class__.__name__} depuis {request.META.get('REMOTE_ADDR')}")
            return False
        
        if not (user.is_staff or user.is_superuser):
            self.message = "Sorry, tu ne fais pas partie de la team administrateur."
            logger.warning(f"Tentative d'accès non autorisé par l'utilisateur {user.username} (ID: {user.id}) à {view.__class__.__name__}")
            return False
            
        logger.info(f"Accès autorisé pour l'utilisateur back-office {user.username} à {view.__class__.__name__}")
        return True