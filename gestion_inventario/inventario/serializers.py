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


class Registerserializer(serializers.ModelSerializer):
    empresa = serializers.PrimaryKeyRelatedField(queryset=Empresa.objects.all(), required=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'empresa']
        extra_kwargs = {
            'password':{'write_only': True}
        }

    def create(self,validated_data):
        empresa = validated_data.pop('empresa', None)
        user = User.objects.create_user(**validated_data)
        if empresa:
            CustomUser.objects.create(usuario=user, empresa = empresa)
        return user
        
class Loginserializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password']

class Alertaserializer(serializers.ModelSerializer):
    medicamento_nombre = serializers.CharField(source='medicamento.nombre', read_only=True)
    class Meta:
        model = Alertas
        fields = ['id','medicamento','medicamento_nombre','umbral_stock']


    