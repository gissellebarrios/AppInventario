from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework import permissions, status,serializers
from rest_framework.views import APIView
from django.contrib.auth.models import User
from rest_framework import viewsets, generics
from rest_framework_simplejwt.tokens import RefreshToken
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

from .models import Medicamento, Movimiento, Profile, Empresa,CustomUser, Alertas
from .serializers import MedicamentoSerializer, MovimientoSerializer, Userserializer, ProfileSerializer, Loginserializer, EmpresaSerializer, Alertaserializer
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
            token =get_tokens_for_user(user)
            return Response({ 'token': token, 'msg':'Login success'}, status=status.HTTP_200_OK)
        else:
            return Response({ 'errors': {'non_fields_errors':['User or Password is not Valid']}}, status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors, status=status.HTTP_400)
    
class ProfileViewSet(viewsets.ModelViewSet):
        queryset = Profile.objects.all()
        serializer_class = ProfileSerializer
        permission_classes = [permissions.IsAuthenticated]
    
class EmpresaViewSet(viewsets.ModelViewSet):
    queryset = Empresa.objects.all()
    serializer_class = EmpresaSerializer
    permission_classes =[permissions.AllowAny]

class UserRegisterView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        serializer = Userserializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'Mensaje': 'Usuario Creado con Exito!'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class MedicamentoViewSet(viewsets.ModelViewSet):
    serializer_class = MedicamentoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Medicamento.objects.filter(empresa=self.request.user.empresa)
    

    def perform_create(self, serializer):
        serializer.save(empresa=self.request.user.empresa)



class MovimientoViewSet(viewsets.ModelViewSet):
    queryset = Movimiento.objects.all()
    serializer_class = MovimientoSerializer
    permission_classes = [permissions.IsAuthenticated]

class AlertasViewSet(viewsets.ModelViewSet):
    queryset = Alertas.objects.all()
    serializer_class = Alertaserializer
    permission_classes = [permissions.IsAuthenticated]

class AlertaListView(generics.ListAPIView):
    queryset = Alertas.objects.select_related('medicamento').all()
    serializer_class = Alertaserializer


from django.http import HttpResponseForbidden

def my_csrf_failure_view(request, reason=""):
    return HttpResponseForbidden("CSRF verification failed.")