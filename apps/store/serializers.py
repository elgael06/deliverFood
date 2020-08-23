from rest_framework import serializers
from .models import ItemStore,Order,OrderStore

class ItemStoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemStore
        fields = ('pk','price', 'costo', 'cantidad', 'ingredientes','preparacion')
        
class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('pk','idClient', 'createdAt', 'descripcions', 'total')
        
class OrderStoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderStore
        fields = ('pk','idOrder','idItem')        
        