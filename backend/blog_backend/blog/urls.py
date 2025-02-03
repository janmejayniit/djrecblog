from django.urls import path
from .views import (getPosts, createPost, post_detail, updatePost,
deletePost, addComment, getComments, getTags, latestPosts, getPostsByTag, add_fake_blogs)

urlpatterns = [
    path('blog/',getPosts, name='getPosts'),
    path('blog/tags/',getTags, name='getTags'),
    path('blog/latest/',latestPosts, name='latestPosts'),
    path('blog/tag/<str:tag>/', getPostsByTag, name='getPostsByTag'),
    path('blog/add/',createPost, name='createPost'),    
    path('blog/<str:slug>/', post_detail, name='post_detail'),
    path('blog/update/<str:slug>',updatePost, name='updatePost'),    
    path('blog/delete/<str:slug>',deletePost, name='deletePost'), 
    path('blog/comment/<str:slug>',getComments, name='getComments'),
    path('blog/comment/add/<str:slug>',addComment, name='addComment'),
    path('blog/fake/add/', add_fake_blogs, name='add_fake_blogs')
]
