# Urban Farming Backend Platform 🥦🚜

An interactive backend platform designed to bridge the gap between urban farmers and metropolitan customers. This project enables garden space rentals, organic produce trading, community knowledge sharing, and real-time plant growth tracking.

## 🚀 Core Modules & Features

### 1. User Authentication & RBAC
- Secure JWT-based auth with Bcrypt password hashing.
- Role-Based Access Control: **Admin**, **Vendor**, and **Customer**.

### 2. Garden Space Rental
- Vendors can list garden plots for lease.
- Customers can search for plots by location and book them.

### 3. Produce Marketplace
- Comprehensive catalog for seeds, tools, and organic products.
- Advanced filtering by category, price range, and keyword search.
- Integrated **Paginated** listings for performance.

### 4. Sustainability & Certification
- Automated certification workflow for vendors.
- Admin review system to approve/reject organic certifications.

### 5. Community & Tracking
- **Forum**: Threaded discussions and gardening tips logic.
- **Tracking**: Real-time growth stage and health monitoring for leased plants.

## 🛠️ Tech Stack & Architecture
- **Backend**: Node.js, Express, TypeScript.
- **ORM**: Prisma 7.
- **Database**: Supabase (PostgreSQL) with Connection Pooling.
- **Validation**: Zod (Strict Schema Enforcement).
- **Security**: Rate-Limiting, Helmet-ready headers, stateless JWT.

## ⚙️ Setup Instructions

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Environment Configuration**:
   Create a `.env` file in the root:
   ```env
   PORT=5000
   DATABASE_URL="your_supabase_pooler_url"
   DIRECT_URL="your_supabase_direct_url"
   JWT_SECRET="your_secure_secret"
   ```

3. **Database Population (Required)**:
   Synchronize the schema and run the seeder:
   ```bash
   npx prisma db push
   npx prisma db seed
   ```

4. **Run Server**:
   ```bash
   npm run dev
   ```

## 🧪 Testing Accounts (Seeding Data)
- **Admin**: `admin@farming.com` / `password123`
- **Vendor**: `vendor1@example.com` to `vendor10@example.com` / `password123`
- **Customer**: `customer1@example.com` / `password123`

## 📡 API Endpoints Overview

| Module | Endpoint | Method | Role |
| :--- | :--- | :--- | :--- |
| **Auth** | `/api/v1/auth/login` | POST | Public |
| **Market** | `/api/v1/produce` | GET | Public |
| **Market** | `/api/v1/produce` | POST | Vendor |
| **Rental** | `/api/v1/rental` | GET | Public |
| **Orders** | `/api/v1/orders` | POST | Customer |
| **Admin** | `/api/v1/admin/certification/:id` | PATCH | Admin |
| **Tracking** | `/api/v1/tracking/dashboard` | GET | User |

---
**Developed for Maktech Urban Farming Assignment.**
Detailed technical notes can be found in [STRATEGY.md](./STRATEGY.md).
