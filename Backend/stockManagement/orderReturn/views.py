from django.shortcuts import render
from.serializers import *
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.views import APIView 
from rest_framework.generics import CreateAPIView , ListAPIView , RetrieveAPIView , ListCreateAPIView , RetrieveUpdateDestroyAPIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated , IsAdminUser
import decimal
from django.db.models import Q
from rest_framework import filters


# Return List
class ReturnListView(ListAPIView):
    authentication_classes=[JWTAuthentication]
    permission_classes=[IsAuthenticated]
    queryset=Return.objects.all()
    serializer_class=ReturnListSerializer
    filter_backends=[filters.SearchFilter]
    search_fields=["order__inventory__itemName" , "order__orderId"]

    def get_queryset(self):
        user=self.request.user
        store=self.request.GET.get("store")
        returnType=self.request.GET.get("returnType")
        fromDateFilter=self.request.GET.get("fromDateFilter")
        toDateFilter=self.request.GET.get("toDateFilter")
        # Checking if someone has changed the local storage
        if user.is_superuser or (user.userPermissions.userRole=="Online seller" and returnType=="Online") or (user.userPermissions.userRole=="POS seller" and returnType=="POS"):
            if fromDateFilter:
                return Return.objects.filter(Q(store=store)&Q(returnType=returnType)&Q(created__range=[fromDateFilter , toDateFilter])).order_by("-created")
            else:
                return Return.objects.filter(Q(store=store)&Q(returnType=returnType)).order_by("-created")
        else:
            return []



# Create Inventory
class CreateReturnView(APIView):
    authentication_classes=[JWTAuthentication]
    permission_classes=[IsAuthenticated]

    def post(self , request , format=None):
        user=request.user
        data=request.data
        order=data["order"]
        quantity=data["quantity"]
        returnType=data['returnType']
        # Checking if someone has changed the local storage
        if user.is_superuser or (user.userPermissions.userRole=="Online seller" and returnType=="Online") or (user.userPermissions.userRole=="POS seller" and returnType=="POS"):

            order=Sale.objects.filter(Q(orderId=order)&Q(saleType=data["returnType"]))
            # Checking if order exists
            if not order.exists():
                return Response(status=status.HTTP_404_NOT_FOUND)
            # Checking if order quantity is less then return        
            prevReturns=order.first().saleReturn.all()
            totalReturnQuantiy=0
            for orderReturn in  prevReturns:
                totalReturnQuantiy+=orderReturn.quantity
            if totalReturnQuantiy+int(quantity) > order.first().quantity:
                return Response(status=status.HTTP_406_NOT_ACCEPTABLE)

            serializer=CreateReturnSerializer(data=data)
            serializer.is_valid(raise_exception=True)
            serializer.save()

            inventory=order.first().inventory
            inventory.quantity+=int(quantity)
            inventory.save()

            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


