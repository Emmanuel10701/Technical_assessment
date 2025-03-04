from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, AuthViewSet, ChatViewSet, TokenBalanceViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')

urlpatterns = router.urls + [
    path('auth/login/', AuthViewSet.as_view({'post': 'login'}), name='login'),
    path('chat/send/', ChatViewSet.as_view({'post': 'send_message'}), name='send_message'),
    path('tokens/balance/', TokenBalanceViewSet.as_view({'get': 'balance'}), name='token_balance'),
]
