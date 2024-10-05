from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework import permissions, status,serializers
from rest_framework.views import APIView, View
from django.contrib.auth.models import User
from rest_framework import viewsets, generics
from rest_framework_simplejwt.tokens import RefreshToken
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.db.models import Sum
from rest_framework.exceptions import NotFound, PermissionDenied
from django.http import HttpResponse
from django.template.loader import render_to_string
from xhtml2pdf import pisa
import datetime

from .models import Medicamento, Movimiento, Profile, Empresa,CustomUser, Alertas
from .serializers import MedicamentoSerializer, MovimientoSerializer, ProfileSerializer, Loginserializer, EmpresaSerializer, Alertaserializer, Registerserializer
from django.middleware.csrf import get_token


def token_view(request):
    csrf_token = get_token(request)
    return JsonResponse({'csrfToken':csrf_token})


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh':str(refresh),
        'access': str(refresh.access_token),
    }

class UserloginView(APIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = Loginserializer
    def post(self, request, format = None):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user is not None:
            try:
                custom_user = user.customuser
                rol = custom_user.rol
                print(f"rol:{rol}")
            except CustomUser.DoesNotExist:
                rol = None

            token =get_tokens_for_user(user)
            return Response({ 'token': token, 'msg':'Login success', 'rol': rol}, status=status.HTTP_200_OK)
        else:
            return Response({ 'errors': {'non_fields_errors':['User or Password is not Valid']}}, status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors, status=status.HTTP_400)
    
class ProfileViewSet(viewsets.ModelViewSet):
        queryset = Profile.objects.all()
        serializer_class = ProfileSerializer
        permission_classes = [permissions.IsAuthenticated]

        def get_queryset(self):
           return Profile.objects.filter(usuarioperfil=self.request.user)

        def perform_create(self,serializer):
            serializer.save(usuarioperfil=self.request.user)


    
class EmpresaViewSet(viewsets.ModelViewSet):
    queryset = Empresa.objects.all()
    serializer_class = EmpresaSerializer
    permission_classes =[permissions.AllowAny]

class UserRegisterView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        serializer = Registerserializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'Mensaje': 'Usuario Creado con Exito!'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class UserProfileView(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        try:
            custom_user = CustomUser.objects.get(usuario=user)
            return Response({
                "username": user.username,
                "empresa":custom_user.empresa.nombre,
                "rol": custom_user.user.rol
            })
        except CustomUser.DoesNotExist:
            return Response({
                "username":user.username,
                "rol":"sin rol"
            }) 

class MedicamentoViewSet(viewsets.ModelViewSet):
    serializer_class = MedicamentoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if not hasattr(user, 'customuser') or not user.customuser.empresa:
            raise PermissionDenied('El usuario no tiene empresa asociada')
        return Medicamento.objects.filter(empresa=user.customuser.empresa)
    

    def perform_create(self, serializer):
        user = self.request.user
        if not hasattr(user, 'customuser') or not user.customuser.empresa:
            raise PermissionDenied('El usuario no tiene una empresa asociada.')
        serializer.save(empresa=user.customuser.empresa)



class MovimientoViewSet(viewsets.ModelViewSet):
    queryset = Movimiento.objects.all()
    serializer_class = MovimientoSerializer
    permission_classes = [permissions.IsAuthenticated]

class AlertasViewSet(viewsets.ModelViewSet):
    queryset = Alertas.objects.all()
    serializer_class = Alertaserializer
    permission_classes = [permissions.IsAuthenticated]

class AlertaListView(APIView):
    def get(self, request):
        alertas = Alertas.objects.filter(activo=True)
        notificaciones = []

        for alerta in alertas:
            medicamento = alerta.medicamento
            cantidad_actual = medicamento.cantidad
            if medicamento.cantidad < alerta.umbral_stock:
                notificaciones.append({
                    'nombre': medicamento.nombre,
                    'stockactual':cantidad_actual,
                    'umbral_stock':alerta.umbral_stock
                })
        return JsonResponse(notificaciones, safe=False)



def generar_reporte_pdf(request):
    movimientos = Movimiento.objects.all()
    empresa_nombre = Empresa.objects.filter()
    fecha_reporte = datetime.datetime.now()

    html = render_to_string('reporte_movimientos.html', {
        'movimientos': movimientos,
        'empresa_nombre': empresa_nombre,
        'fecha_reporte': fecha_reporte
    })

    response = HttpResponse(content_type='application/json')
    response['Content-Disposition'] = 'attachment; filename="reporte.pdf"' 

    pisa_status = pisa.CreatePDF(html, dest=response)

    if pisa_status.err:
        return HttpResponse('Error al generar PDF', status =status.HTTP_400_BAD_REQUEST)
        
    return response


from django.http import HttpResponseForbidden

def my_csrf_failure_view(request, reason=""):
    return HttpResponseForbidden("CSRF verification failed.")