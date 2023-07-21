from django.urls import path
from .views import *

urlpatterns = [
    path("saleList/" , SaleListView.as_view() , name="saleList"),
    path("singleSale/<pk>/" , SingleSaleView.as_view() , name="singleSale"),
    path("createSale/" , CreateSaleView.as_view() , name="createSale"),
    path("addCommonSaleExpense/" , AddCommonSaleExpenseView.as_view() , name="addCommonSaleExpense"),
    path("addSingleSaleExpense/<int:pk>/" , addSingleSaleExpenseView.as_view() , name="addSingleSaleExpense"),
]
