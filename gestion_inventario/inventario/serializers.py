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
    rol = serializers.ChoiceField(choices =[('admin', 'Administrador'),('emp','Empleado')])

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'empresa','rol']
        extra_kwargs = {
            'password':{'write_only': True}
        }

    def create(self,validated_data):
        empresa = validated_data.pop('empresa', None)
        rol = validated_data.pop('rol',None)
        user = User.objects.create_user(**validated_data)
        if empresa and rol:
            CustomUser.objects.create(usuario=user, empresa = empresa, rol = rol)
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


    