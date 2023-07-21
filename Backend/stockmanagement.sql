-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 12, 2023 at 09:11 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `stockmanagement`
--

-- --------------------------------------------------------

--
-- Table structure for table `auth_group`
--

CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_group_permissions`
--

CREATE TABLE `auth_group_permissions` (
  `id` bigint(20) NOT NULL,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_permission`
--

CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `auth_permission`
--

INSERT INTO `auth_permission` (`id`, `name`, `content_type_id`, `codename`) VALUES
(1, 'Can add log entry', 1, 'add_logentry'),
(2, 'Can change log entry', 1, 'change_logentry'),
(3, 'Can delete log entry', 1, 'delete_logentry'),
(4, 'Can view log entry', 1, 'view_logentry'),
(5, 'Can add permission', 2, 'add_permission'),
(6, 'Can change permission', 2, 'change_permission'),
(7, 'Can delete permission', 2, 'delete_permission'),
(8, 'Can view permission', 2, 'view_permission'),
(9, 'Can add group', 3, 'add_group'),
(10, 'Can change group', 3, 'change_group'),
(11, 'Can delete group', 3, 'delete_group'),
(12, 'Can view group', 3, 'view_group'),
(13, 'Can add user', 4, 'add_user'),
(14, 'Can change user', 4, 'change_user'),
(15, 'Can delete user', 4, 'delete_user'),
(16, 'Can view user', 4, 'view_user'),
(17, 'Can add content type', 5, 'add_contenttype'),
(18, 'Can change content type', 5, 'change_contenttype'),
(19, 'Can delete content type', 5, 'delete_contenttype'),
(20, 'Can view content type', 5, 'view_contenttype'),
(21, 'Can add session', 6, 'add_session'),
(22, 'Can change session', 6, 'change_session'),
(23, 'Can delete session', 6, 'delete_session'),
(24, 'Can view session', 6, 'view_session'),
(25, 'Can add user permission', 7, 'add_userpermission'),
(26, 'Can change user permission', 7, 'change_userpermission'),
(27, 'Can delete user permission', 7, 'delete_userpermission'),
(28, 'Can view user permission', 7, 'view_userpermission'),
(29, 'Can add store', 8, 'add_store'),
(30, 'Can change store', 8, 'change_store'),
(31, 'Can delete store', 8, 'delete_store'),
(32, 'Can view store', 8, 'view_store'),
(33, 'Can add supplier', 9, 'add_supplier'),
(34, 'Can change supplier', 9, 'change_supplier'),
(35, 'Can delete supplier', 9, 'delete_supplier'),
(36, 'Can view supplier', 9, 'view_supplier'),
(37, 'Can add inventory', 10, 'add_inventory'),
(38, 'Can change inventory', 10, 'change_inventory'),
(39, 'Can delete inventory', 10, 'delete_inventory'),
(40, 'Can view inventory', 10, 'view_inventory'),
(41, 'Can add purchase expense', 11, 'add_purchaseexpense'),
(42, 'Can change purchase expense', 11, 'change_purchaseexpense'),
(43, 'Can delete purchase expense', 11, 'delete_purchaseexpense'),
(44, 'Can view purchase expense', 11, 'view_purchaseexpense'),
(45, 'Can add purchase inventory', 12, 'add_purchaseinventory'),
(46, 'Can change purchase inventory', 12, 'change_purchaseinventory'),
(47, 'Can delete purchase inventory', 12, 'delete_purchaseinventory'),
(48, 'Can view purchase inventory', 12, 'view_purchaseinventory'),
(49, 'Can add sale expense', 13, 'add_saleexpense'),
(50, 'Can change sale expense', 13, 'change_saleexpense'),
(51, 'Can delete sale expense', 13, 'delete_saleexpense'),
(52, 'Can view sale expense', 13, 'view_saleexpense'),
(53, 'Can add sale', 14, 'add_sale'),
(54, 'Can change sale', 14, 'change_sale'),
(55, 'Can delete sale', 14, 'delete_sale'),
(56, 'Can view sale', 14, 'view_sale'),
(57, 'Can add return', 15, 'add_return'),
(58, 'Can change return', 15, 'change_return'),
(59, 'Can delete return', 15, 'delete_return'),
(60, 'Can view return', 15, 'view_return');

-- --------------------------------------------------------

--
-- Table structure for table `auth_user`
--

CREATE TABLE `auth_user` (
  `id` int(11) NOT NULL,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `auth_user`
--

INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `first_name`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`) VALUES
(1, 'pbkdf2_sha256$600000$aRHuZmCODVA0z8XALAmzVT$AtPKFovcEfCjDRe5P0IPGAPKtyA4JME6WpI4gtnax/g=', '2023-07-12 06:59:46.985434', 1, 'admin', '', '', '', 1, 1, '2023-07-12 06:59:40.527774');

-- --------------------------------------------------------

--
-- Table structure for table `auth_user_groups`
--

CREATE TABLE `auth_user_groups` (
  `id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_user_user_permissions`
--

CREATE TABLE `auth_user_user_permissions` (
  `id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `django_admin_log`
--

CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext DEFAULT NULL,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) UNSIGNED NOT NULL CHECK (`action_flag` >= 0),
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `django_content_type`
--

CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `django_content_type`
--

INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES
(1, 'admin', 'logentry'),
(3, 'auth', 'group'),
(2, 'auth', 'permission'),
(4, 'auth', 'user'),
(5, 'contenttypes', 'contenttype'),
(10, 'inventory', 'inventory'),
(8, 'inventory', 'store'),
(9, 'inventory', 'supplier'),
(15, 'orderReturn', 'return'),
(11, 'purchase', 'purchaseexpense'),
(12, 'purchase', 'purchaseinventory'),
(14, 'sale', 'sale'),
(13, 'sale', 'saleexpense'),
(6, 'sessions', 'session'),
(7, 'user', 'userpermission');

-- --------------------------------------------------------

--
-- Table structure for table `django_migrations`
--

CREATE TABLE `django_migrations` (
  `id` bigint(20) NOT NULL,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `django_migrations`
--

INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES
(1, 'contenttypes', '0001_initial', '2023-07-12 06:59:03.845906'),
(2, 'auth', '0001_initial', '2023-07-12 06:59:04.473001'),
(3, 'admin', '0001_initial', '2023-07-12 06:59:04.630993'),
(4, 'admin', '0002_logentry_remove_auto_add', '2023-07-12 06:59:04.646990'),
(5, 'admin', '0003_logentry_add_action_flag_choices', '2023-07-12 06:59:04.664991'),
(6, 'contenttypes', '0002_remove_content_type_name', '2023-07-12 06:59:04.808995'),
(7, 'auth', '0002_alter_permission_name_max_length', '2023-07-12 06:59:04.891990'),
(8, 'auth', '0003_alter_user_email_max_length', '2023-07-12 06:59:04.938990'),
(9, 'auth', '0004_alter_user_username_opts', '2023-07-12 06:59:04.954991'),
(10, 'auth', '0005_alter_user_last_login_null', '2023-07-12 06:59:05.025005'),
(11, 'auth', '0006_require_contenttypes_0002', '2023-07-12 06:59:05.035991'),
(12, 'auth', '0007_alter_validators_add_error_messages', '2023-07-12 06:59:05.051994'),
(13, 'auth', '0008_alter_user_username_max_length', '2023-07-12 06:59:05.085991'),
(14, 'auth', '0009_alter_user_last_name_max_length', '2023-07-12 06:59:05.118988'),
(15, 'auth', '0010_alter_group_name_max_length', '2023-07-12 06:59:05.150992'),
(16, 'auth', '0011_update_proxy_permissions', '2023-07-12 06:59:05.164992'),
(17, 'auth', '0012_alter_user_first_name_max_length', '2023-07-12 06:59:05.198998'),
(18, 'inventory', '0001_initial', '2023-07-12 06:59:05.377015'),
(19, 'sale', '0001_initial', '2023-07-12 06:59:05.709991'),
(20, 'orderReturn', '0001_initial', '2023-07-12 06:59:05.958992'),
(21, 'purchase', '0001_initial', '2023-07-12 06:59:06.358991'),
(22, 'sessions', '0001_initial', '2023-07-12 06:59:06.457989'),
(23, 'user', '0001_initial', '2023-07-12 06:59:06.711005');

-- --------------------------------------------------------

--
-- Table structure for table `django_session`
--

CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `django_session`
--

INSERT INTO `django_session` (`session_key`, `session_data`, `expire_date`) VALUES
('i0g7ivkwa7m7b38vnqbcr9b7twix36d5', '.eJxVjEEOwiAQRe_C2hCm7UBx6d4zNAMzSNVAUtqV8e7apAvd_vfef6mJtjVPW5NlmlmdFajT7xYoPqTsgO9UblXHWtZlDnpX9EGbvlaW5-Vw_w4ytfytu2DFJCT23eBHHKVLxqLrIwcyFnoejCMxAMmlEDxgQmvB9R7IM6Ko9wfZATd1:1qJTpC:CWTSz0RE3jysRUBoQIoKVn9j3mCvlNLjzNo_ORTAW3w', '2023-07-26 06:59:46.990433');

-- --------------------------------------------------------

--
-- Table structure for table `inventory_inventory`
--

CREATE TABLE `inventory_inventory` (
  `id` bigint(20) NOT NULL,
  `itemName` varchar(100) NOT NULL,
  `quantity` int(11) NOT NULL,
  `store_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `inventory_store`
--

CREATE TABLE `inventory_store` (
  `id` bigint(20) NOT NULL,
  `storeName` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `inventory_supplier`
--

CREATE TABLE `inventory_supplier` (
  `id` bigint(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `created` date NOT NULL,
  `store_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orderreturn_return`
--

CREATE TABLE `orderreturn_return` (
  `id` bigint(20) NOT NULL,
  `returnType` varchar(10) NOT NULL,
  `quantity` int(11) NOT NULL,
  `created` date NOT NULL,
  `order_id` varchar(50) DEFAULT NULL,
  `store_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `purchase_purchaseexpense`
--

CREATE TABLE `purchase_purchaseexpense` (
  `id` bigint(20) NOT NULL,
  `expenseName` varchar(100) NOT NULL,
  `expenseAmount` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `purchase_purchaseinventory`
--

CREATE TABLE `purchase_purchaseinventory` (
  `id` bigint(20) NOT NULL,
  `quantity` int(11) NOT NULL,
  `grossPricePerItem` decimal(10,2) NOT NULL,
  `totalExpenseAmount` decimal(10,2) DEFAULT NULL,
  `netPricePerItem` decimal(10,2) NOT NULL,
  `totalPurchaseAmount` decimal(10,2) NOT NULL,
  `created` date NOT NULL,
  `inventory_id` bigint(20) DEFAULT NULL,
  `store_id` bigint(20) DEFAULT NULL,
  `supplier_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `purchase_purchaseinventory_extraexpense`
--

CREATE TABLE `purchase_purchaseinventory_extraexpense` (
  `id` bigint(20) NOT NULL,
  `purchaseinventory_id` bigint(20) NOT NULL,
  `purchaseexpense_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sale_sale`
--

CREATE TABLE `sale_sale` (
  `orderId` varchar(50) NOT NULL,
  `saleType` varchar(10) NOT NULL,
  `quantity` int(11) NOT NULL,
  `pricePerItem` decimal(10,2) NOT NULL,
  `totalExpenseAmount` decimal(10,2) NOT NULL,
  `totalOrderAmount` decimal(10,2) NOT NULL,
  `created` date NOT NULL,
  `inventory_id` bigint(20) DEFAULT NULL,
  `store_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sale_saleexpense`
--

CREATE TABLE `sale_saleexpense` (
  `id` bigint(20) NOT NULL,
  `expenseName` varchar(100) NOT NULL,
  `expenseAmount` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sale_sale_extraexpense`
--

CREATE TABLE `sale_sale_extraexpense` (
  `id` bigint(20) NOT NULL,
  `sale_id` varchar(50) NOT NULL,
  `saleexpense_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_userpermission`
--

CREATE TABLE `user_userpermission` (
  `id` bigint(20) NOT NULL,
  `userRole` varchar(20) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_userpermission_assignedstore`
--

CREATE TABLE `user_userpermission_assignedstore` (
  `id` bigint(20) NOT NULL,
  `userpermission_id` bigint(20) NOT NULL,
  `store_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `auth_group`
--
ALTER TABLE `auth_group`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  ADD KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`);

--
-- Indexes for table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`);

--
-- Indexes for table `auth_user`
--
ALTER TABLE `auth_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  ADD KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`);

--
-- Indexes for table `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  ADD KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`);

--
-- Indexes for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  ADD KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`);

--
-- Indexes for table `django_content_type`
--
ALTER TABLE `django_content_type`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`);

--
-- Indexes for table `django_migrations`
--
ALTER TABLE `django_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `django_session`
--
ALTER TABLE `django_session`
  ADD PRIMARY KEY (`session_key`),
  ADD KEY `django_session_expire_date_a5c62663` (`expire_date`);

--
-- Indexes for table `inventory_inventory`
--
ALTER TABLE `inventory_inventory`
  ADD PRIMARY KEY (`id`),
  ADD KEY `inventory_inventory_store_id_9f29bc82_fk_inventory_store_id` (`store_id`);

--
-- Indexes for table `inventory_store`
--
ALTER TABLE `inventory_store`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `inventory_supplier`
--
ALTER TABLE `inventory_supplier`
  ADD PRIMARY KEY (`id`),
  ADD KEY `inventory_supplier_store_id_1b30c300_fk_inventory_store_id` (`store_id`);

--
-- Indexes for table `orderreturn_return`
--
ALTER TABLE `orderreturn_return`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orderReturn_return_order_id_db19b8c6_fk_sale_sale_orderId` (`order_id`),
  ADD KEY `orderReturn_return_store_id_36983107_fk_inventory_store_id` (`store_id`);

--
-- Indexes for table `purchase_purchaseexpense`
--
ALTER TABLE `purchase_purchaseexpense`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `purchase_purchaseinventory`
--
ALTER TABLE `purchase_purchaseinventory`
  ADD PRIMARY KEY (`id`),
  ADD KEY `purchase_purchaseinv_inventory_id_51352a6b_fk_inventory` (`inventory_id`),
  ADD KEY `purchase_purchaseinv_store_id_db367cd8_fk_inventory` (`store_id`),
  ADD KEY `purchase_purchaseinv_supplier_id_663a47e0_fk_inventory` (`supplier_id`);

--
-- Indexes for table `purchase_purchaseinventory_extraexpense`
--
ALTER TABLE `purchase_purchaseinventory_extraexpense`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `purchase_purchaseinvento_purchaseinventory_id_pur_407e87bc_uniq` (`purchaseinventory_id`,`purchaseexpense_id`),
  ADD KEY `purchase_purchaseinv_purchaseexpense_id_0101527a_fk_purchase_` (`purchaseexpense_id`);

--
-- Indexes for table `sale_sale`
--
ALTER TABLE `sale_sale`
  ADD PRIMARY KEY (`orderId`),
  ADD KEY `sale_sale_inventory_id_daa01765_fk_inventory_inventory_id` (`inventory_id`),
  ADD KEY `sale_sale_store_id_348fc16e_fk_inventory_store_id` (`store_id`);

--
-- Indexes for table `sale_saleexpense`
--
ALTER TABLE `sale_saleexpense`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sale_sale_extraexpense`
--
ALTER TABLE `sale_sale_extraexpense`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `sale_sale_extraExpense_sale_id_saleexpense_id_dffc7dca_uniq` (`sale_id`,`saleexpense_id`),
  ADD KEY `sale_sale_extraExpen_saleexpense_id_be7d72de_fk_sale_sale` (`saleexpense_id`);

--
-- Indexes for table `user_userpermission`
--
ALTER TABLE `user_userpermission`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexes for table `user_userpermission_assignedstore`
--
ALTER TABLE `user_userpermission_assignedstore`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_userpermission_assi_userpermission_id_store__38d05a72_uniq` (`userpermission_id`,`store_id`),
  ADD KEY `user_userpermission__store_id_bb8e102a_fk_inventory` (`store_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `auth_group`
--
ALTER TABLE `auth_group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_permission`
--
ALTER TABLE `auth_permission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `auth_user`
--
ALTER TABLE `auth_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `django_content_type`
--
ALTER TABLE `django_content_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `django_migrations`
--
ALTER TABLE `django_migrations`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `inventory_inventory`
--
ALTER TABLE `inventory_inventory`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `inventory_store`
--
ALTER TABLE `inventory_store`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `inventory_supplier`
--
ALTER TABLE `inventory_supplier`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orderreturn_return`
--
ALTER TABLE `orderreturn_return`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `purchase_purchaseexpense`
--
ALTER TABLE `purchase_purchaseexpense`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `purchase_purchaseinventory`
--
ALTER TABLE `purchase_purchaseinventory`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `purchase_purchaseinventory_extraexpense`
--
ALTER TABLE `purchase_purchaseinventory_extraexpense`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sale_saleexpense`
--
ALTER TABLE `sale_saleexpense`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sale_sale_extraexpense`
--
ALTER TABLE `sale_sale_extraexpense`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_userpermission`
--
ALTER TABLE `user_userpermission`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_userpermission_assignedstore`
--
ALTER TABLE `user_userpermission_assignedstore`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`);

--
-- Constraints for table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`);

--
-- Constraints for table `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  ADD CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  ADD CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  ADD CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  ADD CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `inventory_inventory`
--
ALTER TABLE `inventory_inventory`
  ADD CONSTRAINT `inventory_inventory_store_id_9f29bc82_fk_inventory_store_id` FOREIGN KEY (`store_id`) REFERENCES `inventory_store` (`id`);

--
-- Constraints for table `inventory_supplier`
--
ALTER TABLE `inventory_supplier`
  ADD CONSTRAINT `inventory_supplier_store_id_1b30c300_fk_inventory_store_id` FOREIGN KEY (`store_id`) REFERENCES `inventory_store` (`id`);

--
-- Constraints for table `orderreturn_return`
--
ALTER TABLE `orderreturn_return`
  ADD CONSTRAINT `orderReturn_return_order_id_db19b8c6_fk_sale_sale_orderId` FOREIGN KEY (`order_id`) REFERENCES `sale_sale` (`orderId`),
  ADD CONSTRAINT `orderReturn_return_store_id_36983107_fk_inventory_store_id` FOREIGN KEY (`store_id`) REFERENCES `inventory_store` (`id`);

--
-- Constraints for table `purchase_purchaseinventory`
--
ALTER TABLE `purchase_purchaseinventory`
  ADD CONSTRAINT `purchase_purchaseinv_inventory_id_51352a6b_fk_inventory` FOREIGN KEY (`inventory_id`) REFERENCES `inventory_inventory` (`id`),
  ADD CONSTRAINT `purchase_purchaseinv_store_id_db367cd8_fk_inventory` FOREIGN KEY (`store_id`) REFERENCES `inventory_store` (`id`),
  ADD CONSTRAINT `purchase_purchaseinv_supplier_id_663a47e0_fk_inventory` FOREIGN KEY (`supplier_id`) REFERENCES `inventory_supplier` (`id`);

--
-- Constraints for table `purchase_purchaseinventory_extraexpense`
--
ALTER TABLE `purchase_purchaseinventory_extraexpense`
  ADD CONSTRAINT `purchase_purchaseinv_purchaseexpense_id_0101527a_fk_purchase_` FOREIGN KEY (`purchaseexpense_id`) REFERENCES `purchase_purchaseexpense` (`id`),
  ADD CONSTRAINT `purchase_purchaseinv_purchaseinventory_id_a1bb12b4_fk_purchase_` FOREIGN KEY (`purchaseinventory_id`) REFERENCES `purchase_purchaseinventory` (`id`);

--
-- Constraints for table `sale_sale`
--
ALTER TABLE `sale_sale`
  ADD CONSTRAINT `sale_sale_inventory_id_daa01765_fk_inventory_inventory_id` FOREIGN KEY (`inventory_id`) REFERENCES `inventory_inventory` (`id`),
  ADD CONSTRAINT `sale_sale_store_id_348fc16e_fk_inventory_store_id` FOREIGN KEY (`store_id`) REFERENCES `inventory_store` (`id`);

--
-- Constraints for table `sale_sale_extraexpense`
--
ALTER TABLE `sale_sale_extraexpense`
  ADD CONSTRAINT `sale_sale_extraExpen_saleexpense_id_be7d72de_fk_sale_sale` FOREIGN KEY (`saleexpense_id`) REFERENCES `sale_saleexpense` (`id`),
  ADD CONSTRAINT `sale_sale_extraExpense_sale_id_9d84f23d_fk_sale_sale_orderId` FOREIGN KEY (`sale_id`) REFERENCES `sale_sale` (`orderId`);

--
-- Constraints for table `user_userpermission`
--
ALTER TABLE `user_userpermission`
  ADD CONSTRAINT `user_userpermission_user_id_fe19376c_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `user_userpermission_assignedstore`
--
ALTER TABLE `user_userpermission_assignedstore`
  ADD CONSTRAINT `user_userpermission__store_id_bb8e102a_fk_inventory` FOREIGN KEY (`store_id`) REFERENCES `inventory_store` (`id`),
  ADD CONSTRAINT `user_userpermission__userpermission_id_d8d446a9_fk_user_user` FOREIGN KEY (`userpermission_id`) REFERENCES `user_userpermission` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
