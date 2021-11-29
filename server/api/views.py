from django.shortcuts import render

from api.models import Questions

# Create your views here.
def qs(request):
    if request.method =='GET':
        qs = Questions.objects.all()
