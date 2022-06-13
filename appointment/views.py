from email import utils
import email
import imp
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework import filters
from  Account.models import  Appointment, CustomUser, DoctorsProfile, PatientProfile,  PatientCard
from  .serializer import AppointmentSerializer, AllApointment #TestSerailizer
from Account.authentication import  Authentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK,  HTTP_403_FORBIDDEN
from Account.utils import Util
from Account.models import PatientCard
# from .permission import IsDoctor
# Create your views here.
def checkDoctorsApointmentList(id, date, start, end):
    doctor = DoctorsProfile.objects.get(pk=id)
    appointments =  Appointment.objects.filter(doctor = doctor, date = date)
    possible = True
    for i in appointments:
        if start >= i.start and end <= i.end:
            possible = False
    return possible


# class exampleAppointment(APIView):
#     serializer_classes = TestSerailizer
    
#     def get(self, request):
#         serializer = self.serializer_classes(Appointment.objects.all(), many = True)
#         return Response(serializer.data, status=200)



class AppointmentRequest(APIView):
    authentication_classes = [Authentication]
    permission_classes = [IsAuthenticated]
    serializer_class = AppointmentSerializer
    def post(self, request, pk):
        data = request.data
        serializer = self.serializer_class(data = data)
        serializer.is_valid(raise_exception = True)
        current_user = request.user
        current_user_profile = PatientProfile.objects.get(patient = current_user)

        # pk is the id of the Doctor who you are sending an appointment request to
        doctor = DoctorsProfile.objects.get(pk = pk)
        check_appointment  = checkDoctorsApointmentList(pk, serializer.validated_data['date'], serializer.validated_data['start'],serializer.validated_data['end'])
        if PatientCard.objects.filter(patient = current_user_profile).exists():
            if check_appointment:
                Appointment.objects.create(patient = current_user_profile, doctor = doctor, **serializer.validated_data)
                data = {
                    'subject': 'Appointment Request',
                    'email_body': 'An appointment Request was sent to you by'  + current_user_profile.patient.email  + 'please visit your dashboard to approve it',
                    'user': doctor.doctor.email
                }
                # Util.send_email(data)
                return Response({"Apointment Request Sent, Appointment Should be granted in no time, Please  Note that the date and time is subject to change"}, status=HTTP_200_OK)
            else:
                return Response({"Please Pick  Another Date and Time"}, status=HTTP_403_FORBIDDEN)
        else:
            return Response({"Please You  need To enroll For Card before any Appointment"})


class GetAllAppoinment(APIView):
    authentication_classes = [Authentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        appointment = Appointment.objects.all()
        serializer = AllApointment(appointment, many = True)
        return Response({
            "data": serializer.data
        })


class AppointementApproval(APIView):
    authentication_classes = [Authentication]
    permission_classes = [IsAuthenticated]

    # pk is the id of the Appointment
    def get(self, request, pk):
        appointment = Appointment.objects.get(pk = pk)
        doctor = request.user
        doctor_profile = DoctorsProfile.objects.get(doctor = doctor)
        
        if appointment.doctor == doctor_profile:
            appointment.accepted == True
            appointment.save()
            data = {
                'email_body': 'Your Appointment Request had been granted Please check the website for more details about date changes',
                'subject': 'Appoinment Approval',
                'user':  appointment.patient.email
            }

            Util.send_email(data)
            return Response ({"appointment approved"},  status=HTTP_200_OK)
        else:

            return  Response({"You can not approve this appointement"}, status=HTTP_403_FORBIDDEN)


class Fufillappointment(APIView):
    authentication_classes = [Authentication]
    permission_classes = [IsAuthenticated]

    # pk  is the id of the appointment
    def get(self, request, pk):
        appointment = Appointment.objects.get(pk = pk)
        doctor = request.user
        doctor_profile = DoctorsProfile.objects.get(doctor=doctor)
        if appointment.doctor == doctor_profile:
            appointment.completed = True
            return Response({"appointment Fufilled"},  status=HTTP_200_OK)
        else:
            return  Response({"You are not Allowed to Complete This Appointment"}, status=HTTP_403_FORBIDDEN)