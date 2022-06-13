from  django.urls import path 
from .views import AppointmentRequest, AppointementApproval, GetAllAppoinment
urlpatterns = [
    path('request/<pk>/', AppointmentRequest.as_view(), name="appointmentRequest"),
    # path('patientcardRequest',  cardRequest.as_view(), name = "card Request"),
    path('doctorApproveApointment/', AppointementApproval.as_view(), name="doctor_approveAppointment"),
    path('allApointment/', GetAllAppoinment.as_view(), name="allApointment")
]