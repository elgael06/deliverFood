from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.shortcuts import render
from django.http import HttpResponse

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from . import serializers
from .functions.usuarios import usuarios 
from .functions.usuarioId import usuarioId

# Create your views here.

@api_view(['GET', 'POST'])
def lista_usuarios(request):
    u = usuarios()    
    
    if request.method == 'GET':    
        return Response(u.listaUsuarios())
    
    elif request.method == 'POST':        
        datos = request.data
        response = u.add(
            nombre  = datos['nombre'],
            apeido  = datos['apeido'],
            apodo   = datos['apodo'],
            email   = datos['email']
            )
        if not response['error']:
            return Response(response, status=status.HTTP_201_CREATED)
        return Response(response, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET', 'PUT','DELETE'])
def actions_usuario(request,pk):
    user = usuarioId(pk)
    if request.method == 'PUT':
        datos = request.data
        res = user.update(
            nombre  = datos['nombre'],
            apeido  = datos['apeido'],
            apodo   = datos['apodo'],
            email   = datos['email']
        )        
        return Response(res)
    elif request.method == 'GET':
        res = user.getId()
        return Response(res)
    elif request.method == 'DELETE':
        res = user.delete()
        return Response(res)
    else:
        return Response({'message':'no se encontro el metodo.'})
    