
from rest_framework.response import Response
from ..models import Clasificacion,ClasificacionItem,ItemStore
from ..serializers import serializers

class ClasificacionesManager():
    def __init__(self):
        pass

    def obtener(self):        
    # pylint: disable=maybe-no-member
        clasific = Clasificacion.objects.all()
        print(clasific.count)
        return clasific
    
    def obtenerClasificadoresPorProd(self,id):
        # pylint: disable=maybe-no-member
        items = ClasificacionItem.objects.filter(idItem=id).all()
        producto =  ItemStore.objects.get(pk=id)
        
        lista = []
        
        for item in items:
            print(item.pk)
            clasific = Clasificacion.objects.get(pk=item.idClase)
            print(clasific.name)
            
            lista.append({            
                'pk':clasific.pk,
                'name':clasific.name,
                'estatus':clasific.estatus,
                'image':clasific.image,
            })
            
        return {'data':lista,'pk':id,'name':producto.nombre,'img':producto.image}
    
    def add(self,name,imagen):
        Clasificacion(name=name,image=imagen).save()
    
    def delete(self,id):
        # pylint: disable=maybe-no-member
        cl = Clasificacion.objects.get(pk=id)
        if cl.check():
            cl.delete()
    def modific(self,data):
        pass