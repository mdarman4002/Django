from django.shortcuts import render

from django.http import HttpResponse

def welcome(request):
    return HttpResponse("Welcome to Django!")
# Create your views here.
