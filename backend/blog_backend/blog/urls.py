from django.urls import path
from .views import getPosts, createPost, post_detail, updatePost, deletePost, addComment, getComments

urlpatterns = [
    path('blog/',getPosts, name='getPosts'),
    path('blog/add/',createPost, name='createPost'),    
    path('blog/<slug:slug>/', post_detail, name='post_detail'),
    path('blog/update/<str:slug>',updatePost, name='updatePost'),    
    path('blog/delete/<str:slug>',deletePost, name='deletePost'), 
    path('blog/comment/<str:slug>',getComments, name='getComments'),
    path('blog/comment/add/<str:slug>',addComment, name='addComment'),
]
