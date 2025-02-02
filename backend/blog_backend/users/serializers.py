from rest_framework import serializers
from .models import CustomUser

class CustomUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)  # Make sure password is write-only

    class Meta:
        model = CustomUser
        fields = ['id','email', 'password', 'first_name', 'last_name', 'phone_number', 'avatar', 'bio', 'address']

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = CustomUser(**validated_data)
        user.set_password(password)  # Hash password before saving
        user.save()
        return user