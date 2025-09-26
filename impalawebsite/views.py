from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from .forms import ContactForm, ArticleForm, CustomUserCreationForm, CustomAuthenticationForm
from .models import Article, ContactMessage
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseForbidden, HttpResponse
from .utils import verify_unsubscribe_token
from django.core.signing import BadSignature

def home(request):
    return render (request, 'landing/landing.html')


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


def article_create(request):
    if request.method == 'POST':
        form = ArticleForm(request.POST, request.FILES)

        # DEBUG: log incoming POST content
        print("=== Incoming POST body ===")
        print(request.POST.get('body')[:500])
        print("==========================")

        if form.is_valid():
            article = form.save(commit=False)
            article.author = request.user
            article.save()

            # DEBUG: confirm saved body
            print("=== Saved Article body ===")
            print(article.body[:500])
            print("==========================")

            return redirect('article_detail', pk=article.pk)
        else:
            print("Form errors:", form.errors)
    else:
        form = ArticleForm()

    return render(request, 'articles/article_form.html', {'form': form})


def article_list(request):
    articles = Article.objects.all()
    return render(request, 'articles/article_list.html', {'articles': articles})

def article_detail(request, pk):
    article = get_object_or_404(Article, pk=pk)
    return render(request, 'articles/article_detail.html', {'article': article})


@login_required
def article_update(request, pk):
    article = get_object_or_404(Article, pk=pk)

    # Optional: only allow the author to edit
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

    # Optional: only allow the author to delete
    if article.author != request.user:
        return HttpResponseForbidden("You are not allowed to delete this article.")

    if request.method == 'POST':
        article.delete()
        return redirect('article_list')

    # For GET, show a confirmation page
    return render(request, 'articles/article_confirm_delete.html', {'article': article})

def signup_view(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
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
            return redirect('landing_page')
    else:
        form = CustomAuthenticationForm()
    return render(request, 'accounts/login.html', {'form': form})


def logout_view(request):
    logout(request)
    return redirect('login')


def test_editor(request):
    from .forms import ArticleForm
    return render(request, 'test_editor.html', {'form': ArticleForm()})
