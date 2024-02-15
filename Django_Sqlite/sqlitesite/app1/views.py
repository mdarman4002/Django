from django.shortcuts import render
from . models import Destination
# Create your views here.
def index(request):
    dests = Destination()
    dests.name = 'Delhi'
    return render(request, 'index.html',{'dests':dests})