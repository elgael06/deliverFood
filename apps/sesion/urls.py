from django.urls import path
from django.conf.urls import url

from . import views


urlpatterns = [
    path('', views.lista_usuarios),
    url(r'^(?P<pk>[0-9]+)$', views.actions_usuario),
    url(r'^login/', views.Login_sesion),
]