from django.db import models

class Medicamento(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    cantidad = models.PositiveIntegerField()
    fecha_vencimiento = models.DateField()

    def __str__(self):
        return self.nombre