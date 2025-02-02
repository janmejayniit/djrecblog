from django.contrib import admin
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser


# Register your models here.
class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ['email', 'first_name', 'last_name', 'is_active', 'is_staff', 'date_joined']
    list_filter = ['is_active', 'is_staff']
    search_fields = ['email', 'first_name', 'last_name']
    ordering = ['email']

    # # Exclude date_joined from the form to prevent it from being edited
    # fieldsets = UserAdmin.fieldsets + (
    #     (None, {'fields': ('email', 'first_name', 'last_name', 'password')}),
    # )
    
    # add_fieldsets = UserAdmin.add_fieldsets + (
    #     (None, {'fields': ('email', 'first_name', 'last_name', 'password')}),
    # )
    
    # # Alternatively, you can exclude it like this:
    exclude = ('date_joined',)

admin.site.register(CustomUser, CustomUserAdmin)
# admin.site.register(CustomUser)

