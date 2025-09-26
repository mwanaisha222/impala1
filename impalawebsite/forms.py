from django import forms
from .models import ContactMessage, Article, CustomUser
from django_summernote.widgets import SummernoteWidget
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm

class ContactForm(forms.ModelForm):
    consent_email_updates = forms.BooleanField(
        required=True,
        label="",
        help_text="",
        widget=forms.CheckboxInput(attrs={'class': 'form-check-input'})
    )

    class Meta:
        model = ContactMessage
        fields = ['name', 'email', 'phone', 'message', 'consent_email_updates']


class ArticleForm(forms.ModelForm):
    class Meta:
        model = Article
        fields = ['title', 'body', 'featured_image', 'keywords']
        widgets = {
            'body': SummernoteWidget(),  # Use Summernote widget in forms
        }


class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = CustomUser
        fields = ('email', 'first_name', 'surname', 'password1', 'password2')


class CustomAuthenticationForm(AuthenticationForm):
    username = forms.EmailField(label="Email")