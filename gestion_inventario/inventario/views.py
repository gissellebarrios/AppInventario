from django.shortcuts import render

from rest_framework import viewsets
from .models import Medicamento, Movimiento
from .serializers import MedicamentoSerializer, MovimientoSerializer

class MedicamentoViewSet(viewsets.ModelViewSet):
    queryset = Medicamento.objects.all()
    serializer_class = MedicamentoSerializer


class MovimientoViewSet(viewsets.ModelViewSet):
    queryset = Movimiento.objects.all()
    serializer_class = MovimientoSerializer