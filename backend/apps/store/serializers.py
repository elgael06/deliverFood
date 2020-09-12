from rest_framework import serializers
from .models import ItemStore,Order,OrderStore,Clasificacion

class ItemStoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemStore
        fields = ('pk','price', 'costo', 'cantidad','nombre','ingredientes','preparacion','image')
        
class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('pk','idClient', 'createdAt', 'descripcions', 'total')
        
class OrderStoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderStore
        fields = ('pk','idOrder','idItem','cantidad','total')
    
class ClasificacionSer(serializers.ModelSerializer):
    class Meta:
        model = Clasificacion
        fields = ('pk','name','image','estatus')