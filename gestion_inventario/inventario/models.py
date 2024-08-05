from django.db import models

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