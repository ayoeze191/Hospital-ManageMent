from  django.urls import path 
from .views import GetAllDoctors, DoctorSearchBySpecialization
urlpatterns = [
    path('', GetAllDoctors.as_view(), name="all_doctors"),
    path('specialisation/location',DoctorSearchBySpecialization.as_view(), name='searchbyspecialization'),
]