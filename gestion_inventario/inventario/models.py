from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.conf import settings

class Empresa(models.Model):
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre
    

class CustomUser(AbstractUser):
    empresa = models.ForeignKey(Empresa, on_delete=models.CASCADE, null=True, blank=True)
    groups = models.ManyToManyField(
        Group,
        related_name="Grupo",  # Cambia related_name aquí
        blank=True,
        help_text="The groups this user belongs to. A user will get all permissions granted to each of their groups.",
        related_query_name="user",
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name="Permisos",  # Cambia related_name aquí
        blank=True,
        help_text="Specific permissions for this user.",
        related_query_name="user",
    )



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

    def __str__(self):
        return f'{self.motivo} - {self.medicamento.nombre}'