from calendar import month
from distutils.command.upload import upload
from email.headerregistry import Address
from pickle import FALSE
import profile
from pyexpat import model
from unicodedata import name
from django.db import models
from typing import final
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.dispatch import receiver
from django.db.models.signals import pre_save, post_save
from datetime import datetime, timedelta, tzinfo
import string
import random
# Create your models here.

class CustomUserManager(BaseUserManager):
    def _create_(self, email, password, **extra_fields):
        if not email:
            raise ValueError('Email field is required')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user
    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('first_name', "admin")
        extra_fields.setdefault('last_name', "admin")

        if extra_fields.get('is_staff') is not True:
            raise ValueError("Superuser must have is_staff=True")

        if extra_fields.get('is_superuser') is not True:
            raise ValueError("Superuser must have is_superuser=True")
        return self._create_(email, password, **extra_fields)
    
    def create_Doctor(self, email, password, **extra_fields):
        if not email:
            raise ValueError("Email fied is required")
        email =  self.normalize_email(email)
        user  =  self.model(email = email, **extra_fields)
        user.is_Doctor = True
        user.set_password(password)
        user.save()
        return user



class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    last_name = models.CharField(max_length=255, null=True, blank=True)
    first_name =  models.CharField(max_length=30, null=True, blank=True)
    created_At = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    USERNAME_FIELD = "email"
    is_Doctor = models.BooleanField(default=False)
    objects = CustomUserManager()


    def __str__(self):
        return self.email

def get_image_file_path(self, filename):
    return f"{self.foldername}/{'profile-image.png'}"

class DoctorsProfile(models.Model):
    foldername = "Doctors"
    GenderChoices = (('Male', "M"),
    ('Female', "F"))
    doctor = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    profilepics = models.ImageField(upload_to = get_image_file_path, null = True, blank  =  True)
    specialization = models.CharField(max_length=50, null=True, blank=True)
    phone_Number = models.CharField(max_length=20, null = True, blank=True)
    clinic = models.CharField(max_length=50, null=True, blank=True)
    charges_per_hour = models.DecimalField(null=True, blank=True, decimal_places=2, max_digits=100000)
    time_available  =  models.CharField(max_length=1000,  null = True,  blank=True)
    rating = models.IntegerField(null=True, blank=True)
    Gender = models.CharField(choices=GenderChoices, null=True, blank=True, max_length=20)
    expereince = models.CharField(max_length=60,  null=True, blank=True)
    location = models.CharField(max_length=50,  null=True,  blank=True)
    def __str__(self):
        return self.doctor.email

class PatientProfile(models.Model):
    foldername =  "Patient"
    GenderChoices = (('Male', "M"),
    ('Female', "F"))
    patient = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True,  blank=True)
    profilepics = models.ImageField(upload_to = get_image_file_path, null = True, blank = True)
    DOB = models.DateTimeField(null=True, blank=True)
    Address = models.CharField(max_length=100)
    Blood_Group  = models.CharField(null=True, blank=True, max_length=50)
    phone_number  = models.CharField(null=True, blank=True, max_length=20)
    Gender = models.CharField(choices=GenderChoices, null=True, blank=True, max_length=10)







class PatientCard(models.Model):
    CardModes = (('Approved', "Approved"),
    ('Pending', "Pending"),
    )
    patient = models.OneToOneField(PatientProfile, on_delete=models.CASCADE)
    approved = models.CharField(default="Pending", max_length=50, choices=CardModes)
    cardnumber = models.CharField(null=True , blank=True, max_length=30)
    expiredate  =  models.DateField(null=True, blank=True)
    def save(self):
        cardnumber = random.choices(string.digits, k=16)
        ccons = ''.join(cardnumber)
        self.cardnumber = ""
        for i in range(len(ccons)):
            if i % 4 == 0 and i >  0:
                self.cardnumber += ccons[i] + " "
            self.cardnumber += ccons[i]
        return super().save()
    def __str__(self) -> str:
        return self.patient.patient.email


class  Appointment(models.Model):
    patient = models.ForeignKey(PatientProfile, on_delete=models.CASCADE, related_name="appointmentRequester")
    doctor = models.ForeignKey(DoctorsProfile, on_delete=models.CASCADE,)
    accepted = models.BooleanField(default=False)
    # paid = models.BooleanField(default=False)
    date = models.DateField(null=True, blank=True)
    start = models.TimeField(null=True, blank=True)
    end = models.TimeField(null=True, blank=True)
    completed = models.BooleanField(default=False)


class Prescription(models.Model):
    PreScipritionChoices = (
        ("Morning", "M"),
        ("Afternoon", "A"),
        ("Evening", "E"),
        ("Night", "N")
    )

    appointment = models.ForeignKey(Appointment, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    quantity = models.IntegerField(default=1)
    Days = models.CharField(choices=PreScipritionChoices, blank=True, null=True, max_length=20)

class PatientCharges(models.Model):
    Appointment = models.ForeignKey(Appointment, on_delete=models.CASCADE)
    title = models.CharField(max_length=20)
    amount  = models.DecimalField(blank=True, null=True,  decimal_places=2,  max_digits=100000)
    paid = models.BooleanField(default=False)


def create_patientcharges(sender, instance,  created, **kwargs):
    if created:
        doc = DoctorsProfile.objects.get(doctor = instance.doctor.doctor)
        const = (instance.end.hour -instance.start.hour) * doc.charges_per_hour
        PatientCharges.objects.create(Appointment = instance, title = "appointemt fee", amount = const)


post_save.connect(create_patientcharges, sender=Appointment)


def create_Patient_Doctor_Profile(sender, instance, created, **kwargs):
    if created:
        if instance.is_Doctor:
            DoctorsProfile.objects.create(doctor = instance)
        else:
            PatientProfile.objects.create(patient = instance)
post_save.connect(create_Patient_Doctor_Profile, sender = CustomUser)
























    
class Jwt(models.Model):
    user = models.OneToOneField(
        CustomUser, related_name='login_user', on_delete=models.CASCADE
    )
    access = models.TextField()
    refresh = models.TextField()
 
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)



class BlackListedTokens(models.Model):
    refresh = models.TextField()