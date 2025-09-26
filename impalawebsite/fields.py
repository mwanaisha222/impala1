# newsletter/fields.py
from django.db import models
from django_summernote.fields import SummernoteTextFormField
import bleach

# Allowed HTML tags and attributes
ALLOWED_TAGS = [
    'a', 'abbr', 'acronym', 'b', 'blockquote', 'code', 'em', 'i', 'li', 
    'ol', 'strong', 'ul', 'p', 'br', 'img', 'h1', 'h2', 'h3', 'h4', 'h5', 
    'h6', 'pre', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'hr', 'video', 'source'
]

ALLOWED_ATTRIBUTES = {
    '*': ['style', 'class', 'id'],
    'a': ['href', 'title'],
    'img': ['src', 'alt', 'width', 'height'],
    'video': ['src', 'controls', 'width', 'height'],
    'source': ['src', 'type']
}

class SafeSummernoteField(models.TextField):
    """
    A TextField that uses Summernote in forms and cleans HTML safely with bleach 6+.
    """
    def formfield(self, **kwargs):
        defaults = {'form_class': SummernoteTextFormField}
        defaults.update(kwargs)
        return super().formfield(**defaults)

    def clean_html(self, value):
        """
        Clean HTML using bleach compatible with bleach 6+.
        """
        return bleach.clean(
            value,
            tags=ALLOWED_TAGS,
            attributes=ALLOWED_ATTRIBUTES,
            strip=True
        )
