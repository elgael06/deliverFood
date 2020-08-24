
from django.http import HttpResponse

def index(request):
    return HttpResponse("Hello,this the index of back-end deliver Food App.")