from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User
from inventory.models import Inventory


# Sale List
class SaleListSerializer(serializers.ModelSerializer):
    created=serializers.DateField()
    inventory=serializers.PrimaryKeyRelatedField(queryset=Inventory.objects.all())
    inventoryData=serializers.SerializerMethodField()
    extraExpense=serializers.PrimaryKeyRelatedField(queryset=SaleExpense.objects.all() , many=True)
    extraExpenseData=serializers.SerializerMethodField()

    class Meta:
        model=Sale
        fields="__all__"


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


# Create Sale
class CreateSaleSerializer(serializers.ModelSerializer):
    class Meta:
        model=Sale
        fields="__all__"
