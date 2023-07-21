from rest_framework import serializers
from .models import *
from django.contrib.auth.hashers import make_password



class LoginSerializer(serializers.ModelSerializer):
    username=serializers.CharField()
    class Meta:
        model=User
        fields=['username' , 'password']


# User List
class UserListSerializer(serializers.Serializer):
    id=serializers.SerializerMethodField()
    userRole=serializers.SerializerMethodField()
    user=serializers.SerializerMethodField()



    def get_id(self , obj):
        user=User.objects.filter(id=obj['user']).first()
        return user.id


    def get_userRole(self , obj):
        user=User.objects.filter(id=obj['user']).first()
        return user.userPermissions.userRole


    def get_user(self , obj):
        user=User.objects.filter(id=obj['user']).first()
        return user.username




# Create User
class PasswordField(serializers.CharField):
    def to_internal_value(self, data):
        return make_password(data)

class CreateUserSerializer(serializers.ModelSerializer):
    email=serializers.EmailField()
    password=PasswordField()
    class Meta:
        model=User
        fields='__all__'
        extra_kwargs={
            'password':{'write_only':True}
        }





    