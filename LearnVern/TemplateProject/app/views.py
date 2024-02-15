from django.shortcuts import render

# Create your views here.
def Index(request):
    return render(request, 'index.html')

def Reg(request):
    return render(request, 'forms.html')