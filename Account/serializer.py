from dataclasses import field, fields
import email
from os import set_inheritable
from wsgiref import validate
from xml.parsers.expat import model
from .models  import  CustomUser
from rest_framework import serializers

from .models import BlackListedTokens, CustomUser, Jwt

class LoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only = True)
    class Meta:
        model = CustomUser
        fields = ['email', 'password']

     
class LogOutTokenSerializers(serializers.Serializer):
    refresh = serializers.CharField()
    def validate(self, attrs):
        if not Jwt.objects.filter(refresh = attrs['refresh']).exists():
            serializers.ValidationError('invalid Json WebToken')
        if BlackListedTokens.objects.filter(refresh = attrs['refresh']).exists():
            serializers.ValidationError('token already Blacklisted')
        return attrs
    

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'
        

    # email = serializers.EmailField()
    # is_staff = serializers.BooleanField()
    # is_superuser = serializers.BooleanField()
    # is_Doctor = serializers.BooleanField()


class RegistrationSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()

    def validate(self, validated_data):
        if  CustomUser.objects.filter(email = validated_data['email']).exists():
            serializers.ValidationError('email Already exist')
        return validated_data

class PatientRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['email', 'password', 'first_name', 'last_name']

    def create(self,  validated_data):
        return CustomUser.objects._create_(email = validated_data['email'], 
        password = validated_data['password'], 
        first_name = validated_data['first_name'],
        last_name = validated_data['last_name']
        )

class TokenSerializer(serializers.Serializer):
    refresh = serializers.CharField()
    