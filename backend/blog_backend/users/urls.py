from django.urls import path
from .views import register, login, profile, updateProfile

urlpatterns = [
    path('register/',register, name='register'), 
    path('login/',login, name='login'), 
    path('profile/<str:email>',profile, name='profile'), 
    path('updateProfile/',updateProfile, name='updateProfile'), 
]
