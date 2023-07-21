from django.urls import path
from .views import *



urlpatterns = [
    # Store
    path("store/" , StoreView.as_view() , name="store"),
    path("createstore/" , CreateStoreView.as_view() , name="createstore"),
    # inventory
    path("inventoryList/" , InventoryListView.as_view() , name="InventoryList"),
    path("allInventoryList/" , AllInventoryListView.as_view() , name="allInventoryList"),
    path("createInventory/" , CreateInventoryView.as_view() , name="createInventory"),
    path("singleInventory/<int:pk>/" , SingleInventoryView.as_view() , name="singleInventory"),
    # Supplier
    path("supplierList/" , SupplierListView.as_view() , name="supplierList"),
    path("suppliers/" , SupplierView.as_view() , name="suppliers"),
    path("singleSupplier/<int:pk>/" , SingleSupplierView.as_view() , name="updateSupplier"),


]
