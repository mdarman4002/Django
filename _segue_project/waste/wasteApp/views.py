from django.shortcuts import render
def home(request):
    return render(request,'home.html')
def verifyLogin(request):
    uname = request.POST['username']
    passw = request.POST['password']
    if(uname=="Arman" and passw=="1234"):
        return render(request,'FirstPage.html',{'username':uname})
    else:
        return render(request,'invalid.html',{'username':"invalid username or password"})

