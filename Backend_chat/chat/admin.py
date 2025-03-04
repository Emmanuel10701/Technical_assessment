# admin.py
from django.contrib import admin
from .models import User, Chat

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'tokens')
    search_fields = ('username',)

@admin.register(Chat)
class ChatAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'message', 'response', 'timestamp')
    search_fields = ('user__username', 'message')