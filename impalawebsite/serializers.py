from rest_framework import serializers
from .models import Article, ContactMessage


class ArticleSerializer(serializers.ModelSerializer):
    # Make 'author' read-only so the server can assign request.user in the view
    class Meta:
        model = Article
        fields = '__all__'
        read_only_fields = ('author',)

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = '__all__'
