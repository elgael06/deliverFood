from django.urls import path
from django.conf.urls import url

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    # Productos
    url(r'^products/$', views.item_store_list),
    url(r'^products/(?P<pk>[0-9]+)$', views.item_store_detail),
    # Clasificaciones 
    url(r'^clasificaciones/$',views.clasificaciones),
    url(r'^clasificaciones/(?P<pk>[0-9]+)$',views.ProductosClasificador),
    url(r'^clasificaciones/add/$',views.addClasificador),
    url(r'^clasificacion/manager/(?P<pk>[0-9]+)$',views.managerClasificadores),
    # Clasificaciones productos
    url(r'^products/(?P<pk>[0-9]+)/clasificaciones/$', views.ClasificadoresProducto),
    url(r'^products/(?P<pk>[0-9]+)/clasificaciones/(?P<idClase>[0-9]+)$', views.AddClasificadorProducto),
]