from django.urls import path, include
from rest_framework import routers
from inventario import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = routers.DefaultRouter()
router.register(r'medicamentos', views.MedicamentoViewSet, basename='medicamento')
router.register(r'movimientos', views.MovimientoViewSet)
router.register(r'profile', views.ProfileViewSet)
router.register(r'empresas', views.EmpresaViewSet)
router.register(r'alertas', views.AlertasViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('api/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('login/', views.UserloginView.as_view(), name='login'),
    path('register/', views.UserRegisterView.as_view(), name='register'),
    path('bajo-stock/', views.AlertaListView.as_view(), name='alertas-bajo-stock'),
    path('api/user-profile/', views.UserProfileView.as_view(), name='user-profile')
]
