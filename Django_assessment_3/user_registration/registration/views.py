from django.shortcuts import render
from .forms import UserRegistrationForm

def register_user(request):
    if request.method == 'POST':
        form = UserRegistrationForm(request.POST)
        if form.is_valid():
            form.save()
            return render(request, 'registration/success.html')
    else:
        form = UserRegistrationForm()
    return render(request, 'registration/register.html', {'form': form})
