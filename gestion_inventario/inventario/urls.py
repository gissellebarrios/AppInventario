from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MedicamentoViewSet,MovimientoViewSet

router = DefaultRouter()
router.register(r'medicamentos', MedicamentoViewSet)
router.register(r'movimientos', MovimientoViewSet)


urlpatterns = router.urls
