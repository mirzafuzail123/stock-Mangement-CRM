from django.urls import path
from .views import *

urlpatterns = [
    path("purchaseList/" , PurchaseListView.as_view() , name="purchaseList"),
    path("singlePurchase/<int:pk>/" , SinglePurchaseView.as_view() , name="purchaseList"),
    path("createPurchase/" , CreatePurchaseView.as_view() , name="createPurchase"),
    path("addCommonPurchaseExpense/" , AddCommonPurchaseExpenseView.as_view() , name="addCommonPurchaseExpense"),
    path("addSinglePurchaseExpense/<int:pk>/" , AddSinglePurchaseExpense.as_view() , name="addSinglePurchaseExpense"),
]
