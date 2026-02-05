from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('projects/', views.projects, name='projects'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('about/', views.about, name='about'),
    path('wallpapers/', views.wallpapers, name='wallpapers'),
    path("kontakt/", views.contact, name="contact"),
]