from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from django.http import JsonResponse, HttpResponseForbidden, HttpResponse
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
from django.middleware.csrf import get_token
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly

from .forms import (
    ContactForm,
    ArticleForm,
    CustomUserCreationForm,
    CustomAuthenticationForm,
)
from .models import Article, ContactMessage
from .utils import verify_unsubscribe_token
from .serializers import ArticleSerializer, ContactMessageSerializer
from django.core.signing import BadSignature
from django.contrib.auth import get_user_model

User = get_user_model()

# =====================================================
# 🔐 CSRF TOKEN ENDPOINT (for React)
# =====================================================
@ensure_csrf_cookie
def csrf(request):
    """Ensure a CSRF token is generated and returned to frontend."""
    token = get_token(request)
    response = JsonResponse({'csrfToken': token})
    response["Access-Control-Allow-Credentials"] = "true"
    return response


# =====================================================
# 👤 SIGNUP API (React frontend)
# =====================================================
@csrf_exempt
@api_view(["POST"])
@permission_classes([AllowAny])
def signup_api(request):
    """Create a new user account with proper validation."""
    try:
        form = CustomUserCreationForm(request.data)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return JsonResponse({"message": "Account created successfully"}, status=201)
        else:
            # Handle duplicate email gracefully
            if "email" in form.errors and "unique" in str(form.errors["email"]).lower():
                return JsonResponse({"error": "Email already exists"}, status=400)
            return JsonResponse(form.errors, status=400)

    except IntegrityError:
        return JsonResponse({"error": "Email already exists"}, status=400)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


# =====================================================
# 🔓 LOGIN API (React frontend)
# =====================================================
@csrf_exempt
@api_view(["POST"])
@permission_classes([AllowAny])
def login_api(request):
    """Authenticate a user and log them in."""
    form = CustomAuthenticationForm(request, data=request.data)
    if form.is_valid():
        user = form.get_user()
        login(request, user)
        return JsonResponse({"message": "Login successful"}, status=200)
    else:
        return JsonResponse(form.errors, status=400)


# =====================================================
# 🚪 LOGOUT API (React frontend)
# =====================================================
@api_view(["POST"])
def logout_api(request):
    logout(request)
    return JsonResponse({"message": "Logged out successfully"}, status=200)


# =====================================================
# 📰 ARTICLE VIEWSET
# =====================================================
class ArticleViewSet(viewsets.ModelViewSet):
    """API endpoint for managing articles."""
    queryset = Article.objects.all().order_by('-created_at')
    serializer_class = ArticleSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


# =====================================================
# ✉️ CONTACT MESSAGE VIEWSET
# =====================================================
class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer


# =====================================================
# 🌍 BASIC PAGE VIEWS
# =====================================================
def home(request):
    return render(request, 'landing/landing.html')


def contact_view(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, "Thank you! Your message has been sent.")
            return redirect(request.META.get('HTTP_REFERER', '/'))
    else:
        form = ContactForm()
    return render(request, 'contact/contact.html', {'form': form})


def unsubscribe(request, token):
    try:
        pk = verify_unsubscribe_token(token)
    except BadSignature:
        return HttpResponse("Invalid or expired link.", status=400)

    contact = get_object_or_404(ContactMessage, pk=pk)
    contact.consent_email_updates = False
    contact.save(update_fields=["consent_email_updates"])
    return render(request, "contact/unsubscribed.html", {"contact": contact})


# =====================================================
# 📝 ARTICLE CRUD (TEMPLATE VIEWS)
# =====================================================
def article_create(request):
    if request.method == 'POST':
        form = ArticleForm(request.POST, request.FILES)
        if form.is_valid():
            article = form.save(commit=False)
            article.author = request.user
            article.save()
            return redirect('article_detail', pk=article.pk)
        else:
            print("Form errors:", form.errors)
    else:
        form = ArticleForm()

    return render(request, 'articles/article_form.html', {'form': form})


def article_list(request):
    articles = Article.objects.all().order_by('-created_at')
    return render(request, 'articles/article_list.html', {'articles': articles})


def article_detail(request, pk):
    article = get_object_or_404(Article, pk=pk)
    return render(request, 'articles/article_detail.html', {'article': article})


@login_required
def article_update(request, pk):
    article = get_object_or_404(Article, pk=pk)
    if article.author != request.user:
        return HttpResponseForbidden("You are not allowed to edit this article.")

    if request.method == 'POST':
        form = ArticleForm(request.POST, request.FILES, instance=article)
        if form.is_valid():
            form.save()
            return redirect('article_detail', pk=article.pk)
    else:
        form = ArticleForm(instance=article)

    return render(request, 'articles/article_form.html', {'form': form, 'article': article})


@login_required
def article_delete(request, pk):
    article = get_object_or_404(Article, pk=pk)
    if article.author != request.user:
        return HttpResponseForbidden("You are not allowed to delete this article.")

    if request.method == 'POST':
        article.delete()
        return redirect('article_list')

    return render(request, 'articles/article_confirm_delete.html', {'article': article})


# =====================================================
# 👤 TEMPLATE-BASED AUTH (HTML FORMS)
# =====================================================
def signup_view(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            messages.success(request, "Account created successfully.")
            return redirect('landing_page')
    else:
        form = CustomUserCreationForm()

    return render(request, 'accounts/signup.html', {'form': form})


def login_view(request):
    if request.method == 'POST':
        form = CustomAuthenticationForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            messages.success(request, "Logged in successfully.")
            return redirect('landing_page')
    else:
        form = CustomAuthenticationForm()

    return render(request, 'accounts/login.html', {'form': form})


def logout_view(request):
    logout(request)
    return redirect('login')


def test_editor(request):
    return render(request, 'test_editor.html', {'form': ArticleForm()})
