from django.db import models

# Create your models here.

class usuarioSesion(models.Model):
    nombre  = models.TextField(default='',max_length=50)
    apeido  = models.TextField(default='',max_length=80)
    apodo   = models.TextField(default='',max_length=20,unique=True)
    email   = models.EmailField(null=False,unique=True)
    
class passwordUsuario(models.Model):
    password    = models.TextField(blank=False,null=False)
    idUsuario   = models.ForeignKey(usuarioSesion,on_delete=models.CASCADE)
    createdAt   = models.DateTimeField("Created", auto_now_add=True)
    modificAt   = models.DateTimeField("modific", auto_now_add=True)
    
class registreSesion(models.Model):
    idUsuario   = models.ForeignKey(usuarioSesion,on_delete=models.CASCADE)
    createdAt   = models.DateTimeField("Created", auto_now_add=True)
    token       = models.TextField('token',null=False)
    status      = models.BooleanField(default=True)
    
class accesoMenus(models.Model):
    nombre = models.TextField(null=False)
    icon   = models.TextField(default='')
    
class accesoSubMenu(models.Model):
    idMenu  = models.ForeignKey(accesoMenus,on_delete=models.CASCADE)
    nombre  = models.TextField(null=False)
    uri     = models.TextField(null=False)
    
class accesoUsuario(models.Model):
    idUsuario   = models.ForeignKey(usuarioSesion,on_delete=models.CASCADE)
    idAcceso    = models.ForeignKey(accesoSubMenu,on_delete=models.CASCADE)
    acceso      = models.BooleanField(default=False)
