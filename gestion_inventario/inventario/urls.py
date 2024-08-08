from django.urls import path, include
from rest_framework import routers
from inventario import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = routers.DefaultRouter()
router.register(r'medicamentos', views.MedicamentoViewSet)
router.register(r'movimientos', views.MovimientoViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('api/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('login/', views.UserloginView.as_view(), name='login'),
    path('register/', views.ProfileViewSet.as_view(), name='register')
]
