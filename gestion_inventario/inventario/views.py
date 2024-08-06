from django.shortcuts import render
from rest_framework.permissions import AllowAny

from rest_framework import viewsets
from .models import Medicamento, Movimiento
from .serializers import MedicamentoSerializer, MovimientoSerializer

class MedicamentoViewSet(viewsets.ModelViewSet):
    queryset = Medicamento.objects.all()
    serializer_class = MedicamentoSerializer
    permission_classes = [AllowAny]


class MovimientoViewSet(viewsets.ModelViewSet):
    queryset = Movimiento.objects.all()
    serializer_class = MovimientoSerializer