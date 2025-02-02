from django.shortcuts import render
from .models import Post
from .serializers import PostSerializer, CommentSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from django.contrib.auth.models import User as AuthUser
from users.models import CustomUser

# Create your views here.

@api_view(['GET'])
def getPosts(request):
    posts = Post.objects.all().order_by('-created_at')
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
def createPost(request):
    print(request.data)
    user = CustomUser.objects.get(id=request.data['user'])
    serializer = PostSerializer(data=request.data, context={'user': user})
    if serializer.is_valid(raise_exception=True):
        serializer.save()
    return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET'])
def post_detail(request, slug):
    post = Post.objects.get(slug=slug)
    serializer = PostSerializer(post)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET', 'PUT'])
def updatePost(request, slug):
    post = Post.objects.get(slug=slug)
    if request.method == 'GET':
        serializer = PostSerializer(post)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'PUT':
        parser_classes = (MultiPartParser,FormParser)
        serializer = PostSerializer(post, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def deletePost(request, slug):
    post = Post.objects.get(slug=slug)
    post.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['POST'])
def addComment(request, slug):  
    post = Post.objects.get(slug=slug)
    user = CustomUser.objects.get(id=request.data['user'])
    serializer = CommentSerializer(data=request.data, context={'user': user})
    if serializer.is_valid(raise_exception=True):
        serializer.save(post=post)
    return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET'])
def getComments(request, slug):
    post = Post.objects.get(slug=slug)
    comments = post.comments.all()
    serializer = CommentSerializer(comments, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

