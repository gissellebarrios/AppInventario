from django.shortcuts import render
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework import permissions, status
from rest_framework.views import APIView
from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Medicamento, Movimiento, Profile
from .serializers import MedicamentoSerializer, MovimientoSerializer, Userserializer, ProfileSerializer


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh':str(refresh),
        'access': str(refresh.access_token),
    }

class UserloginView(APIView):
    serializer_class = Userserializer
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
    
class ProfileViewSet(APIView):
    def post(self, request, format =None):
        serializer_class = ProfileSerializer(data=request.data)
        if serializer_class.is_valid():
            serializer_class.save()
            return Response({'Mensaje': 'Registro Exitoso!'}, status=status.HTTP_201_CREATED)
        return Response(serializer_class.errors, status=status.HTTP_400_BAD_REQUEST)
    

class MedicamentoViewSet(viewsets.ModelViewSet):
    queryset = Medicamento.objects.all()
    serializer_class = MedicamentoSerializer
    permission_classes = [permissions.IsAuthenticated]


class MovimientoViewSet(viewsets.ModelViewSet):
    queryset = Movimiento.objects.all()
    serializer_class = MovimientoSerializer
    permission_classes = [permissions.IsAuthenticated]


