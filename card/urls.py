from django.urls import path
from .views import cardRequest,CardRequestApproval, GetCardDetails
urlpatterns = [
    path("request", cardRequest.as_view(), name="card"),
    path('AdminApprove',CardRequestApproval.as_view(),  name="approve-card"),
    path('getCardDetails/<pk>', GetCardDetails.as_view(), name="Card Details")
]