# Generated by Django 4.0.4 on 2022-06-01 00:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Account', '0002_appointment_end'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='appointment',
            name='time',
        ),
    ]
