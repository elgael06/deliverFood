
from django.http import HttpResponse
from django.template import loader
from django.shortcuts import render
import os
from django.conf import settings
from django.views.generic import TemplateView
from django.views.decorators.cache import never_cache



index = never_cache(TemplateView.as_view(template_name='index.html'))

# def index(request):
#     print('home')
#     # template = loader.get_template("index.html")
#     # try:
#     return render(request, 'index.html')
    # except Exception:
    #     index_file_path = os.path.join(settings.REACT_APP_DIR, 'build', 'index.html')
    #     with open(index_file_path) as f:
    #             return HttpResponse(f.read())
    # return HttpResponse(template.render())
    # return HttpResponse("Hello,this the index of back-end deliver Food App.")