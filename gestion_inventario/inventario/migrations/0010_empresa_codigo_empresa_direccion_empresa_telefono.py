# Generated by Django 5.0.7 on 2024-08-28 15:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventario', '0009_medicamento_empresa_customuser'),
    ]

    operations = [
        migrations.AddField(
            model_name='empresa',
            name='codigo',
            field=models.CharField(default=1, max_length=50),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='empresa',
            name='direccion',
            field=models.CharField(default=1, max_length=255),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='empresa',
            name='telefono',
            field=models.CharField(default=1, max_length=15),
            preserve_default=False,
        ),
    ]
