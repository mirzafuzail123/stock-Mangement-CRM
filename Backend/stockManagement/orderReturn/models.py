from django.db import models

# Return
class Return(models.Model):

    returnTypeChoices=(
        ("POS" , "POS") , 
        ("Online" , "Online")
    )
    store=models.ForeignKey(to="inventory.Store"   , on_delete=models.CASCADE , null=True , related_name="storeReturns")
    order=models.ForeignKey(to="sale.Sale" , on_delete=models.SET_NULL , related_name="saleReturn" , null=True)
    returnType=models.CharField(choices=returnTypeChoices , max_length=10 , default="Online")
    quantity=models.IntegerField()
    created=models.DateField(auto_now_add=True )

    # def __str__(self):
    #     return self.order.orderId