from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from my_docker_django_app.models import Module, Section, Lesson

@require_POST
@csrf_exempt
def cleanup_test_e2e_data(request):

    if not (settings.DEBUG and request.META.get('HTTP_X_CLEANUP_TOKEN') == 'secret'):
        return JsonResponse({'error': 'Unauthorized'}, status=403)

    if not settings.DEBUG:
        return JsonResponse({'error': 'Not allowed in production'}, status=403)

    test_id = request.GET.get('testId')
    if not test_id:
        return JsonResponse({'error': 'Missing testId'}, status=400)
    
    Lesson.objects.filter(title__icontains=test_id).delete()
    Section.objects.filter(title__icontains=test_id).delete()
    Module.objects.filter(title__icontains=test_id).delete()

    return JsonResponse({'status': 'Test data cleaned'})