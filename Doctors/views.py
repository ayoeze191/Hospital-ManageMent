from cgitb import lookup
import imp
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework import filters
from  Account.models import DoctorsProfile
from  .serializer import DoctorSerializer
from Account.authentication import  Authentication
from rest_framework.permissions  import AllowAny
# Create your views here.

class GetAllDoctors(generics.ListAPIView):
    permission_classes = [AllowAny]
    queryset = DoctorsProfile.objects.all()
    serializer_class =  DoctorSerializer

    
class DoctorSearchBySpecialization(generics.ListAPIView):
    # authentication_classes = [Authentication]
    serializer_class = DoctorSerializer
    queryset = DoctorsProfile.objects.all()
    filter_backends = [filters.SearchFilter]
    search_fields = ['^specialization', '^location']





