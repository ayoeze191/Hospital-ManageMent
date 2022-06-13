from Account.models import DoctorsProfile
from rest_framework import serializers

class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = DoctorsProfile
        fields = "__all__"
        depth = 2
    