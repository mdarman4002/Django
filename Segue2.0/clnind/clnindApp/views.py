from django.shortcuts import render
def login(request):
    return render(request,'login.html')
def verifyLogin(request):
    uname = request.POST['username']
    passw = request.POST['password']
    if(uname=="Arman" and passw=="1234"):
        return render(request,'index.html',{'username':uname})
    else:
        return render(request,'invalid.html',{'username':"invalid username or password"})

def home(request):
    return render(request,'home.html')

