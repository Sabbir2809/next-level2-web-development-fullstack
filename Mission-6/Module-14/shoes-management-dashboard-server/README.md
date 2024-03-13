# Shoes Management Dashboard Server

## Overview

This is the backend for the Shoes Management Dashboard, responsible for handling authentication, managing shoe inventory, and providing API endpoints.

#### API Live Link: https://shoes-inventory-eight.vercel.app

#### Postman API Documentation: https://documenter.getpostman.com/view/15226030/2sA2r813mh

## Table of Contents

- [Product Setup](#setup)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [API Endpoints](#api-endpoints)

## Product Setup

#### Backend (Express, Mongoose, TypeScript)

1. Install dependencies and Run the server:

   ```bash
   # 1. Clone the Repository
   git clone
   # 2. Navigate to the project directory
   cd shoes-management-dashboard-server
   # 3. Install Dependencies
   npm install
   # 4. Run the server
   npm run dev
   ```

1. Setup environment variables:

   ```.env
    NODE_DEV=development
    PORT=your_port_number
    DATABASE_URL=your_mongodb_url
    BCRYPT_SALT_ROUNDS=your_bcrypt_salt_rounds
    JWT_ACCESS_SECRET=your_jwt_access_secret
    JWT_ACCESS_EXPIRES_IN=your_jwt_access_expires_in
   ```

## Features

1. **Authentication:** (User Roles)

   - **Buyer:**

     - **Search for Products**: Buyers can search for products available in the inventory.

     - **View Available Inventory**: Buyers can view the current inventory of products.

     - **Make Requests for Polish Service and Customized Design Shoes**: Buyers can request additional services such as polish service or customized design shoes.

   - **Seller:**

     - **Add New Products**: Sellers can add new products to the inventory.

     - **Update Existing Product Details**: Sellers can update the details of existing products.

     - **View the Complete List of Shoes**: Sellers have access to the complete list of available shoes in the inventory.

     - **Manage Sales**: Sellers can manage sales transactions and order processing.

     - **Access Features Specific to Sellers**: Sellers have access to features and tools tailored for managing inventory and sales.

     - **Accept Polish Requests and Customize Shoe Requests from Buyers**: Sellers can accept requests for polish service and customized shoe designs from buyers.

1. **Shoes Management:**

   - CRUD operations for managing shoes.
   - Filter shoes by price, release date, brand, model, style, size, color, and additional parameters.

1. **Sales Management:**

   - Sell shoes with a form for quantity, buyer name, and date.
   - Update inventory based on sales.

1. **Sales History**:

   - View sales history categorized by weekly, daily, monthly, and yearly.

1. **Make Requests for Polish Service and Customized Design Shoes**:

   - Buyers can request additional services such as polish service or customized design shoes.

1. **Accept Polish Requests and Customize Shoe Requests from Buyers**:

   - Sellers can accept requests for polish service and customized shoe designs from buyers.

## Technologies Used

- Node.js
- Express
- TypeScript
- MongoDB (Mongoose)

## API Endpoints

#### 1. Authentication

1. **User Register:**

   - Endpoint: `BASE-URL/api/v1/auth/register` || Method: `POST`

1. **User Login:**

   - Endpoint: `BASE-URL/api/v1/auth/login` || Method: `POST`

#### 2. Shoes Management CURD Operation

1. **Create:**

   - Endpoint: `BASE-URL/api/v1/products/create-product` || Method: `POST`

1. **Read:**

   - Endpoint: `BASE-URL/api/v1/products` || Method: `GET`

   - Endpoint: `BASE-URL/api/v1/products/:productId` || Method: `GET`

   - Endpoint: `BASE-URL/api/v1/products/verify:productID` || Method: `GET`

1. **Update:**

   - Endpoint: `BASE-URL/api/v1/products/:productId` || Method: `PATCH`
   - Endpoint: `BASE-URL/api/v1/products/add-to-cart` || Method: `PUT`

1. **Delete:**

   - Endpoint: `BASE-URL/api/v1/products/:productId` || Method: `DELETE`

   - Endpoint: `BASE-URL/api/v1/products` || Method: `DELETE`

#### 3. Sales Management

1. **create sales:**

   - Endpoint: `BASE-URL/api/v1/sales/create-sell` || Method: `POST`

1. **sales history:**

   - Endpoint: `BASE-URL/api/v1/sales/:salesPeriod` || Method: `GET`

#### 4.Polish Service

1. **Create Polish Request**

   - Endpoint: `BASE-URL/api/v1/polish/create-polish-request` || Method: `POST`

2. **Get All Polish Request**

   - Endpoint: `BASE-URL/api/v1/polish/all-polish-requests` || Method: `GET`

3. **Update Polish Request Status**
   - Endpoint: `BASE-URL/api/v1/polish/polish-request-status/:polishId` || Method: `PUT`
