# Urban Farming Backend Platform 🥦🚜

An interactive backend platform designed to bridge the gap between urban farmers and customers. Built with **Node.js**, **Express**, and **Prisma 7**.

## 🚀 Features

- **RBAC (Role-Based Access Control)**: Specialized permissions for Admin, Vendor, and Customer roles.
- **Marketplace**: Browse, search, and purchase organic produce, seeds, and tools.
- **Garden Rental**: Farmers list garden plots for users to lease and grow their own crops.
- **Plant Tracking**: Monitoring growth stage and health data for plants in leased plots.
- **Community Forum**: A space for urban farming enthusiasts to share tips and knowledge.
- **Sustainability Certification**: Automated workflow for vendors to apply for certifications.

## 🛠️ Tech Stack

- **Runtime**: Node.js (v20+)
- **Language**: TypeScript
- **Framework**: Express.js
- **ORM**: Prisma 7 (with PostgreSQL)
- **Database**: Supabase (PostgreSQL)
- **Security**: JWT, Bcrypt, Rate Limiting
- **Validation**: Zod
- **Logging**: Morgan

## 📋 API Documentation

### Authentication
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | `/api/v1/auth/register` | Register a new user |
| POST | `/api/v1/auth/login` | Login and get token |
| GET | `/api/v1/auth/me` | Get current user info |

### Marketplace (Produce)
| Method | Endpoint | Auth | Description |
| :--- | :--- | :--- | :--- |
| GET | `/api/v1/produce` | Public | List products (supports filters) |
| POST | `/api/v1/produce` | Vendor | Create product listing |

### Garden Rental & Booking
| Method | Endpoint | Auth | Description |
| :--- | :--- | :--- | :--- |
| GET | `/api/v1/rental` | Public | View available garden plots |
| POST | `/api/v1/orders` | Customer | Order produce or Book a rental space |

### Community & Tracking
| Method | Endpoint | Auth | Description |
| :--- | :--- | :--- | :--- |
| GET | `/api/v1/community` | Public | View community posts |
| GET | `/api/v1/tracking/dashboard` | User | View leased plots and plant health |

## ⚙️ Setup Instructions

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Environment Variables**:
   Create a `.env` file with:
   ```env
   PORT=5000
   DATABASE_URL="your_supabase_pooler_url"
   DIRECT_URL="your_supabase_direct_url"
   JWT_SECRET="your_secret"
   ```

3. **Database Setup**:
   ```bash
   npx prisma db push
   npx prisma db seed
   ```

4. **Run Development Server**:
   ```bash
   npm run dev
   ```

## 🧪 Testing Account
- **Admin**: `admin@farming.com` / `password123`
- **Vendor**: `vendor1@example.com` / `password123`
- **Customer**: `customer1@example.com` / `password123`

---
Developed for Maktech Urban Farming Assignment.
