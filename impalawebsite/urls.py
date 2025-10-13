from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter
from .views import ArticleViewSet, ContactMessageViewSet




router = DefaultRouter()
router.register(r'articles', ArticleViewSet)
router.register(r'contacts', ContactMessageViewSet)





urlpatterns = [

    path('', views.home, name='landing_page'),
    path('contact/', views.contact_view, name='contact'),
    path('list-articles/', views.article_list, name='article_list'),
    path('create-articles/', views.article_create, name='article_create'),
    path('<int:pk>/', views.article_detail, name='article_detail'),
    path('<int:pk>/edit/', views.article_update, name='article_update'),
    path('<int:pk>/delete/', views.article_delete, name='article_delete'),
    path('signup/', views.signup_view, name='signup'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('test/', views.test_editor, name='test'),
    path("unsubscribe/<str:token>/", views.unsubscribe, name="unsubscribe"),
    path('api/', include(router.urls)),
    
    path("api/signup/", views.signup_api, name="signup_api"),
    path("api/login/", views.login_api, name="login_api"),
    path("api/logout/", views.logout_api, name="logout_api"),
    path("api/csrf/", views.csrf, name="api_csrf"), 
    
]