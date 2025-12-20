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

## Env Variables
DATABASE_URL="postgresql://USERNAME:PASSWORD@localhost:5432/libmanage?schema=public"
PORT=3000

## Prisma Setup
npx prisma generate
npx prisma migrate dev

How to run Server: 
npm run start:dev


## 🧠 Approach and Design Explanation

Core resources such as **Books**, **Book Copies**, **Loans**, and **Customers** are modeled as real-world domain concepts. Each concept has a clear responsibility and lifecycle, making the system easier to understand and extend.

### Modular Architecture

The application is divided into the following main modules:

- **Catalog Module**  
  Responsible for managing book-related information such as titles, genres, language, ISBN, and authors. It handles searching, filtering, pagination, and soft deletion of books.

- **Inventory Module**  
  Manages physical book copies, including their availability status (e.g., AVAILABLE, LOANED, DAMAGED). This module tracks multiple copies of the same book and supports soft deletion and status updates.

- **Circulation Module**  
  Handles borrowing and returning of books. It coordinates updates across multiple resources (loans, book copies, and customers) using database transactions to ensure consistency.

- **Reputation Module**  
  Calculates and applies customer reputation score changes automatically based on borrowing behavior. Scores are adjusted when a book is returned early, on time, or late, preventing manual manipulation from the client.

### Data Integrity and Transactions

**Prisma ORM** is used to provide type-safe database access and transaction management. Critical operations such as borrowing and returning books are executed within transactions to guarantee data integrity.

### Soft Deletes

Soft deletes are implemented using `deletedAt` fields. This approach preserves historical data while preventing permanently removed records from appearing in active queries.

### API Design Principles

The system follows **clean RESTful API principles**:
- URLs identify resources (domain concepts)
- HTTP methods describe actions
- Controllers handle routing only
- Business logic is encapsulated within services

This design ensures the backend is maintainable, scalable, and aligned with real-world library workflows.
