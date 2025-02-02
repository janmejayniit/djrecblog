from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import CustomUserSerializer
from .models import CustomUser
from rest_framework.response import Response

# Create your views here.
@api_view(['post'])
def register(request):
    if request.method == 'POST':
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(CustomUserSerializer(user).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login(request):
    if request.method == 'POST':
        try:
             
            email = request.data.get('email')
            password = request.data.get('password')
            user = CustomUser.objects.get(email=email)
            if user.check_password(password):
                return Response(CustomUserSerializer(user).data, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'User not found'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': 'SQL Error {}'.format(str(e))}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        return Response({'error': 'Invalid request'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def profile(request):
    if request.method == 'GET':
        user = request.user
        return Response(CustomUserSerializer(user).data, status=status.HTTP_200_OK)

@api_view(['PUT'])
def updateProfile(request):
    if request.method == 'PUT':
        user = request.user
        serializer = CustomUserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['Delete'])
def deleteProfile(request):
    if request.method == 'DELETE':
        user = request.user
        user.delete()
        return Response({'message': 'User deleted'}, status=status.HTTP_204_NO_CONTENT)