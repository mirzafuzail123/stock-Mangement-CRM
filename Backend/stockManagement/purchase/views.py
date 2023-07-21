from django.shortcuts import render
from.serializers import *
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.views import APIView 
from rest_framework.generics import CreateAPIView , ListAPIView , RetrieveAPIView , ListCreateAPIView , RetrieveUpdateDestroyAPIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated , IsAdminUser
from django.contrib.auth import authenticate
import decimal
from django.db.models import Q
from rest_framework import filters



# Purchase List
class PurchaseListView(ListAPIView):
    authentication_classes=[JWTAuthentication]
    permission_classes=[IsAuthenticated]
    queryset=PurchaseInventory.objects.all()
    serializer_class=PurchaseListSerializer
    filter_backends=[filters.SearchFilter]
    search_fields=["inventory__itemName"]

    def get_queryset(self):
        store=self.request.GET.get("store")
        fromDateFilter=self.request.GET.get("fromDateFilter")
        toDateFilter=self.request.GET.get("toDateFilter")
        if fromDateFilter:
            return PurchaseInventory.objects.filter(Q(store=store)&Q(created__range=[fromDateFilter , toDateFilter])).order_by("-created")
        else:
            return PurchaseInventory.objects.filter(store=store).order_by("-created")


#Single Purchase View
class SinglePurchaseView(RetrieveAPIView):
    authentication_classes=[JWTAuthentication]
    permission_classes=[IsAuthenticated]
    queryset=PurchaseInventory.objects.all()
    serializer_class=PurchaseListSerializer




# Create Purchase
class CreatePurchaseView(APIView):
    authentication_classes=[JWTAuthentication]
    permission_classes=[IsAuthenticated]

    def post(self , request, format=None):
        purchaseData=request.data
        serializer=CreatePurchaseSerializer(data=purchaseData)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        inventory=Inventory.objects.get(id=purchaseData["inventory"])
        inventory.quantity=int(inventory.quantity)+int(purchaseData["quantity"]) 
        inventory.save()

        return Response(status=status.HTTP_201_CREATED)


# Add Common Expense
class AddCommonPurchaseExpenseView(APIView):
    authentication_classes=[JWTAuthentication]
    permission_classes=[IsAuthenticated]

    def post(self , request , format=None):
        data=request.data
        fromDate=data['fromDate']
        toDate=data["toDate"]
        expenseName=data["expenseName"]
        expenseAmount=data["expenseAmount"]
        purchaseData=PurchaseInventory.objects.filter(Q(created__range=[fromDate , toDate])&Q(store=data["store"]) )
        # If purchase exist
        if purchaseData.exists():
            # Add Expense
            expensePerPurchase=decimal.Decimal(expenseAmount)/len(purchaseData)
            purchaseExpense=PurchaseExpense.objects.create(expenseName=expenseName , expenseAmount=expensePerPurchase)
            # Calculating 
            for purchase in purchaseData:
                purchase.extraExpense.add(purchaseExpense)
                purchase.totalExpenseAmount+=expensePerPurchase
                purchase.totalPurchaseAmount+=expensePerPurchase
                purchase.netPricePerItem+=expensePerPurchase/purchase.quantity
                purchase.save()
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)


# Add Single Expense
class AddSinglePurchaseExpense(APIView):
    authentication_classes=[JWTAuthentication]
    permission_classes=[IsAuthenticated]   

    def patch(self , request , format=None , pk=None):
        try:
            data=request.data
            expenseName=data["expenseName"]
            expenseAmount=data["expenseAmount"]
            # Adding Expense
            expensePerPurchase=decimal.Decimal(expenseAmount) 
            purchaseExpense=PurchaseExpense.objects.create(expenseName=expenseName , expenseAmount=expensePerPurchase)
            # Calulating
            purchase=PurchaseInventory.objects.get(id=pk)
            purchase.extraExpense.add(purchaseExpense)
            purchase.totalExpenseAmount+=expensePerPurchase
            purchase.totalPurchaseAmount+=expensePerPurchase
            purchase.netPricePerItem+=expensePerPurchase/purchase.quantity
            purchase.save()
            
            return Response(status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)



