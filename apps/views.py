
from django.http import HttpResponse
from django.template import loader
from django.shortcuts import render

def index(request):
    # template = loader.get_template("/index.html")
    # return render(request, 'index.html')
    # return HttpResponse(template.render())
    return HttpResponse("Hello,this the index of back-end deliver Food App.")