# Generated by Django 4.0.4 on 2022-06-01 01:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Account', '0004_appointment_date_alter_appointment_end_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='appointment',
            name='paid',
        ),
        migrations.AddField(
            model_name='patientcharges',
            name='paid',
            field=models.BooleanField(default=False),
        ),
    ]
