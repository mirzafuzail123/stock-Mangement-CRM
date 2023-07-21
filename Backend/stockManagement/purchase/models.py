from django.db import models

# Create your models here.


# Purchase Exoense
class PurchaseExpense(models.Model):
    expenseName=models.CharField(max_length=100)
    expenseAmount=models.DecimalField(max_digits=10 , decimal_places=2 , default=0.0)

    def __str__(self) -> str:
        return self.expenseName

# Purchase
class PurchaseInventory(models.Model):
    store=models.ForeignKey(to="inventory.Store"  , on_delete=models.CASCADE , null=True , related_name="storePurchases")
    supplier=models.ForeignKey(to="inventory.Supplier"  , on_delete=models.SET_NULL , null=True , related_name="supplierInventory")
    inventory=models.ForeignKey(to="inventory.Inventory" , on_delete=models.SET_NULL , null=True , related_name="inventoryPurchases")
    quantity=models.IntegerField()
    grossPricePerItem=models.DecimalField(max_digits=10 , decimal_places=2 , default=0.0)
    extraExpense=models.ManyToManyField(PurchaseExpense , null=True)
    totalExpenseAmount=models.DecimalField(max_digits=10 , decimal_places=2 , default=0.0 , null=True )
    netPricePerItem=models.DecimalField(max_digits=10 , decimal_places=2 , default=0.0)
    totalPurchaseAmount=models.DecimalField(max_digits=10 , decimal_places=2 , default=0.0)
    created=models.DateField(auto_now_add=True)
    

    def __str__(self) -> str:
        return f"{self.created}"