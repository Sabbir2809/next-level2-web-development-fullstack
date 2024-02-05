# Shoes Management Dashboard Server

## Overview

This is the backend for the Shoes Management Dashboard, responsible for handling authentication, managing shoe inventory, and providing API endpoints.

### API Live Link: https://shoes-management-dashboard-server.vercel.app

### Postman API Documentation: https://documenter.getpostman.com/view/15226030/2s9YysEMx5

## Table of Contents

- [Setup](#setup)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [API Endpoints](#api-endpoints)

## Setup

### Backend (Express, Mongoose, TypeScript)

1. Install dependencies and Run the server:

   ```bash

   git clone # 1. Clone the Repository:
   cd shoes-management-dashboard-server # Navigate to the project directory:
   npm install # 3. Install Dependencies:
   npm run dev # 4. Run the server:
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

### Features

1. Authentication:

   - User registration and login using JWT.

1. Shoes Management:

   - CRUD operations for managing shoes.
   - Filtering options for efficient inventory management.

1. Sales Management:

   - Sell shoes with a form for quantity, buyer name, and date.
   - Update inventory based on sales.

1. Sales History:

   - View sales history categorized by weekly, daily, monthly, and yearly.

1. Shoes Filtering:

   - Filter shoes by price, release date, brand, model, style, size, color, and additional parameters.

### Technologies Used

- Node.js
- Express
- TypeScript
- Mongoose (MongoDB)

### API Endpoints

#### 1. Authentication

1. User Register:

   - **Endpoint:** `BASE-URL/api/v1/auth/register`
   - **Method:** `POST`

1. User Login:

   - **Endpoint:** `BASE-URL/api/v1/auth/login`
   - **Method:** `POST`

#### 2. Shoes Management CURD Operation

1. Create:

   - **Endpoint:** `BASE-URL/api/v1/products/create-product`
   - **Method:** `POST`

1. Read:

   - **Endpoint:** `BASE-URL/api/v1/products`
   - **Method:** `GET`

   - **Endpoint:** `BASE-URL/api/v1/products/:productId`
   - **Method:** `GET`

1. Update:

   - **Endpoint:** `BASE-URL/api/v1/products/:productId`
   - **Method:** `PATCH`

1. Delete:

   - **Endpoint:** `BASE-URL/api/v1/products/:productId`
   - **Method:** `DELETE`

#### 3. Sales Management

1. create sales:

   - **Endpoint:** `BASE-URL/api/v1/sales/create-sell`
   - **Method:** `POST`

1. sales history:

   - **Endpoint:** `BASE-URL/api/v1/sales/:salesPeriod`
   - **Method:** `GET`
