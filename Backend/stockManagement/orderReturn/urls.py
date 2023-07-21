from django.urls import path
from .views import *


urlpatterns = [
    path("returnList/" , ReturnListView.as_view() , name="returnList"),
    path("createReturn/" , CreateReturnView.as_view() , name="createReturn"),
]
