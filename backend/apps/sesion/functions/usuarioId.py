
from ..models import usuarioSesion

class usuarioId:
    
    def __init__(self, id_usuario):
        self._idUsuario = id_usuario
    
    def update(self,nombre,apeido,apodo,email):
        print(self._idUsuario)
        # pylint: disable=maybe-no-member
        selected = usuarioSesion.objects.filter(pk=self._idUsuario)
        print(selected.exists())
        if selected.exists():
            try:
                user = selected.first()
                user.apeido = apeido
                user.apodo  = apodo
                user.nombre = nombre
                user.email  = email
                user.save()
                
                return {'message':'usuario actualizado'}
            except Exception as err:
                return {'error':format(err)}
        return {'message':'no se encontro el usuario'}
    
    def delete(self):
        # pylint: disable=maybe-no-member
        selected = usuarioSesion.objects.filter(pk=self._idUsuario)
        selected.delete()
        return ({'message':'usuario eliminado!'})
    
    def getId(self):
        print(self._idUsuario)
        # pylint: disable=maybe-no-member
        selected = usuarioSesion.objects.filter(pk=self._idUsuario)
        if selected.exists():
            try:
                user = selected.first()
                
                return {
                     'email':   user.email,
                    'apeido':   user.apeido,
                    'apodo' :   user.apodo,
                    'nombre':   user.nombre,
                    'id'    :   user.pk
                }
            except Exception as err:
                return {'error':format(err)}
        return {'message':'no se encontro el usuario'}
    
    