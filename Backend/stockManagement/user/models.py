from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class UserPermission(models.Model):
    userRoleChoices=(
        ("POS seller" , "POS seller") , 
        ("Online seller" , "Online seller")
    )

    user=models.OneToOneField(User , on_delete=models.CASCADE , related_name="userPermissions")
    userRole=models.CharField(choices=userRoleChoices , default="Online seller" , max_length=20)
    assignedStore=models.ManyToManyField(to="inventory.Store" , blank=True , related_name="assignedUsers")

    def __str__(self):
        return self.user.username