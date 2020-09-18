from ..models import usuarioSesion,passwordUsuario,registreSesion

class login:
    
    def __init__(self,email,password):
        self._email     = email
        self._password  = password
    
    def check(self):        
        try:
            print(self._email)
            # pylint: disable=maybe-no-member
            usuario = usuarioSesion.objects.filter(email=self._email)
            
            print(usuario.exists())
            if usuario.exists():
                sesion = usuario.first()
                log = passwordUsuario.objects.filter(idUsuario=sesion.pk, password=self._password)
                
                if log.exists():
                    password = log.first()
                    idusario = str(sesion.pk)
                    idpass   = str(password.pk)
                    
                    print('id pass', idpass,idusario)
                    registreSesion.objects.filter(idUsuario=sesion.pk).update(status=False)
                    registro = registreSesion(idUsuario=sesion.pk,status=True)                                        
                    registro.save()
                    
                    print(registro.createdAt)
                    create   = str(registro.createdAt)
                    token = idusario +'-'+ idpass +'-'+ create
                    registreSesion.objects.filter(idUsuario=sesion.pk,status=True).update(token = token)                    
                    
                    return ({
                        'message':'conectado', 
                        'id':sesion.pk,
                        'nombre':sesion.nombre,
                        'apeido':sesion.apeido,
                        'email':sesion.email,
                        'apodo':sesion.apodo,
                        'token':token,
                        'sesion':True,
                        })

            return ({'message':'la Contraseña no coinside.','sesion':False})
        except Exception as err:
            return {'error':format(err)}
        
    def updatePass(self,newPassword):
        try:            
            # pylint: disable=maybe-no-member
            usuario = usuarioSesion.objects.filter(email=self._email)
            if usuario.exists():
                sesion = usuario.first()
                log = passwordUsuario.objects.filter(idUsuario=sesion.pk, password=self._password)
                
                if log.exists():
                    log.update(password=newPassword)
                    return {'messaje':'password actualizado.','status':True}
                
                return  {'messaje':'error al actualizar el password!','status':False}
            
            return {'messaje':'error el usuario no existe.','status':False}
        
        except Exception as err:            
            return {'error':format(err),'status':False}
    