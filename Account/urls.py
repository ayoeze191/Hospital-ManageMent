
from django.urls import path
from .views import DoctorRegistrationViews, PatientRegistrationViews, LoginView, VerifyEmail, GetUser, RefreshYourToken, LogoutView# MYView
urlpatterns = [
    path('Doctor/register/', DoctorRegistrationViews.as_view(), name='doctor-register'),
    path('Patient/register/', PatientRegistrationViews.as_view(), name='patient-register'),
    path('login/', LoginView.as_view(), name = "login"),
    path('email-verify/', VerifyEmail.as_view(), name = "Verify-email"),
    path('get_user/',  GetUser.as_view(), name='retrieve user'),
    path('refresh_your_token/', RefreshYourToken.as_view(), name='Refresh Token'),
    path('Logout/', LogoutView.as_view(), name='Logout View')
    # path('me', MYView.as_view(),  name='me')
]
