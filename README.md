# 📚 Library Management Backend

This project is a backend API for managing a library system. It supports **book catalog management**, **inventory tracking**, **borrowing and returning books**, and **automatic customer reputation scoring**.

Built using **NestJS**, **Prisma ORM**, and **PostgreSQL**.

---

## ⚙️ Setup Instructions

### 1️⃣ Prerequisites
Make sure you have the following installed:

- **Node.js** (v18 or later)
- **npm**
- **PostgreSQL**
- **Git**

---

### 2️⃣ Clone the Repository

git clone https://github.com/your-username/libmanage-backend.git
cd libmanage-backend

npm install
DATABASE_URL="postgresql://USERNAME:PASSWORD@localhost:5432/libmanage?schema=public"
PORT=3000

## Prisma Setup
npx prisma generate
npx prisma migrate dev

How to run Server: 
npm run start:dev


## 🧠 Approach and Design Explanation

This backend is designed around **domain-driven concepts** rather than directly exposing database tables.

Core resources such as **Books**, **Book Copies**, **Loans**, and **Customers** are modeled as real-world domain concepts.

**Prisma ORM** is used to provide type-safe database access and transaction management.

**Soft deletes** are implemented using `deletedAt` fields to preserve historical data while preventing permanent removal.

Borrowing and returning books are handled within a dedicated **Circulation module**, using database transactions to ensure data consistency and integrity.

Customer **reputation scores** are calculated automatically based on return behavior (early, on-time, or late returns), preventing manual manipulation from the client.

The architecture follows **clean RESTful API principles**, keeping business logic inside services and using controllers solely for request routing.
