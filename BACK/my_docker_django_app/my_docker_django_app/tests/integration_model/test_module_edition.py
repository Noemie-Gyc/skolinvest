import pytest
from django.contrib.auth.models import User
from my_docker_django_app.models import Module, Section, Lesson

@pytest.mark.integration_model
@pytest.mark.django_db
def test_edit_module_with_sections_and_lessons():
    # module creation
    user = User.objects.create_user(username="testuser", password="testpass", is_staff=True)
    module = Module.objects.create(title="La finance pour les nuls", user=user)

    # section creation within the module
    section1 = Section.objects.create(title="Introduction", module=module)
    section2 = Section.objects.create(title="Le bitcoin", module=module)

    # lesson creation within the module
    lesson1 = Lesson.objects.create(
        title="Quelques notion clés", 
        module=module, 
        section=section1
        )
    lesson2 = Lesson.objects.create(
        title="chiffre d'affaire",
        module=module, 
        section=section1)
    lesson3 = Lesson.objects.create(
        title="Conditions", 
        url_video = "https://youtu.be/abc123", 
        module=module, 
        section=section2
        )
 
    # check models relations
    assert module.sections.count() == 2
    assert section1.lessons.count() == 2
    assert section2.lessons.count() == 1

    # check titles 
    section_titles = set(module.sections.values_list('title', flat=True))
    assert section_titles == {"Introduction", "Le bitcoin"}

    lesson_titles_section_1 = set(section1.lessons.values_list('title', flat=True))
    assert lesson_titles_section_1 == {"Quelques notion clés", "chiffre d'affaire"}

    lesson_titles_section_2 = set(section2.lessons.values_list('title', flat=True))
    assert lesson_titles_section_2 == {"Conditions"}

    lesson3 = Lesson.objects.get(id=lesson3.id)
    assert lesson3.url_video == "https://youtu.be/abc123"

