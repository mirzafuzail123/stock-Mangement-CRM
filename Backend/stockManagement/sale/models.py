from django.db import models



# Sale Exoense
class SaleExpense(models.Model):
    expenseName=models.CharField(max_length=100)
    expenseAmount=models.DecimalField(max_digits=10 , decimal_places=2 , default=0.0)

    def __str__(self) -> str:
        return self.expenseName

# Sales
class Sale(models.Model):

    saleTypeChoices=(
        ("POS" , "POS") , 
        ("Online" , "Online")
    )

    store=models.ForeignKey(to="inventory.Store"  , on_delete=models.CASCADE , null=True , related_name="storeSales")
    orderId=models.CharField(max_length=50 , unique=True , primary_key=True)
    saleType=models.CharField(choices=saleTypeChoices , max_length=10 , default="Online")
    inventory=models.ForeignKey(to="inventory.Inventory" , on_delete=models.SET_NULL , null=True , related_name="inventorySales")
    quantity=models.IntegerField()
    notes=models.TextField(null=True , blank=True)
    pricePerItem=models.DecimalField(max_digits=10 , decimal_places=2 , default=0.0)
    extraExpense=models.ManyToManyField(SaleExpense , null=True)
    totalExpenseAmount=models.DecimalField(max_digits=10 , decimal_places=2 , default=0.0)
    totalOrderAmount=models.DecimalField(max_digits=10 , decimal_places=2 , default=0.0)
    created=models.DateField(auto_now_add=True)

    def __str__(self) -> str:
        return self.orderId