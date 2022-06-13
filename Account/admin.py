from django.contrib import admin
from .models import CustomUser, Jwt,  Appointment,  DoctorsProfile, PatientProfile,  PatientCard,  PatientCharges, Prescription
# Register your models here.
admin.site.register((CustomUser, Jwt, Appointment, DoctorsProfile,  PatientProfile, PatientCharges, PatientCard, Prescription))

