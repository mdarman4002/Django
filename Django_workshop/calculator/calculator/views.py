from django.shortcuts import render  # render send the data
from django.http import HttpResponse  # message send

def home(request):
    return render(request,'index.html')


def add(request):
    a = request.GET['num1']
    b = request.GET['num2']
    c = int(a) + int(b)

    return render(request,'result.html',{'re':c})
# ---------MULTIPLY -------------
def multiply(request):
    a = request.GET['num1']
    b = request.GET['num2']
    c = int(a) * int(b)

    return render(request,'result.html',{'re':c})

def mhome(request):
    return render(request, 'multiply.html')

#----------SUBTRACT ----------------
def subtract(request):
    a = request.GET['num1']
    b = request.GET['num2']
    c = int(a) - int(b)

    return render(request,'result.html',{'re':c})
 
def shome(request):
    return render(request, 'subtract.html')

# --------------------DIVIDE--------------
def divide(request):
    a = request.GET['num1']
    b = request.GET['num2']
    c = int(a) / int(b)
    return render(request,'result.html',{'re':c})
def dhome(request):
    return render(request, 'divide.html')

def ahome(request):
    return render(request, 'add.html')

