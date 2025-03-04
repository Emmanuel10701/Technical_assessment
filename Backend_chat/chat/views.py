# views.py
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model
from .models import Chat
from .serializers import UserSerializer, ChatSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        user = get_user_model().objects.create(
            username=request.data['username'],
            password=request.data['password']
        )
        user.set_password(request.data['password'])
        user.save()
        token, _ = Token.objects.get_or_create(user=user)
        return Response({'token': token.key, 'message': 'User registered successfully'})

class AuthViewSet(viewsets.ViewSet):
    @action(detail=False, methods=['post'])
    def login(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = get_user_model().objects.filter(username=username).first()
        if user and user.check_password(password):
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'token': token.key})
        return Response({'error': 'Invalid credentials'}, status=400)

class ChatViewSet(viewsets.ViewSet):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['post'])
    def send_message(self, request):
        user = request.user
        if user.tokens < 100:
            return Response({'error': 'Insufficient tokens'}, status=400)
        user.tokens -= 100
        user.save()
        message = request.data.get('message')
        response = "This is a dummy AI response."  # Replace with real AI integration
        Chat.objects.create(user=user, message=message, response=response)
        return Response({'message': message, 'response': response, 'remaining_tokens': user.tokens})

class TokenBalanceViewSet(viewsets.ViewSet):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['get'])
    def balance(self, request):
        return Response({'tokens': request.user.tokens})