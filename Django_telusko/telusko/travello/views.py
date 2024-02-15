from django.shortcuts import render

# Create your views here.
from . import models
def index(request):
# Destination 1
    dest1 = models.Destination()
    dest1.price = 1000
    dest1.name="Delhi"
    dest1.desc = "Capital of India"
    dest1.img = "destination_1.jpg"
    dest1.offer = True
# Destination 2
    dest2 = models.Destination()
    dest2.price = 1500
    dest2.name="Mumbai"
    dest2.desc = "State of India"
    dest2.img = "destination_2.jpg"
    dest2.offer = False

#Destination 3
    dest3 = models.Destination()
    dest3.price = 500
    dest3.name="Hyderabad"
    dest3.desc = "Famous for @Biryani"
    dest3.img = "destination_3.jpg"
    dest3.offer = False
    dests = [dest1, dest2, dest3]
    return render(request,'index.html', {'dests':dests})

