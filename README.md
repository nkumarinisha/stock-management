# Stock Management System

A Stock Management Web App built using Next.js, React, Tailwind CSS, and Firebase Firestore.

#  How the Project Works (Step-by-Step)

##  Step 1: Login
- User opens the app
- Enters login credentials
- After login → redirects to Dashboard

---

##  Step 2: Dashboard
- Shows total products
- Shows total stock quantity
- Shows low stock alerts

---

##  Step 3: Product Management
User can:
- Add new product
- Edit product details
- Delete product
- View all products in cards

Product fields include:
- Product Name
- SKU Code
- Category
- Quantity
- Purchase Price
- Selling Price

## Step 4: Stock Management
- Click ➕ to increase stock (Stock IN)
- Click ➖ to decrease stock (Stock OUT)
- Quantity updates automatically in Firebase
- Last updated time is stored
## Step 5: Reports Page
- Displays all products in table format
- Shows:
  - Product Name
  - Current Quantity
  - Last Updated Date

#  Tech Stack
- Next.js (App Router)
- React.js
- Tailwind CSS
- Firebase Firestore

# Setup Instructions

## 1️ Clone Repository
```bash
git clone https://github.com/nkumarinisha/stock-management.git
