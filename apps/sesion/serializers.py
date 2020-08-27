from rest_framework import serializers
from . import models
 
class passwordUsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model: models.passwordUsuario
        fields: ('pk','password','idUsuario','createdAt','modificAt')

class usuarioSesionSerializer(serializers.ModelSerializer):
    class Meta:
        model  : models.usuarioSesion
        fields : ['pk','nombre','apeido','apodo','email']        
       
class registreSesionSerializer(serializers.ModelSerializer):
    class Meta:
        model: models.registreSesion
        fields: ('pk','idUsuario','createdAt','token','status')

class accesoMenusSerializer(serializers.ModelSerializer):
    class Meta:
        model: models.accesoMenus
        fields: ('pk','nombre','icon')

class accesoSubMenuSerializer(serializers.ModelSerializer):
    class Meta:
        model: models.accesoSubMenu
        fields: ('pk','idMenu','nombre','uri')

class accesoUsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model: models.accesoUsuario
        fields: ('pk','idUsuario','idAcceso','acceso')
