from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.views import APIView 
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated , IsAdminUser
import uuid
from django.db.models import Q
from inventory.models import Inventory
from purchase.models import PurchaseInventory
from sale.models import Sale
from user.models import UserPermission
from orderReturn.models import Return
from django.db.models import Sum
import decimal


# Dashboard Data
class DashboardDataView(APIView):
    authentication_classes=[JWTAuthentication]
    permission_classes=[IsAuthenticated]

    def get(self , request , format=None):
        user=request.user
        store=self.request.GET.get("store")
        fromFilterDate=self.request.GET.get("fromFilterDate")
        toFilterDate=self.request.GET.get("toFilterDate")
        # Checking Permission
        if UserPermission.objects.filter(user=user).exists() and user.userPermissions.userRole=="POS seller":
            dataType="POS"
        elif UserPermission.objects.filter(user=user).exists() and user.userPermissions.userRole=="Online seller":
            dataType="Online"
        else:
            dataType=self.request.GET.get("dataType")

        # Inventory
        inventoryData=Inventory.objects.filter(store=store)
        inventoryList=[]

        for inventory in inventoryData:
            totalInventoryPurchase=decimal.Decimal(0)
            totalInventorySale=decimal.Decimal(0)

            # Calculating purchase Data
            if fromFilterDate and toFilterDate:
                inventoryPurchases= inventory.inventoryPurchases.filter(created__range=[fromFilterDate , toFilterDate]).values("totalPurchaseAmount")
            else:
                inventoryPurchases= inventory.inventoryPurchases.all().values("totalPurchaseAmount")
            totalInventoryPurchase+=inventoryPurchases.aggregate(total=Sum("totalPurchaseAmount"))['total'] or 0  

            # Calculating inventory sale Data
            if fromFilterDate and toFilterDate:
                inventorySales= inventory.inventorySales.filter(created__range=[fromFilterDate , toFilterDate]).values("totalOrderAmount")
            elif dataType:
                inventorySales= inventory.inventorySales.filter(saleType=dataType).values("totalOrderAmount")
            elif  fromFilterDate and toFilterDate and dataType :
                inventorySales= inventory.inventorySales.filter(Q(created__range=[fromFilterDate , toFilterDate])&Q(saleType=dataType)).values("totalOrderAmount")
            else:
                inventorySales=inventory.inventorySales.all().values("totalOrderAmount")
            totalInventorySale+=inventorySales.aggregate(total=Sum("totalOrderAmount"))['total'] or 0            

            inventoryList.append({"itemName":inventory.itemName , "quantity":inventory.quantity ,"purchase":totalInventoryPurchase ,  'sales':totalInventorySale })
        
        # Purchase
        if fromFilterDate and toFilterDate:
            purchaseData=PurchaseInventory.objects.filter(Q(store=store)&Q(created__range=[fromFilterDate , toFilterDate]))
        else:
            purchaseData=PurchaseInventory.objects.filter(Q(store=store))
        # Calculating Purchase Amount
        totalPurchaseAmount=decimal.Decimal(0)
        for purchase in purchaseData:
            totalPurchaseAmount+=purchase.totalPurchaseAmount
        
        # Sale
        if fromFilterDate and toFilterDate and not dataType :
            saleData=Sale.objects.filter(Q(store=store)&Q(created__range=[fromFilterDate , toFilterDate]))
        elif dataType and not fromFilterDate and not toFilterDate:
            saleData=Sale.objects.filter(Q(store=store)&Q(saleType=dataType))
        elif fromFilterDate and toFilterDate and dataType:
            saleData=Sale.objects.filter(Q(store=store)&Q(created__range=[fromFilterDate , toFilterDate])&Q(saleType=dataType))
        else:
            saleData=Sale.objects.filter(Q(store=store))
        # Calculating Sale Amount
        totalSales=len(saleData)
        totalSaleAmount=decimal.Decimal(0)
        for sale in saleData:
            totalSaleAmount+=sale.totalOrderAmount
        

        # Return
        if fromFilterDate and toFilterDate and not dataType :
            returnData=Return.objects.filter(Q(store=store)&Q(created__range=[fromFilterDate , toFilterDate]))
        elif dataType and not fromFilterDate and not toFilterDate:
            returnData=Return.objects.filter(Q(store=store)&Q(returnType=dataType))
        elif fromFilterDate and toFilterDate and dataType:
            returnData=Return.objects.filter(Q(store=store)&Q(created__range=[fromFilterDate , toFilterDate])&Q(returnType=dataType))
        else:
            returnData=Return.objects.filter(Q(store=store))    
        # Calculating Return
        totalReturns=len(returnData)
       
       
        data={
            "inventoryData":inventoryList , 
            "totalPurchaseAmount":totalPurchaseAmount , 
            "totalOrders":totalSales , 
            "totalSaleAmount":totalSaleAmount , 
            "totalReturns":totalReturns , 
        }
        return Response(data , status=status.HTTP_200_OK)
