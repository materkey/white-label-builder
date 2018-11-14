from django.apps import AppConfig


class WhitelabelConfig(AppConfig):
    name = 'whitelabel'

    def ready(self):
        import whitelabel.signals
