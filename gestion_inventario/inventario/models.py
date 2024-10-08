from django.db import models
from django.contrib.auth.models import User
#from django.contrib.auth.models import AbstractUser, Group, Permission
from django.conf import settings

class Empresa(models.Model):
    codigo = models.CharField(max_length=50)
    nombre = models.CharField(max_length=100)
    direccion = models.CharField(max_length=255)
    telefono = models.CharField(max_length=15)

    def __str__(self):
        return self.nombre
    

class CustomUser(models.Model):
    empresa = models.ForeignKey(Empresa, on_delete=models.CASCADE)
    usuario = models.OneToOneField(User,on_delete=models.CASCADE)
    rol = models.CharField(max_length=50, choices=[('admin', 'Administrador'),('emp','Empleado')])

    def __str__(self):
        return f'{self.usuario.username} - {self.empresa.nombre if self.empresa else "Sin empresa"}'



class Profile(models.Model):
    TIPO_DOC_CHOICES = [
            (0, "Cedula de Ciudadania"),
            (1, "Cedula de Extranjeria"),
            (2, "Permiso Especial de Permanencia"),
            (3, "Pasaporte"),
            (4, "Nit")
    ]
    first_name = models.CharField(max_length=100, null= False, blank= True)
    last_name = models.CharField(max_length=100, null= False, blank= True)
    tipo_documento =models.IntegerField(choices=TIPO_DOC_CHOICES,default= 0)
    nit = models.CharField(max_length=20, null=False, blank= True)
    direccion = models.CharField(max_length=255, null=False, blank= True) 
    phone_number = models.CharField(max_length=15, blank=True, null= True)
    usuarioperfil = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.first_name

class Medicamento(models.Model):
    nombre = models.CharField(max_length=100)
    codigo = models.CharField(max_length=50, unique=True)
    cantidad = models.IntegerField()
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    fechacaducidad = models.DateField()
    lote = models.CharField(max_length=50)
    empresa = models.ForeignKey(Empresa, on_delete=models.CASCADE, default=1)


    def __str__(self):
        return self.nombre
    
class Movimiento(models.Model):
    medicamento = models.ForeignKey(Medicamento, on_delete=models.CASCADE)
    cantidad = models.IntegerField()
    fecha = models.DateField()
    motivo = models.CharField(max_length=255)
    empresaid = models.ForeignKey(Empresa, on_delete=models.CASCADE, default=3)

    def __str__(self):
        return f'{self.motivo} - {self.medicamento.nombre}'


class Alertas(models.Model):
    medicamento = models.ForeignKey(Medicamento, on_delete=models.CASCADE)
    umbral_stock = models.IntegerField()
    activo = models.BooleanField(default=True)


