from django.db import models
from ..customers.models import Customer
# Create your models here.

class ItemStore(models.Model):
    price        = models.FloatField(default=0.0)
    costo        = models.FloatField(default=0.0)
    cantidad     = models.IntegerField(default=0)
    nombre       = models.TextField('descripcion',max_length=100,default="")
    ingredientes = models.TextField('ingredientes',max_length=200)
    preparacion  = models.TextField('preparacion',max_length=200)
    image        = models.TextField('image',default='')
    
    
class Order(models.Model):
    idClient     = models.ForeignKey(Customer, on_delete=models.CASCADE)
    createdAt    = models.DateTimeField("Created At", auto_now_add=True)
    descripcions = models.TextField('descripcion',max_length=200)
    total        = models.FloatField(default=0.0)
    
class OrderStore(models.Model):
    idOrder  = models.ForeignKey(Order, on_delete=models.CASCADE)
    idItem   = models.ForeignKey(ItemStore, on_delete=models.CASCADE)
    cantidad = models.IntegerField(default=1)
    total    = models.FloatField(default=0.0)

class Clasificacion(models.Model):
    name = models.TextField(max_length=50,default="")
    image = models.TextField(default='')
    estatus = models.BooleanField(default=True)
    
class ClasificacionItem(models.Model):
    idItem = models.IntegerField(null=False)
    idClase = models.IntegerField(null=False)

    

