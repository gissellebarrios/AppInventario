from rest_framework import serializers
from .models import Medicamento,Movimiento,Profile, Empresa, CustomUser, Alertas
from django.contrib.auth.hashers import make_password


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

class EmpresaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empresa     
        fields = '__all__'

class Userserializer(serializers.ModelSerializer):
    empresa = serializers.PrimaryKeyRelatedField(queryset=Empresa.objects.all())
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'password', 'email','empresa']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        empresa = validated_data.pop('empresa')
        user = CustomUser.objects.create_user(
            username= validated_data['username'],
            email= validated_data['email'],
            password= validated_data['password'],
            empresa = empresa
        )
        return user
        
class Loginserializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'password']

class Alertaserializer(serializers.ModelSerializer):
    medicamento_nombre = serializers.CharField(source='medicamento.nombre', read_only=True)
    class Meta:
        model = Alertas
        fields = ['id','medicamento','medicamento_nombre','umbral_stock']


    