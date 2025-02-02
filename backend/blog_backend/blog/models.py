from django.db import models
from django.utils.text import slugify
# from django.db.models import Q
from django.urls import reverse
from django.core.exceptions import ValidationError
from django.conf import settings

# Create your models here.
class Post(models.Model):
    # user = models.ForeignKey('auth.User', on_delete=models.CASCADE, null=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)  # Corrected line
    title = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, unique=True, null=True)
    content = models.TextField(blank=True, null=True)
    banner = models.ImageField(upload_to='blog/banner/', blank=True, null=True)
    tags = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        if self.banner:
            # Example: Check if the image size is larger than 5 MB
            max_size = 10 * 1024 * 1024  # 10 MB
            if self.banner.size > max_size:
                raise ValidationError("The image size exceeds the maximum allowed size of 5 MB.")
    


        self.slug = slugify(self.title)  # Automatically convert title to a slug
        # Ensure the slug is unique
        original_slug = self.slug
        counter = 1
        while Post.objects.filter(slug=self.slug).exists():
            self.slug = f"{original_slug}-{counter}"
            counter += 1
        return super().save(*args, **kwargs)   
    
    def get_absolute_url(self):
        return self.slug
        # return reverse(kwargs={'slug': self.slug})

class Comments(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    # user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)  # Corrected line
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.content
    
    class Meta:
        ordering = ['-created_at']

class Like_Dislike(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='likes')
    # user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)  # Corrected line
    status = models.BooleanField(default=True)  # True for like, False for dislike
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.username
    
    class Meta:
        unique_together = ('post', 'user')
        ordering = ['-created_at']
    
    @property
    def like_count(self):
        return self.filter(status=True).count()
    
    @property
    def dislike_count(self):
        return self.filter(status=False).count()
    
