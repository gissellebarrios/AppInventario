from django.urls import path, include
from rest_framework import DefaultRouter
from .views import MedicamentoViewSet

router = DefaultRouter()
router.register(r'medicamentos', MedicamentoViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
