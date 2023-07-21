from django.core.mail import send_mail 
from django.conf import settings

def sendMail(subject , message , toEmail):
    send_mail(
        subject=subject,
        message=message,
        from_email=settings.EMAIL_HOST_USER,
        recipient_list=[toEmail],
        fail_silently=False
    )