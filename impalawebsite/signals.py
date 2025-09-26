from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import send_mail
from django.urls import reverse
from django.conf import settings
from .models import Article, ContactMessage
from django.core.signing import Signer


signer = Signer()

@receiver(post_save, sender=Article)
def send_article_notification(sender, instance, created, **kwargs):
    if not created:
        return

    site_url = getattr(settings, "SITE_URL", "http://127.0.0.1:8000")
    article_url = site_url + reverse('article_detail', args=[instance.pk])

    recipients = ContactMessage.objects.filter(consent_email_updates=True)
    for contact in recipients:
        token = signer.sign(contact.pk)
        unsubscribe_url = f"{site_url}{reverse('unsubscribe', args=[token])}"

        subject = f"New Article: {instance.title}"
        message = (
            f"Hello {contact.name},\n\n"
            f"A new article from Impala Health Tech Research Limited has been published: {instance.title}\n"
            f"Read it here: {article_url}\n\n"
            f"If you no longer wish to receive these updates, "
            f"you can unsubscribe here:\n{unsubscribe_url}\n"
        )

        send_mail(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL,
            [contact.email],
            fail_silently=False,
        )