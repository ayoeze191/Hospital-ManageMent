from dataclasses import fields
from email.policy import default
from pyexpat import model
from xmlrpc.client import boolean
from Account.models import DoctorsProfile, Appointment
from rest_framework import serializers

class AppointmentSerializer(serializers.Serializer):
   date = serializers.DateField()
   start = serializers.TimeField()
   end = serializers.TimeField()

class AllApointment(serializers.ModelSerializer):
   class Meta:
      model = Appointment
      fields = '__all__'
      depth = 2


      