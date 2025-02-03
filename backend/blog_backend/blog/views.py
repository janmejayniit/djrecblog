from django.shortcuts import render
from .models import Post
from .serializers import PostSerializer, CommentSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from django.contrib.auth.models import User as AuthUser
from users.models import CustomUser
from rest_framework.pagination import PageNumberPagination


# Create your views here.

class PostPagination(PageNumberPagination):
    page_size = 10  # Number of posts per page
    page_size_query_param = 'page_size'
    max_page_size = 100

@api_view(['GET'])
def getPosts(request):
    # posts = Post.objects.all().order_by('-created_at')
    # serializer = PostSerializer(posts, many=True)
    # return Response(serializer.data, status=status.HTTP_200_OK)
    posts = Post.objects.all().order_by('-created_at')
    paginator = PostPagination()
    paginated_posts = paginator.paginate_queryset(posts, request)
    serializer = PostSerializer(paginated_posts, many=True)
    return paginator.get_paginated_response(serializer.data)




@api_view(['GET'])
def getTags(request):
    try:
        tags = Post.objects.all().values_list('tags', flat=True).distinct()
        tags_list = set(tag.strip() for sublist in tags for tag in sublist.split(','))
        return Response(list(tags_list), status=status.HTTP_200_OK)
    except Post.DoesNotExist:
        return Response({"error": "Posts not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def getPostsByTag(request, tag):
    try:
        posts = Post.objects.filter(tags__contains=tag)
        # serializer = PostSerializer(posts, many=True)
        # return Response(serializer.data, status=status.HTTP_200_OK)
        paginator = PostPagination()
        paginated_posts = paginator.paginate_queryset(posts, request)
        serializer = PostSerializer(paginated_posts, many=True)
        return paginator.get_paginated_response(serializer.data)

    except Post.DoesNotExist:
        return Response({"error": "Posts not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def latestPosts(request):
    try:
        posts = Post.objects.all().order_by('-created_at')[:5]
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Post.DoesNotExist:
        return Response({"error": "Posts not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def createPost(request):
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

@api_view(['GET'])
def add_fake_blogs(request):
    from faker import Faker
    fake = Faker()
    user = CustomUser.objects.get(id=8)
    for _ in range(100):  # Adjust the range for the number of records you want
        # Example of creating tags using random words or any other approach
        tags = [fake.word() for _ in range(3)]  # You can create a list of 3 random words for tags
        
        Post.objects.create(
            user=user,
            title=fake.sentence(),  # Use sentence() for title (you can also use title() if you prefer)
            banner='blog/banner/happy-woman-looking-trips-internet.jpg',  # Assuming this is a static path
            content=fake.text(),  # Use text() to generate long-form content
            tags=', '.join(tags)  # Assuming your model stores tags as a list or a string (modify as needed)
        )
    return Response(status=status.HTTP_200_OK)
