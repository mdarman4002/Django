from django.shortcuts import render
from . import models
# Create your views here.
def index(request):
    #Destination 1
    dest1 = models.Destination()
    dest1.price = 1000
    dest1.name = "Delhi"
    dest1.img = "destination_1.img"
    dest1.desc = "State of Bharat"
    dest1.offer = True
    #destination 2
    dest2 = models.Destination()
    dest2.price = 1500
    dest2.name = "Goa"
    dest2.img = "destination_2.img"
    dest2.desc = "State of Bharat"
    dest2.offer = False

     #destination 3
    dest3 = models.Destination()
    dest3.price = 1000
    dest3.name = "Mumbai"
    dest3.img = "destination_3.img"
    dest3.desc = "State of Bharat"
    dest3.offer = False
    

    dests=[dest1,dest2, dest3]
    return render(request,'index.html',{'dests':dests})



