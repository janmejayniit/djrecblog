from django.contrib import admin

# Register your models here.
from .models import Post, Comments, Like_Dislike

# admin.site.register(Post)


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'created_at', 'updated_at')
    search_fields = ('title', 'slug',)
    prepopulated_fields = {'slug': ('title',)}  # Auto-generate slug based on title
    ordering = ('-created_at',)
    list_filter = ('created_at', 'updated_at')
    date_hierarchy = 'created_at'

@admin.register(Comments)
class CommentsAdmin(admin.ModelAdmin):
    list_display = ('post', 'user', 'content', 'created_at', 'updated_at')
    search_fields = ('post', 'user', 'content')
    ordering = ('-created_at',)
    list_filter = ('created_at', 'updated_at')
    date_hierarchy = 'created_at'
