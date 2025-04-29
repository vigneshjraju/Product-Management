# 🛒 Product Management API

A RESTful API built using **Node.js, Express, MongoDB**, and **Multer** for handling product operations like creation, editing, deletion, listing, searching, filtering, sorting, and pagination. Admin-level and user-level access is implemented with authentication.

---

## ✅ Features

### 👥 Authentication
- JWT-based authentication
- Role-based access: **Users** and **Admin**

---

### 📦 Product Operations

#### 1. Create Product (Authenticated Users)
- Endpoint: `POST /createproduct`
- Fields: `name`, `description`, `price`, `category`, `image`

#### 2. Edit Product (Only by Creator or Admin)
- Endpoint: `PATCH /editproduct/:id`
- Multipart/form-data with optional image

#### 3. Delete Product (Only by Creator or Admin)
- Endpoint: `DELETE /deleteproduct/:id`

---

## 🔍 Public Routes (No Authentication)

### 1. Get All Products (Paginated)
- `GET /products/paginate?page=1`
- Returns 5 products per page (name, image, price)

### 2. Get Product Details
- `GET /product/:id`
- Returns all product fields by `productId`

---

## 🔍 Search, Filter, Sort (Separate Routes)

### 3. Search Products (by name or productId)
- `GET /products/search?query=Shoes`

### 4. Filter Products (by category & price)
- `GET /products/filter?category=Electronics&minPrice=100&maxPrice=1000`

### 5. Sort Products
- `GET /products/sort?sortBy=price&order=asc`
- `sortBy`: `price`, `name`, or `createdAt`
- `order`: `asc` or `desc`

---

## ⚙️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Middleware**: Multer (for file uploads), JWT (auth)
- **Frontend**: Not included (API-only)

---

## 🧪 Example .env File

```env
PORT=8000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret
```

---

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone git@github.com:vigneshjraju/Product-Management.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - `SECRET_KEY`: Secret key for JWT authentication.
   - `MONGO_URI`: MongoDB URI for the database.

4. Start the server:
   ```bash
   npm run dev
   ```

5. The server will be running at `http://localhost:8000`.

---

## URL for published documentation (POSTMAN)

https://documenter.getpostman.com/view/41183762/2sB2j3ArB2


---

## 🧑‍💻 Author

- **Name**: Vignesh J Raju
- **Project**: Event/Product Management Backend
- **Tech**: MERN (MongoDB, Express, Node.js, Postman)

---

## 📬 Contact

- GitHub: [vigneshjraju](https://github.com/vigneshjraju)
- Email: vigneshjraju@gmail.com

---

## 📘 License

This project is licensed under the MIT License.