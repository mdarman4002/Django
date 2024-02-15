from django.contrib import admin
from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("admin/", admin.site.urls),
    path('',views.login),
    path('verify',views.verifyLogin),
    path('verify/home',views.home),
    path('http://127.0.0.1:8000/service',views.service),
]