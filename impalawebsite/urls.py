from django.urls import path, include
from . import views

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
]