from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.shortcuts import render
from django.http import HttpResponse

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from . import serializers
from .models import usuarioSesion,passwordUsuario

# Create your views here.

@api_view(['GET', 'POST'])
def lista_usuarios(request):
    if request.method == 'GET':
        data = []
        dataPass = []
        lista       = usuarioSesion.objects.all()
        listaPass   = passwordUsuario.objects.all()
        print(lista.count())
        for item in lista:
            # res = serializers.usuarioSesionSerializer(item)
            # print(item.email)
            data.append({
                'email':item.email,
                'apeido':item.apeido,
                'apodo':item.apodo,
                'nombre':item.nombre,
            })
        for item in listaPass:
            print(item.password)
            dataPass.append({
                'id':item.pk,
                'password':item.password,
                'idUsuario':item.idUsuario,
                'createdAt':item.createdAt,
                'modificAt':item.modificAt   
            })
        try:
            # serial      = serializers.usuarioSesionSerializer(lista,context={'request': request}, many=True)
            # serialpass  = serializers.passwordUsuarioSerializer(listaPass,context={'request': request}, many=True)
            print('data',data)
            return Response({'data':data,'passwords':dataPass})
        except Exception as err:
            return Response({'error':format(err)})
    if request.method == 'POST':
        # serializer = serializers.usuarioSesionSerializer(data=request.data)
        datos = request.data
        print(datos['email'])
        res = usuarioSesion.objects.filter(email= datos['email'])
        print(res.exists())
        if  not res:
            nuevo = usuarioSesion(nombre=datos['nombre'],apeido=datos['apeido'],apodo=datos['apodo'],email=datos['email'])
            print(nuevo.email)
            nuevo.save()
            passSerial = passwordUsuario(idUsuario=nuevo.pk,password='123456789')
            passSerial.save()
            return Response({
                 'email':nuevo.email,
                'apeido':nuevo.apeido,
                'apodo':nuevo.apodo,
                'nombre':nuevo.nombre,
                'id':nuevo.pk
                }, status=status.HTTP_201_CREATED)
        return Response({'error':'el correo ya existe.'}, status=status.HTTP_400_BAD_REQUEST)
    
    
    