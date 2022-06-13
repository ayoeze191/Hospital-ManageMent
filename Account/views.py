
import email
from typing import Any


from django.conf import settings
import random
import string
from datetime import datetime, timedelta
from django.contrib.auth import authenticate
# Create your views here.
from rest_framework.views import APIView

from Account.authentication import Authentication
from .serializer import LoginSerializer, TokenSerializer, UserSerializer, LogOutTokenSerializers, RegistrationSerializer, PatientRegisterSerializer
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_408_REQUEST_TIMEOUT,  HTTP_404_NOT_FOUND
from rest_framework import generics
from .models import BlackListedTokens, CustomUser, Jwt 
import jwt
from rest_framework.permissions  import AllowAny
from .utils import Util
from django.contrib.sites.shortcuts  import get_current_site
from django.urls import reverse
# from .SendinBlue import run





def get_random(length):
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=length))
def get_access_token(payload):
    return jwt.encode({'exp':datetime.now() + timedelta(hours=5), **payload}, 
    settings.SECRET_KEY, algorithm="HS256")


def get_refresh_token():
    return jwt.encode(
        {"exp": datetime.now() + timedelta(days=365), "data":get_random(10)},
         settings.SECRET_KEY, algorithm="HS256"
    )

class DoctorRegistrationViews(APIView):
    def post(self, request):
        data = request.data
        serializer = RegistrationSerializer(data = data)
        serializer.is_valid(raise_exception = True)
        CustomUser.objects.create_Doctor(**serializer.validated_data)
        return Response({"You have Succesfully Registered  as A  Doctor"})


class PatientRegistrationViews(APIView):
    def post(self, request):
        data = request.data
        serializer = PatientRegisterSerializer(data = data)
        refresh = get_refresh_token()
        serializer.is_valid(raise_exception = True)
        serializer.save()
        # print("working")
        
        # CustomUser.objects._create_(**serializer.validated_data)
        user = CustomUser.objects.get(email = serializer.validated_data['email'])
        refresh = get_refresh_token()
        access = get_access_token({"user_id": user.id, "username":serializer.validated_data['email'], 'user_id': user.id})
        current_site = get_current_site(request).domain
        relativeLink = reverse('Verify-email')
        absolute_url = 'https://'+current_site+relativeLink+"?token="+str(access)
        email_body = 'Hi '+ user.email + ' Use the Link below to Verify your email \n'+absolute_url
        email_data = {'email_body':email_body, 'subject': 'Verify  your email', 'user': user.email}
        Util.send_email(email_data)
        return Response({"You have Succesfully Registered as a Patient"}, status = HTTP_200_OK)


class VerifyEmail(generics.GenericAPIView):
    def get(self, request):
        token = request.GET.get('token')
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithm="HS256")
            if CustomUser.objects.filter(id = payload.user_id).exists():
                return Response({'email': 'Succesfully activated'}, status = HTTP_200_OK)
            else:
                return Response({'email': 'User does not exist'})
        except jwt.ExpiredSignatureError as identifier:
            return  Response({"email":  "Link expired"}, status = HTTP_408_REQUEST_TIMEOUT)

        except jwt.excetion.DecodeError as identifier:
            return Response({'error': 'invalid Token'}, status=HTTP_404_NOT_FOUND)


class LoginView(APIView):
    permission_classes = [AllowAny]
    serializer_class = LoginSerializer
    def post(self, request):
        # print(request)
        # print('working')
        data = request.data
        # print(request.data)
        serializer = self.serializer_class(data=data)
        serializer.is_valid(raise_exception=True)
        user = authenticate(username = serializer.validated_data['email'], password = serializer.validated_data['password'])
        if not user:
            return Response({"invalid: username"}, status=400)
        Jwt.objects.filter(user_id=user.id).delete()
        access = get_access_token({"user_id": user.id, "username": user.get_username()})
      
        refresh = get_refresh_token()
        serializedUser = UserSerializer(user)
        Jwt.objects.create(
            user_id = user.id, access=access, refresh=refresh
        )
        return Response({'access': access, 'refresh': refresh, 'user': serializedUser.data}, status = HTTP_200_OK)



class LogoutView(APIView):
    serializer_class = LogOutTokenSerializers
    authentication_classes  = [Authentication]
    def post(self, request):
        serializer = self.serializer_class(data = request.data)
        serializer.is_valid(raise_exception=True)
        BlackListedTokens.objects.create(refresh = serializer.validated_data['refresh'])
        Jwt.objects.get(refresh=serializer.validated_data["refresh"]).delete()
        return Response({"logged out successfully"}, status = HTTP_200_OK)



class GetUser(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    authentication_classes  = [Authentication]
    def get(self, request, *args, **kwargs):
        user = request.user 
        serializer = self.get_serializer(user)
        return Response({"data": serializer.data})

class RefreshYourToken(APIView):
    serializerClass = TokenSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializerClass(request.data)
        verifytoken = Authentication.verify_token(serializer.validated_data['refresh'])
        try:
            active_jwt = Jwt.objects.get(refresh=serializer.validated_data["refresh"])
        except Jwt.DoesNotExist:
            return Response({"error": "refresh does not exist"}, status='404')
        if not verifytoken:
            return Response({"error": "Token is invalid"})
        refresh_token = BlackListedTokens(refreshtoken = serializer.validated_data['refresh'])
        refresh_token.save()
        access = get_access_token({"user_id": active_jwt.user.id})
        refresh = get_refresh_token()
        exp = jwt.decode(access, settings.SECRET_KEY, algorithms="HS256" )['exp']
        active_jwt.access = access
        active_jwt.refresh = refresh
        active_jwt.save()
        PersonSerializer = UserSerializer(active_jwt.user)
        return Response({
            'access': access, 'refresh': refresh, 'user': PersonSerializer.data, 'exp': exp 
        })