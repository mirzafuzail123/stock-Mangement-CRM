from django.urls import path
from .views import *


urlpatterns = [
    path("login/" , LoginView.as_view() , name="login"),
    path("changePassword/" , ChangePasswordView.as_view() , name="ChangePassword"),
    path("userList/" , UserListView.as_view() , name="login"),
    path("allUsers/" , AllUsersView.as_view() , name="allUsers"),
    path("createUser/" , CreateUserView.as_view() , name="login"),
    path("updateUserPermission/<int:pk>/" , UpdateUserPermissionView.as_view() , name="updateUserPermission"),
    path("removeFromStore/<int:pk>/" , RemoveFromStoreView.as_view() , name="removeFromStore"),

]
