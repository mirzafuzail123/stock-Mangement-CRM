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
import uuid
from rest_framework import filters



# Sale List
class SaleListView(ListAPIView):
    authentication_classes=[JWTAuthentication]
    permission_classes=[IsAuthenticated]
    queryset=Sale.objects.all()
    serializer_class=SaleListSerializer
    filter_backends=[filters.SearchFilter]
    search_fields=["inventory__itemName" , "orderId"]

    def get_queryset(self):
        store=self.request.GET.get("store")
        saleType=self.request.GET.get("saleType")
        fromDateFilter=self.request.GET.get("fromDateFilter")
        toDateFilter=self.request.GET.get("toDateFilter")
        user=self.request.user
        
        # Checking if someone has changed the local storage
        if user.is_superuser or (user.userPermissions.userRole=="Online seller" and saleType=="Online") or (user.userPermissions.userRole=="POS seller" and saleType=="POS"):
            if fromDateFilter:
                return Sale.objects.filter(Q(store=store)&Q(saleType=saleType)&Q(created__range=[fromDateFilter , toDateFilter])).order_by("-created")
            else:
                return Sale.objects.filter(Q(store=store)&Q(saleType=saleType)).order_by("-created")
            
        else:
            return []



#Single Sale View
class SingleSaleView(RetrieveAPIView):
    authentication_classes=[JWTAuthentication]
    permission_classes=[IsAuthenticated]
    queryset=Sale.objects.all()
    serializer_class=SaleListSerializer



# Create Sale
class CreateSaleView(APIView):
    authentication_classes=[JWTAuthentication]
    permission_classes=[IsAuthenticated]

    def post(self , request, format=None):
        user=request.user
        saleData=request.data
        saleType=saleData["saleType"]
        # Checking if someone has changed the local storage
        if user.is_superuser or (user.userPermissions.userRole=="Online seller" and saleType=="Online") or (user.userPermissions.userRole=="POS seller" and saleType=="POS"):
            inventory=Inventory.objects.get(id=saleData["inventory"])
            # Insufficeient Inventory
            if int(saleData["quantity"]) > int(inventory.quantity):
                return Response(status=status.HTTP_406_NOT_ACCEPTABLE)
            
            # Checking Sale Type
            if saleType=="POS":
                saleData["orderId"]=str(uuid.uuid4().hex)[:12]

            serializer=CreateSaleSerializer(data=saleData)
            serializer.is_valid(raise_exception=True)
            serializer.save()

            inventory.quantity=int(inventory.quantity)-int(saleData["quantity"]) 
            inventory.save()

            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)



# Add Common Expense
class AddCommonSaleExpenseView(APIView):
    authentication_classes=[JWTAuthentication]
    permission_classes=[IsAuthenticated]

    def post(self , request , format=None):
        data=request.data
        fromDate=data['fromDate']
        toDate=data["toDate"]
        expenseName=data["expenseName"]
        expenseAmount=data["expenseAmount"]        
        saleData=Sale.objects.filter(Q(created__range=[fromDate , toDate])&Q(store=data["store"])&Q(saleType=data["saleType"]) )
        # If sale exist
        if saleData.exists():
            expensePerSale=decimal.Decimal(expenseAmount)/len(saleData)
            saleExpense=SaleExpense.objects.create(expenseName=expenseName , expenseAmount=expensePerSale)

            for sale in saleData:
                sale.extraExpense.add(saleExpense)
                sale.totalExpenseAmount+=expensePerSale
                sale.save()
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)



# Add Single Expense
class addSingleSaleExpenseView(APIView):
    authentication_classes=[JWTAuthentication]
    permission_classes=[IsAuthenticated]   

    def patch(self , request , format=None , pk=None):
        try:
            data=request.data
            expenseName=data["expenseName"]
            expenseAmount=data["expenseAmount"] 

            expensePerSale=decimal.Decimal(expenseAmount) 
            saleExpense=SaleExpense.objects.create(expenseName=expenseName , expenseAmount=expensePerSale)

            sale=Sale.objects.get(orderId=pk)
            sale.extraExpense.add(saleExpense)
            sale.totalExpenseAmount+=expensePerSale
            sale.save()
            
            return Response(status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)