from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User





# Store
class StoreSerializer(serializers.ModelSerializer):
    class Meta:
        model=Store
        fields="__all__"


# Inverntory
class InventorySerializer(serializers.ModelSerializer):
    class Meta:
        model=Inventory
        fields="__all__"




# Module Supplier
class SupplierListSerializer(serializers.ModelSerializer):
    class Meta:
        model=Supplier
        fields="__all__"
