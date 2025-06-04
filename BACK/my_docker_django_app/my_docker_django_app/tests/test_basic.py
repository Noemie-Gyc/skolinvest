from django.test import SimpleTestCase

class BasicTest(SimpleTestCase):
    def test_basic_math(self):
        self.assertEqual(1 + 1, 2)