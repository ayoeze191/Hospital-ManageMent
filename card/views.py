from dataclasses import field
from pyexpat import model
from urllib import request, response
from django.shortcuts import render
from Account.authentication import  Authentication
from  Account.models import  Appointment, CustomUser, DoctorsProfile, PatientProfile,  PatientCard
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated,  IsAdminUser
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .permission import IsOwner
from rest_framework.status import HTTP_200_OK, HTTP_408_REQUEST_TIMEOUT,  HTTP_404_NOT_FOUND

# Create your views here.

class cardRequest(APIView):
    authentication_classes = [Authentication]
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        user_profile = PatientProfile.objects.get(patient = user)
        patientcard = PatientCard(patient  = user_profile)
        patientcard.save()
        return Response({
                    "data": {"email": request.user.email}
                }, status = HTTP_200_OK)

    
class CardRequestApproval(APIView):
    authentication_classes = [Authentication]
    permission_classes  = [IsAdminUser]
    def get(self, pk):
        card = PatientCard.objects.get(pk=pk)
        card.approved = True
        card.save()
        return Response({"Card Approved"})


class CardSerializer(ModelSerializer):
    class Meta:
        model = PatientCard
        fields = "__all__"
        depth = 2

class GetCardDetails(generics.RetrieveAPIView):
    authentication_classes = [Authentication]
    permission_classes = [IsAuthenticated]
    serializer_class = CardSerializer
    queryset = PatientCard.objects.all()
    # def get_queryset(self):
    #     user = self.request.user
    #     return PatientCard.objects.filter(patient__patient = user)
    def get(self, request , *args, **kwargs):
        # print(queryset)
        # print(request.user.email)
        # print(self.kwargs.get('pk'))
        
        try:
            # a = CustomUser.objects.get(pk=self.kwargs.get('pk'))
            # patient = PatientProfile.objects.get(patient = a)
            # print(patient.id)
            
            patient = self.get_queryset().get(patient__patient__id = self.kwargs.get('pk'))
            serializer = self.get_serializer(patient)
            # print(serializer)
            if patient.approved == "Approved":
                return Response({
                    "data": serializer.data
                }, HTTP_200_OK)
            else:
                return Response({
                    "data": {"email": request.user.email, "message": "Card Not Verified Yet"}
                }, status = HTTP_200_OK)
        except PatientCard.DoesNotExist:
            return Response({"data" : "Patient as no Card yet"}, HTTP_404_NOT_FOUND)