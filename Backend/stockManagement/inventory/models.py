from django.db import models
from datetime import date



# Store
class Store(models.Model):
    storeName=models.CharField(max_length=100)

    def __str__(self) -> str:
        return self.storeName



# Supplier
class Supplier(models.Model):
    store=models.ForeignKey(Store  , on_delete=models.CASCADE , null=True , related_name="storeSuppliers")
    name=models.CharField(max_length=100)
    phone=models.CharField(max_length=15)
    created=models.DateField(auto_now_add=True)

    def __str__(self) -> str:
        return self.name


# Inventory
class Inventory(models.Model):
    store=models.ForeignKey(Store  , on_delete=models.CASCADE , null=True , related_name="storeInventory")
    itemName=models.CharField(max_length=100)
    quantity=models.IntegerField()


    def __str__(self) -> str:
        return self.itemName







    
