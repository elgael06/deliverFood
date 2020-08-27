from rest_framework import serializers
from .models import usuarioSesion,passwordUsuario,registreSesion,accesoMenus,accesoSubMenu,accesoUsuario

class usuarioSesionSerializer(serializers.ModelSerializer):
    class Meta:
        model: usuarioSesion
        fields: ('pk','nombre','apeido','apodo','email')
        
class passwordUsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model: passwordUsuario
        fields: ('pk','password','idUsuario','createdAt','modificAt')

class registreSesionSerializer(serializers.ModelSerializer):
    class Meta:
        model: registreSesion
        fields: ('pk','idUsuario','createdAt','token','status')

class accesoMenusSerializer(serializers.ModelSerializer):
    class Meta:
        model: accesoMenus
        fields: ('pk','nombre','icon')

class accesoSubMenuSerializer(serializers.ModelSerializer):
    class Meta:
        model: accesoSubMenu
        fields: ('pk','idMenu','nombre','uri')

class accesoUsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model: accesoUsuario
        fields: ('pk','idUsuario','idAcceso','acceso')
