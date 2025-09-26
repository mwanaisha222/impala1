from django.apps import AppConfig


class ImpalawebsiteConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'impalawebsite'

    def ready(self):
        import impalawebsite.signals 
