from django.urls import path
from django.conf.urls import url

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    url(r'^products/$', views.item_store_list),
    url(r'^products/(?P<pk>[0-9]+)$', views.item_store_detail),
    url(r'^clasificaciones/',views.clasificaciones)
]