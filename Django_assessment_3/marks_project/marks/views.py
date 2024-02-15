# marks/views.py
from django.shortcuts import render
from .models import Student

def mark_sheet(request):
    students = Student.objects.all()
    return render(request, 'mark_sheet.html', {'students': students})
