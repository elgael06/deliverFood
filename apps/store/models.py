from django.db import models
from ..customers.models import Customer
# Create your models here.

class ItemStore(models.Model):
    price        = models.FloatField()
    costo        = models.FloatField()
    cantidad     = models.IntegerField()
    ingredientes = models.TextField('ingredientes',max_length=200)
    preparacion  = models.TextField('preparacion',max_length=200)
    
    
class Order(models.Model):
    idClient     = models.ForeignKey(Customer, on_delete=models.CASCADE)
    createdAt    = models.DateTimeField("Created At", auto_now_add=True)
    descripcions = models.TextField('descripcion',max_length=200)
    total        = models.IntegerField()
    
class OrderStore(models.Model):
    idOrder = models.ForeignKey(Order, on_delete=models.CASCADE)
    idItem  = models.ForeignKey(ItemStore, on_delete=models.CASCADE)
