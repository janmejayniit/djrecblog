from django.contrib import admin
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser
from django.utils.html import format_html



# Register your models here.
class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ['display_profile_picture','email', 'first_name', 'last_name', 'is_active', 'is_staff', 'date_joined']
    # list_filter = ['is_active', 'is_staff']
    # search_fields = ['email', 'first_name', 'last_name']
    # ordering = ['id']
    readonly_fields = ['date_joined']

    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('avatar',)}),
    )
    # Exclude date_joined from the form to prevent it from being edited
    # fieldsets = UserAdmin.fieldsets + (
    #     (None, {'fields': ('email', 'first_name', 'last_name', 'password')}),
    # )
    
    # add_fieldsets = UserAdmin.add_fieldsets + (
    #     (None, {'fields': ('email', 'first_name', 'last_name', 'password')}),
    # )
    
    # # Alternatively, you can exclude it like this:
    # exclude = ('date_joined',)

    def display_profile_picture(self, obj):
        if obj.avatar:
            return format_html(f'<img src="{obj.avatar.url}" style="width: 80px; height: 50px;" />')
        return "No Image"
    display_profile_picture.short_description = 'Profile Picture'

admin.site.register(CustomUser, CustomUserAdmin)
# admin.site.register(CustomUser)

