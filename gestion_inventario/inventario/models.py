from django.db import models
from django.contrib.auth.models import User
from django.conf import settings


class Profile(models.Model):
    TIPO_DOC_CHOICES = [
            (0, "Cedula de Ciudadania"),
            (1, "Cedula de Extranjeria"),
            (2, "Permiso Especial de Permanencia"),
            (3, "Pasaporte"),
            (4, "Nit")
    ]
    user = models.OneToOneField(settings.AUTH_USER_MODEL, default='', on_delete= models.CASCADE, to_field='username')
    first_name = models.CharField(max_length=100, null= False, blank= True)
    last_name = models.CharField(max_length=100, null= False, blank= True)
    tipo_documento =models.IntegerField(choices=TIPO_DOC_CHOICES,default= 0)
    nit = models.CharField(max_length=20, null=False, blank= True)
    direccion = models.CharField(max_length=255, null=False, blank= True) 
    phone_number = models.CharField(max_length=15, blank=True, null= True)
    email = models.CharField(max_length=255, blank=True, null=False)
    clave = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, default='', related_name="clave")

    def __str__(self):
        return self.user.username

class Medicamento(models.Model):
    nombre = models.CharField(max_length=100)
    codigo = models.CharField(max_length=50, unique=True)
    cantidad = models.IntegerField()
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    fechacaducidad = models.DateField()
    lote = models.CharField(max_length=50)

    def __str__(self):
        return self.nombre
    
class Movimiento(models.Model):
    medicamento = models.ForeignKey(Medicamento, on_delete=models.CASCADE)
    cantidad = models.IntegerField()
    fecha = models.DateField()
    motivo = models.CharField(max_length=255)

    def __str__(self):
        return f'{self.motivo} - {self.medicamento.nombre}'