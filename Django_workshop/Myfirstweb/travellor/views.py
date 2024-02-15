
from django.shortcuts import render

def home(request):
    return render(request,'index.html')
def verifyLogin(request):
    uname = request.POST['un']
    passw = request.POST['pwd']
    if uname=='Arman' and passw == '0001':
        return render(request, 'result.html',{'un':uname})
    return render(request, 'result.html',{'un':'invalid user'})




# Create your views here.
