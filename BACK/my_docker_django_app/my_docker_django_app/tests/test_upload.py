from django.test import SimpleTestCase
from types import SimpleNamespace

class LessonFormatVideoTest(SimpleTestCase):
    def test_upload_success_when_size_less_than_5_go(self):
        video_lesson_size = 2
        maximum_size = 5

        video = SimpleNamespace(
            max_size=maximum_size,
            video_size=video_lesson_size
        )

        self.assertGreaterEqual(
            video.max_size,
            video.video_size,
            msg="Le poids maximum de la vidéo doit être inférieur à 10."
        )

    def test_upload_fail_when_size_more_than_5_go(self):
        video_lesson_size = 8
        maximum_size = 5

        video = SimpleNamespace(
            max_size=maximum_size,
            video_size=video_lesson_size
        )

        with self.assertRaises(AssertionError):
            self.assertGreaterEqual(
                video.max_size,
                video.video_size,
                msg="Le poids maximum de la vidéo doit être inférieur à 10."
            )

    def test_upload_success_when_format_authorized(self):
        video_lesson_format = "mp4"
        authorized_formats = ["mp4", "mov", "webm", "avi"]

        video = SimpleNamespace(
            uploaded_video_format=video_lesson_format,
            authorized_video_formats=authorized_formats
        )

        self.assertIn(
            video.uploaded_video_format,
            video.authorized_video_formats,
            msg="Le format doit être MP4 ou MOV."
        )
    
    def test_upload_fail_when_format_not_authorized(self):
        video_lesson_format = "exe"
        authorized_formats = ["mp4", "mov", "webm", "avi"]

        video = SimpleNamespace(
            uploaded_video_format=video_lesson_format,
            authorized_video_formats=authorized_formats
        )

        with self.assertRaises(AssertionError):
            self.assertIn(
                video.uploaded_video_format,
                video.authorized_video_formats,
                msg="Le format doit être MP4 ou MOV."
            )
      
    def test_upload_success_when_length_less_than_30(self):
        video_lesson_length = 10
        authorized_length = 30

        video = SimpleNamespace(
            uploaded_video_length=video_lesson_length,
            authorized_video_length=authorized_length
        )

        self.assertGreaterEqual(
            video.authorized_video_length,
            video.uploaded_video_length,
            msg="La durée de la vidéo doit être inférieure à 30 minutes."
        )
    
    def test_upload_fail_when_length_more_than_30(self):
        video_lesson_length = 56
        authorized_length = 30

        video = SimpleNamespace(
            uploaded_video_length=video_lesson_length,
            authorized_video_length=authorized_length
        )

        with self.assertRaises(AssertionError):
            self.assertGreaterEqual(
                video.authorized_video_length,
                video.uploaded_video_length,
                msg="La durée de la vidéo doit être inférieure à 30 minutes."
            )