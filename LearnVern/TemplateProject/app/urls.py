from django.urls import path,include
from . import views
urlpatterns = [
    path('',views.Index, name='index'),
    path('reg/',views.Reg, name='Registration form'),
]