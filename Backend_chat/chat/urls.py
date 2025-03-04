from django.urls import path
from .views import RegisterView, LoginView, ChatView, TokenBalanceView

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("chat/", ChatView.as_view(), name="chat"),
    path("tokens/", TokenBalanceView.as_view(), name="tokens"),
]
