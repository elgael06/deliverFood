# Generated by Django 3.1 on 2020-08-27 22:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sesion', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='accesosubmenu',
            name='idMenu',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='accesousuario',
            name='idAcceso',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='accesousuario',
            name='idUsuario',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='passwordusuario',
            name='idUsuario',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='registresesion',
            name='idUsuario',
            field=models.IntegerField(default=0),
        ),
    ]
