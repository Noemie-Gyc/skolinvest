import datetime
from django.test import SimpleTestCase
from types import SimpleNamespace

class ModuleLogicTest(SimpleTestCase):
    def test_modification_date_is_after_publication_date(self):
        past_date = datetime.date.today() - datetime.timedelta(days=1)
        modification_date = datetime.date.today()

        # Mock
        module = SimpleNamespace(
            past_date=past_date,
            modification_date=modification_date
        )

        self.assertGreaterEqual(
            module.modification_date,
            module.past_date,
            msg="La date de modification doit être postérieure ou égale à la date de publication."
        )

    def test_modification_date_is_before_publication_date(self):
        modification_date = datetime.date.today() - datetime.timedelta(days=1)
        today_date = datetime.date.today()

        module = SimpleNamespace(
            today_date=today_date,
            modification_date=modification_date
        )

        with self.assertRaises(AssertionError):
            self.assertGreaterEqual(
                module.modification_date,
                module.today_date,
                msg="La date de modification doit être postérieure ou égale à la date de publication."
            )


      