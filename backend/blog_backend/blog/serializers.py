from rest_framework import serializers
from .models import Post, Comments

class PostSerializer(serializers.ModelSerializer):
    banner = serializers.ImageField(required=False)  # or FileField if you allow other types of files
    get_absolute_url = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['id', 'title' , 'slug' , 'content' , 'banner' , 'tags', 'created_at' , 'updated_at', 'get_absolute_url']
        read_only_fields = ['created_at', 'updated_at']
    
    def create(self, validated_data):
        # Access user from the context
        user = self.context.get('user')
        # Create the post and associate it with the user
        post = Post.objects.create(user=user, **validated_data)
        return post

    def get_absolute_url(self, obj):
        return obj.get_absolute_url()

class CommentSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    class Meta:
        model = Comments
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at', 'user']
    
    def create(self, validated_data):
        # Access the user from context and associate it with the comment
        user = self.context['user']
        validated_data['user'] = user
        return super().create(validated_data)



