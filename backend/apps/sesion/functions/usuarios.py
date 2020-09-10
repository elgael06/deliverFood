
from ..models import usuarioSesion,passwordUsuario

class usuarios:
    
    def listaUsuarios(self):
        """
            por este metodo se muestra todos los usuarios
        """
        data = []
        dataPass = []
        # pylint: disable=maybe-no-member
        lista       = usuarioSesion.objects.all()
        listaPass   = passwordUsuario.objects.all()
        
        print(lista.count())
        
        for item in lista:
            data.append({
                'id':item.pk,
                'email':item.email,
                'apeido':item.apeido,
                'apodo':item.apodo,
                'nombre':item.nombre,
            })
            
        for item in listaPass:
            print(item.password)
            dataPass.append({
                'id':item.pk,
                'password':item.password,
                'idUsuario':item.idUsuario,
                'createdAt':item.createdAt,
                'modificAt':item.modificAt   
            })
        try:
            print('data',data)
            return {'data':data,'passwords':dataPass}
        
        except Exception as err:
            return {'error':format(err)}
    
    def add(self,nombre,apeido,apodo,email):
        """
            este metodo agrega un nuevo usuario si el correo no existe
        """
        # pylint: disable=maybe-no-member
        res = usuarioSesion.objects.filter(email= email)        
        
        if not res.exists():
            try:
                
                nuevo = usuarioSesion(
                    nombre=nombre,
                    apeido=apeido,
                    apodo=apodo,
                    email=email
                    )
                
                print(nuevo.email)
                nuevo.save()
                print('guardado')
                
                passSerial = passwordUsuario(idUsuario=nuevo.pk,password='123456789')
                passSerial.save()
                print(passSerial.pk)
                
                return {
                    'email':nuevo.email,
                    'apeido':nuevo.apeido,
                    'apodo':nuevo.apodo,
                    'nombre':nuevo.nombre,
                    'id':nuevo.pk
                    }
                
            except Exception as err:
                return {'error':format(err)}
            
        return {'error':'el correo ya existe.'}