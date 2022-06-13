from django.core.mail import EmailMessage
import smtplib
class Util:
    @staticmethod
    def send_email(data):
        if data:
            email = EmailMessage(subject=data['subject'], body=data['email_body'], to=(data['user'],))
            email.send()
            return data
        else:
            return None