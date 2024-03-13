# Shoes Management Dashboard Client

#### Frontend Live Link: https://shoes-inventory.netlify.app/

## Overview

This is the frontend for the Shoes Management Dashboard, providing a user interface for managing shoe inventory, tracking sales, and analyzing sales history.

## Table of Contents

- [Project Setup](#setup)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [API Endpoints](#api-endpoints)

## Project Setup

### Frontend (React, TypeScript, React-Redux Toolkit)

1. Install dependencies and Run the client:

   ```bash
   git clone # 1. Clone the Repository:
   cd shoes-management-dashboard-client # Navigate to the project directory:
   npm install # 3. Install Dependencies:
   npm run dev # 4. Run the client:
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

### Technologies Used

- React
- TypeScript
- React-Redux Toolkit
