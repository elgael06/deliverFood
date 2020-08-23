from django.urls import path
from django.conf.urls import url

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    url(r'^all/$', views.item_store_list),
    url(r'^(?P<pk>[0-9]+)$', views.item_store_detail),
]