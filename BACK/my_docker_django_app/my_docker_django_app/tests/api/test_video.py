from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase
from my_docker_django_app.utils import is_valid_video_extension
from my_docker_django_app.utils import is_valid_video_size

# TODO : Créer les fonctions utilitaire pour valider le format et la limite du poids de la vidéo

class VideoExtensionTestCase(TestCase):
    def test_valid_mp4_extension(self):
        mock_video = SimpleUploadedFile("video_test.mp4", b"dummy_content", content_type="video/mp4")
        self.assertTrue(is_valid_video_extension(mock_video))

    def test_invalid_extension(self):
        mock_video = SimpleUploadedFile("video_test.avi", b"dummy_content", content_type="video/avi")
        self.assertFalse(is_valid_video_extension(mock_video))

class VideoSizeTest(TestCase):

    def test_video_within_size_limit(self):
        # Simule un fichier de 100 Mo (100 * 1024 * 1024 octets)
        fake_size = 100 * 1024 * 1024
        mock_video = SimpleUploadedFile("video.mp4", b"a" * fake_size, content_type="video/mp4")
        self.assertTrue(is_valid_video_size(mock_video))

    def test_video_exceeds_size_limit(self):
        # Simule un fichier de 3 Go (3 * 1024 * 1024 * 1024 octets)
        fake_size = 3 * 1024 * 1024 * 1024
        #On ne peut pas mocker la volume du fichier donc il faut le rajouter à l'objet mock_video
        mock_video = SimpleUploadedFile("video.mp4", b"dummy", content_type="video/mp4")
        mock_video.size = fake_size  # on force la taille simulée
        self.assertFalse(is_valid_video_size(mock_video))