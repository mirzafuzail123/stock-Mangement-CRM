from django.shortcuts import render
from.serializers import *
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.views import APIView 
from rest_framework.generics import CreateAPIView , ListAPIView , RetrieveUpdateAPIView , ListCreateAPIView , RetrieveUpdateDestroyAPIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated , IsAdminUser
from django.db.models import Q
from rest_framework import filters




# Store list
class StoreView(ListAPIView):
    authentication_classes=[JWTAuthentication]
    permission_classes=[IsAuthenticated]
    queryset=Store.objects.all()
    serializer_class=StoreSerializer
    pagination_class=None 

    def get_queryset(self):
        user=self.request.user
        if user.is_superuser:
            return super().get_queryset()
        else:
            return user.userPermissions.assignedStore.all()
    
class CreateStoreView(CreateAPIView):
    authentication_classes=[JWTAuthentication]
    permission_classes=[IsAdminUser  ,IsAuthenticated]
    queryset=Store.objects.all()
    serializer_class=StoreSerializer


# Module : Inventory

# Inventory List
class InventoryListView(ListAPIView):
    authentication_classes=[JWTAuthentication]
    permission_classes=[IsAuthenticated]
    filter_backends=[filters.SearchFilter]
    search_fields=["itemName"]
    queryset=Inventory.objects.all()
    serializer_class=InventorySerializer



    def get_queryset(self):
        store=self.request.GET.get("store")
        return Inventory.objects.filter(store=store)

# lIST WITHOUT pagination
class AllInventoryListView(ListAPIView):
    authentication_classes=[JWTAuthentication]
    permission_classes=[IsAuthenticated]
    queryset=Inventory.objects.all()
    serializer_class=InventorySerializer
    pagination_class=None

    def get_queryset(self):
        store=self.request.GET.get("store")
        return Inventory.objects.filter(store=store)


# Create Inventory
class CreateInventoryView(CreateAPIView):
    authentication_classes=[JWTAuthentication]
    permission_classes=[IsAuthenticated]
    queryset=Inventory.objects.all()
    serializer_class=InventorySerializer


class SingleInventoryView(RetrieveUpdateDestroyAPIView):
    authentication_classes=[JWTAuthentication]
    permission_classes=[IsAuthenticated]
    queryset=Inventory.objects.all()
    serializer_class=InventorySerializer




# Module Supplier

# Without Pagination (Only for options)
class SupplierListView(ListAPIView):
    authentication_classes=[JWTAuthentication]
    permission_classes=[IsAuthenticated]
    queryset=Supplier.objects.all()
    serializer_class=SupplierListSerializer
    pagination_class=None

    def get_queryset(self):
        store=self.request.GET.get("store")
        return Supplier.objects.filter(store=store).order_by("-created")

# Supplier List
class SupplierView(ListCreateAPIView):
    authentication_classes=[JWTAuthentication]
    permission_classes=[IsAuthenticated]
    queryset=Supplier.objects.all()
    serializer_class=SupplierListSerializer
    filter_backends=[filters.SearchFilter]
    search_fields=["name"]

    def get_queryset(self):
        store=self.request.GET.get("store")
        return Supplier.objects.filter(store=store).order_by("-created")


class SingleSupplierView(RetrieveUpdateAPIView):
    authentication_classes=[JWTAuthentication]
    permission_classes=[IsAuthenticated]
    queryset=Supplier.objects.all()
    serializer_class=SupplierListSerializer
