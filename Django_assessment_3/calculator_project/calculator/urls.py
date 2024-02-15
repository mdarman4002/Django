# calculator/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.calculator, name='calculator'),
    path('calculate/', views.calculate, name='calculate'),
]
