from django.urls import path
from .views import *


urlpatterns = [
    path("" , DashboardDataView.as_view() , name="dashboard")
]
