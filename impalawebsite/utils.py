from django.core.signing import Signer
signer = Signer()

def make_unsubscribe_token(contact):
    return signer.sign(contact.pk)

def verify_unsubscribe_token(token):
    return signer.unsign(token)  # returns the contact's pk or raises BadSignature
