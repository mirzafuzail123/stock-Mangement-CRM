
from .token import get_tokens_for_user
from.serializers import *
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.views import APIView 
from rest_framework.generics import CreateAPIView , ListAPIView , UpdateAPIView , ListCreateAPIView , RetrieveUpdateDestroyAPIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated , IsAdminUser
from django.contrib.auth import authenticate
import uuid
from .sendMail import sendMail
from django.db.models import Q
from rest_framework import filters


# Create your views here.



def AuthResponse(user):
    token=get_tokens_for_user(user=user)
    if UserPermission.objects.filter(user=user).exists():
        userRole=user.userPermissions.userRole
    else:
        userRole="Admin"
    data={
        'access_token':token['access'],
        'refresh_token':token['refresh'],
        "username":user.username ,
        "user_id":user.id,
        "userRole":userRole
    }
    return data


class LoginView(APIView):
    def post(self , request , format=None):
        data=request.data['data']
        serializer=LoginSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        user=authenticate(username=data['username'] , password=data['password'])
        if user is not None:
            data=AuthResponse(user=user)
            return Response(data=data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_401_UNAUTHORIZED)


# ChangePassword
class ChangePasswordView(APIView):
    authentication_classes=[JWTAuthentication]
    permission_classes=[IsAuthenticated]
    def post (self , request , format=None):
        userData=request.user
        data=request.data['data']
        user=authenticate(username=userData.username , password=data['password'])
        # If password is right
        if user is not None:
            user.set_password(data['newPassword'])
            user.save()
            return Response(status=status.HTTP_200_OK)
        # if password is wrong
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)


# User List
class UserListView(ListAPIView):
    authentication_classes=[JWTAuthentication]
    permission_classes=[IsAdminUser , IsAuthenticated]
    queryset=User.objects.all()
    serializer_class=UserListSerializer
    filter_backends=[filters.SearchFilter]
    search_fields=["user__username"]

    def get_queryset(self):
        store=self.request.GET.get("store")
        return UserPermission.objects.filter(assignedStore=store).values("user")


# User List for options
class AllUsersView(ListAPIView):
    authentication_classes=[JWTAuthentication]
    permission_classes=[IsAdminUser , IsAuthenticated]
    queryset=User.objects.all()
    serializer_class=UserListSerializer
    pagination_class=None
    
    def get_queryset(self):
        store=self.request.GET.get("store")
        return UserPermission.objects.filter(~Q(assignedStore=store)).values("user")


# Create User
class CreateUserView(APIView):
    authentication_classes=[JWTAuthentication]
    permission_classes=[IsAdminUser , IsAuthenticated]

    def post(self , request , format=None):
        data=request.data
        store=data["store"]
        # Checking if user exists
        if User.objects.filter(username=data['username']).exists():
            return Response(status=status.HTTP_406_NOT_ACCEPTABLE)
        # If not found
        password=str(uuid.uuid4().hex)[:12]
        data["password"]=password
        # Create User
        serializer=CreateUserSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        # Creating User Permission
        user=User.objects.get(id=serializer.data['id'])
        userPermission=UserPermission.objects.create(user=user , userRole=data["userRole"])
        userPermission.assignedStore.add(store)
        userPermission.save()

        # Sending Mail
        sendMail(
            subject="CRM Password" , 
            message=f'Following is your password Please don not share it with anyone: {password}' , 
            toEmail=serializer.data['email']
        )

        return Response(status=status.HTTP_201_CREATED)



# Update User Permission
class UpdateUserPermissionView(APIView):
    authentication_classes=[JWTAuthentication]
    permission_classes=[IsAdminUser , IsAuthenticated]

    def patch(self , request , format=None , pk=None):
        store=request.data.get("store")
        userRole=request.data['userRole']
        user=User.objects.filter(id=pk)
        # Not Found
        if not user.exists():
            return Response(status=status.HTTP_404_NOT_FOUND)
        # If found
        userPermission=user.first().userPermissions
        userPermission.assignedStore.add(store)
        userPermission.userRole=userRole
        userPermission.save()

        return Response(status=status.HTTP_200_OK)


# Remove From store
class RemoveFromStoreView(APIView):
    authentication_classes=[JWTAuthentication]
    permission_classes=[IsAdminUser , IsAuthenticated]

    def patch(self , request , formta=None , pk=None):
        store=request.data["store"]
        user=User.objects.filter(id=pk)
        # Not Found
        if not user.exists():
            return Response(status=status.HTTP_404_NOT_FOUND)
        # Found
        userPermission=user.first().userPermissions
        userPermission.assignedStore.remove(store)
        userPermission.save()
        
        return Response(status=status.HTTP_200_OK)
    
      