from rest_framework import serializers
from .models import Medicamento,Movimiento,Profile


from django.contrib.auth.models import User

class MedicamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medicamento
        fields = '__all__'


class MovimientoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movimiento
        fields = '__all__'

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile     
        fields = '__all__'

class Userserializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','password']




    