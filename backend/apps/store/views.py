from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.shortcuts import render
from django.shortcuts import render
from django.http import HttpResponse
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .models import ItemStore, Clasificacion,ClasificacionItem
from . import serializers
from django.template import loader
from .functions.clasificacion import ClasificacionesManager
from rest_framework.parsers import JSONParser

# Create your views here.

def index(request):
    template = loader.get_template("index.html")
    return HttpResponse(template.render())
    # return HttpResponse("Hello, world. You're at the store index.")

@api_view(['GET', 'POST'])
def item_store_list(request):
    print('productos')
    if request.method == 'GET':
        print('obtener productos')
        data = []
        nextPage = 1
        previousPage = 1
        # pylint: disable=maybe-no-member
        itemStore = ItemStore.objects.all().order_by(
        'nombre'
        )
        page = request.GET.get('page', 1)
        paginator = Paginator(itemStore, 10)
        try:
            data = paginator.page(page)
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)
        serializer = serializers.ItemStoreSerializer(itemStore,context={'request': request} ,many=True)
        
        if data.has_next():
            nextPage = data.next_page_number()
        if data.has_previous():
            previousPage = data.previous_page_number()
        
        return Response({
            'data': serializer.data , 
            'count': paginator.count, 
            'numpages' : paginator.num_pages, 
            'nextlink': '/api/store/all/?page=' + str(nextPage), 
            'prevlink': '/api/store/all/?page=' + str(previousPage)
        })
    
    elif request.method == 'POST':
        print('insertar producto')
        serializer = serializers.ItemStoreSerializer(data=request.data)
        print('entro')
        if serializer.is_valid():
            print('is valid')
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        print('not valid')
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET','PUT','DELETE'])
def item_store_detail(request,pk):
    try:
        # pylint: disable=maybe-no-member
        itemStore = ItemStore.objects.get(pk=pk)
    except ItemStore.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = serializers.ItemStoreSerializer(itemStore,context={'request': request})
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = serializers.ItemStoreSerializer(itemStore, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        itemStore.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST'])
def clasificaciones(request):
    manager = ClasificacionesManager().obtener()
    ser = serializers.ClasificacionSer(manager,context={'request': request},many=True)
    return Response(ser.data)

@api_view(['GET', 'POST'])
def ProductosClasificador(request,pk):
    # pylint: disable=maybe-no-member
    clasific = Clasificacion.objects.get(pk=pk)
    items = ClasificacionItem.objects.filter(idClase=pk)
    
    lista = []
   
    for item in items:
        print(item.pk)
        producto =  ItemStore.objects.get(pk=item.idItem)
        # data = serializers.ItemStoreSerializer(producto,context={'request': request},many=True)
        lista.append({
            'cantidad':producto.cantidad,
            'costo':producto.costo,
            'image':producto.image,
            'ingredientes':producto.ingredientes,
            'nombre':producto.nombre,
            'pk':producto.pk,
            'preparacion':producto.preparacion,
            'price':producto.price,
        })
   
    return Response({'data':lista,'clasificacion':clasific.name,'foto':clasific.image})

@api_view(['GET'])
def ClasificadoresProducto(request,pk):
    manage = ClasificacionesManager()
    
    return Response(manage.obtenerClasificadoresPorProd(id=pk)) 
   
@api_view(['POST','DELETE']) 
def AddClasificadorProducto(request,pk,idClase):
    if request.method == 'DELETE':
    # pylint: disable=maybe-no-member
        ClasificacionItem.objects.get(idClase=idClase,idItem=pk).delete()
        
    # pylint: disable=maybe-no-member
    if request.method == 'POST' and not ClasificacionItem.objects.filter(idClase=idClase,idItem=pk).exists():
        ClasificacionItem(idClase=idClase,idItem=pk).save()
        
    manager = ClasificacionesManager() 
    return Response(manager.obtenerClasificadoresPorProd(id=pk))

@api_view(['POST'])
def addClasificador(request):    
    data = JSONParser().parse(request)
    
    ser = serializers.ClasificacionSer(data=data)
    if ser.is_valid:
        ser.save()
        return Response(ser.data,status=201)
    return Response(ser.errors,status=400)

@api_view(['PUT','DELETE'])
def managerClasificadores(request,pk):
    print('pk =>',pk)
    # pylint: disable=maybe-no-member
    cl = Clasificacion.objects.get(pk=pk)
    if cl.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'PUT':
        data = JSONParser().parse(request)
        ser = serializers.ClasificacionSer(cl,data=data,context={'request': request})
        
        if ser.is_valid:
            ser.save()
            return Response(ser.data)
        
        return Response(ser.errors, status=400)

    elif request.method == 'DELETE':
        cl.delete()
        return Response(status=204)