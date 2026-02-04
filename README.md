# 🐾 PawMart Server

**PawMart Server** is the backend service for the PawMart online pet care platform.  
It provides secure RESTful APIs to manage pet adoption, products, and orders.

---

## 🌐 Live Demo
🔗 https://whimsical-puffpuff-cbcaaf.netlify.app/

---

## 🎯 Purpose

The purpose of the PawMart Server is to handle all backend operations, including:

- Pet adoption requests  
- Product management (food, accessories, care items)  
- Order tracking and delivery  
- User authentication and role-based access  

---

## ✨ Key Features

- 🔐 Firebase authentication and authorization  
- 🐶 Manage pets for adoption  
- 🍖 Manage pet products (food, accessories, care items)  
 - 📦 CRUD operations for pets and products  

  

---

## 🛠️ Technologies & NPM Packages Used

- **Node.js** – Backend runtime  
- **Express.js** – REST API framework  
- **MongoDB** – Database for pets, products, and users  
- **Firebase Admin** – Authentication & secure access  
- **Cors** – Cross-origin requests handling  
- **Dotenv** – Environment variable management  
- 

---

## 🚀 Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/pawmart-server.git
```

### 2️⃣ Navigate to the Server Directory
```bash
cd pawmart-server
```

### 3️⃣ Install Dependencies
```bash
npm install
```

### 4️⃣ Configure Environment Variables

Create a `.env` file in the root directory:

```env
DB_USER=your_mongodb_username
DB_PASS=your_mongodb_password
FIREBASE_PRIVATE_KEY=your_firebase_private_key
CLIENT_SITE_URL=your_frontend_live_url
STRIPE_SECRET_KEY=your_stripe_secret_key
```

⚠️ Do **not** commit your `.env` file.

### 5️⃣ Start the Server
```bash
npm run start
```

---

## 👤 Author

**Tahsin Sikder**  
🔗 LinkedIn: https://www.linkedin.com/in/tahsin-sikder99/  
🌐 Portfolio: https://tahsin-web.netlify.app/
