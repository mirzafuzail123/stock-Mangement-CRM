from rest_framework import serializers
from .models import *
from sale.models import Sale


class ReturnListSerializer(serializers.ModelSerializer):
    order=serializers.PrimaryKeyRelatedField(queryset=Sale.objects.all() )
    orderData=serializers.SerializerMethodField()
    created=serializers.DateField()
    class Meta:
        model=Return
        fields="__all__"

    
    def get_orderData(self , obj):
        if obj.order:
            order=obj.order
            return {'orderId':order.orderId , 'inventory':order.inventory.itemName}
        else:
            return None


class CreateReturnSerializer(serializers.ModelSerializer):
    class Meta:
        model=Return
        fields="__all__"