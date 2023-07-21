from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User
from inventory.models import *


class PurchaseListSerializer(serializers.ModelSerializer):
    created=serializers.DateField()
    supplier=serializers.PrimaryKeyRelatedField(queryset=Supplier.objects.all())
    supplierData=serializers.SerializerMethodField()
    inventory=serializers.PrimaryKeyRelatedField(queryset=Inventory.objects.all())
    inventoryData=serializers.SerializerMethodField()
    extraExpense=serializers.PrimaryKeyRelatedField(queryset=PurchaseExpense.objects.all() , many=True)
    extraExpenseData=serializers.SerializerMethodField()

    class Meta:
        model=PurchaseInventory
        fields="__all__"

    
    def get_supplierData(self , obj):
        if obj.supplier:
            return obj.supplier.name
        else:
            return None  


    def get_inventoryData(self , obj):
        if obj.inventory:
            return obj.inventory.itemName
        else:
            return None

    def get_extraExpenseData(self , obj):
        extraExpenseList=[]
        if obj.extraExpense.all():
            for expense in obj.extraExpense.all():
                extraExpenseList.append({"expenseName":expense.expenseName ,"expenseAmount":expense.expenseAmount })
            return extraExpenseList
        else:
            return []


# Create Purchase
class CreatePurchaseSerializer(serializers.ModelSerializer):
    class Meta:
        model=PurchaseInventory
        fields="__all__"



