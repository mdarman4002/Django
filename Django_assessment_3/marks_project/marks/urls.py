
from django.urls import path
from . import views

urlpatterns = [
    path('mark-sheet/', views.mark_sheet, name='mark_sheet'),
]
