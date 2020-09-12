from django.urls import path
from django.conf.urls import url
from . import views
from django.views.generic import TemplateView

urlpatterns = [
    path('static/css/main.257237ba.chunk.css', TemplateView.as_view(template_name='/static/css/main.257237ba.chunk.css')),
    # url(r'^', TemplateView.as_view(template_name='index.html')),
    # url(r'^', TemplateView.as_view(template_name='index.html')),
    path('', TemplateView.as_view(template_name='index.html')),
]