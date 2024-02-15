from django.shortcuts import render
from django.http import HttpResponse

# def abc(request):
#     return HttpResponse("<h1> Hello Geeks</h>")

# def arman(request):
#     return HttpResponse("<h2> Mohammad Arman </h2>")

# def printData(request):
#     return render(request,'index.html',{'name':'Arman'})

def homePage(request):
    data = {
        'title' : "Home page",
        'bdata' : 'welcome to my home page',
        'clist' : ['PHP','jAVA','DJANGO'],
        'Student_details': [{'name': 'Arman','phone':919900101}]
    }
    return render(request,'index.html',data)

def aboutUs(request):
    return HttpResponse("<h1> Arman </h1>")

def courseDetails(request,courseid):
    return HttpResponse(request,courseid);