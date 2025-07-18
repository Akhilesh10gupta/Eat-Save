# 🍽️ ExtraBite: Save Food, Feed Lives

[![Live Site](https://img.shields.io/badge/Live-Frontend-blue?style=flat-square\&logo=vercel)](https://extrabite.vercel.app)
[![Swagger API Docs](https://img.shields.io/badge/Docs-Swagger-green?style=flat-square\&logo=spring)](https://extrabite-backend-2.onrender.com/swagger-ui)
[![Postman Docs](https://img.shields.io/badge/API%20Docs-Postman-orange?style=flat-square\&logo=postman)](https://documenter.getpostman.com/view/30078893/2sA35KXuta)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**ExtraBite** is a full-stack food donation platform that connects donors and receivers (individuals or NGOs) to reduce food waste and fight hunger. From real-time donation listings to OTP-based pickup verification — we bring food where it's needed most.

---

## 🌍 Mission

To reduce food wastage and ensure surplus food reaches hungry people — because every meal matters.

---

## 🔥 Live Demo

* **Frontend**: [extrabite.vercel.app](https://extrabite.vercel.app)
* **Backend API Docs**: [Swagger UI](https://extrabite-backend-2.onrender.com/swagger-ui)
* **Postman Collection**: [Postman Docs](https://documenter.getpostman.com/view/30078893/2sA35KXuta)

---

## 🤭 Platform Features

* 👥 **User Roles**: Donor, Receiver, Admin
* 🍽️ **Donate Food**: Add food details with image, location, expiry, and price
* 📦 **Request Food**: Request donations with OTP-based pickup flow
* 📍 **Geo-based Listings**: Show nearby available food in real-time
* 🔄 **Request Lifecycle**: Status transitions (Pending → Accepted → Awaiting Pickup → Completed)
* 🗒️ **Ratings System**: Give feedback after donation completion
* 🛡️ **Admin Panel**: (In progress) Analytics & moderation
* 📷 **Image Uploads**: Capture or upload food images via Cloudinary
* 📊 **Analytics Dashboard**: Donation stats and graphs using Chart.js and MUI

---

## ⚙️ Tech Stack

### 💻 Frontend

* React 19 + Vite
* Tailwind CSS
* Framer Motion
* Axios
* @mui/material
* Chart.js, MUI Charts
* React Router, React Icons
* ESLint, Prettier

### 🖙 Backend

* Java 17, Spring Boot 3.5.0
* PostgreSQL + JPA/Hibernate
* Spring Security (JWT)
* Swagger + OpenAPI
* Docker
* Hosted on Render

---

## 🏠 Folder Structure (Frontend)

```
📆 src
👉📁 assets              # Icons, images
👉📁 components          # Reusable UI elements
👉📁 context             # Auth, loading state
👉📁 pages               # Main routes/views
👉📁 static_components   # Charts, Map visualizations
👉📁 api                 # Axios API utilities
👉📁 util                # Helper functions
```

---

## 🚀 Getting Started

### 🔧 Clone Repos

```bash
# Frontend
git clone https://github.com/Akhilesh10gupta/Extrabite.git
cd Extrabite

# Backend
git clone https://github.com/alokmaurya22/extrabite-backend-2.git
cd extrabite-backend-2
```

### 🧪 Frontend Setup

```bash
npm install

touch .env
```

```env
VITE_API_BASE_URL=https://extrabite-backend-2.onrender.com/api
VITE_API_KEY=your-api-key-here
```

```bash
npm run dev       # Start development server
npm run build     # Production build
npm run preview   # Preview build
```

### ⚙️ Backend Setup

```bash
# Using Maven
mvn clean install
mvn spring-boot:run

# OR with Docker
docker build -t extrabite-backend .
docker run -p 8080:8080 --env-file .env extrabite-backend
```

---

## 🔐 API Security

* **JWT Authentication**: Used after login/signup for protected routes
* **API Key Header** (Required for all frontend-to-backend calls):

```http
EXTRABITE-API-KEY: your-api-key-here
Authorization: Bearer your-jwt-token
```

---

## 🔀 Donation Workflow

1. **Donor** posts a donation
2. **Receiver** browses & sends a request
3. **Donor** accepts → OTP is generated
4. **Receiver** enters OTP on pickup
5. **Status updates** to "Completed"
6. **Both users** can rate each other

---

## 📊 Analytics & Data Sources

* Real-time charts for:

  * Total meals shared
  * Donation trends
  * Geo-based food sharing stats
* Data from:

  * [FAO](https://www.fao.org)
  * [GHI](https://www.globalhungerindex.org)
  * [UNEP Food Waste Index](https://www.unep.org/resources/report/unep-food-waste-index-report-2021)

---

## 📂 Notable API Endpoints

| Endpoint                             | Description               |
| ------------------------------------ | ------------------------- |
| `POST /api/auth/register`            | User registration         |
| `POST /api/auth/login`               | User login                |
| `POST /api/donations`                | Add donation              |
| `GET /api/browse/donations`          | List donations            |
| `POST /api/requests/create`          | Request food              |
| `GET /api/requests/me`               | Receiver's request list   |
| `GET /api/requests/received`         | Donor’s incoming requests |
| `GET /api/requests/{id}/pickup-code` | Get OTP for pickup        |
| `POST /api/ratings`                  | Rate donation             |

📘 Full docs: [Swagger UI](https://extrabite-backend-2.onrender.com/swagger-ui)

---

## 💬 Contribution Guidelines

1. Fork the project
2. Create a branch: `git checkout -b feature/xyz`
3. Commit your changes
4. Push: `git push origin feature/xyz`
5. Open a pull request

---

## 👨‍💻 Developer Info

**👨‍💻 Akhilesh Gupta**
📧 Email: [gakhilesh946@gmail.com](mailto:gakhilesh946@gmail.com)
🔗 [LinkedIn](https://www.linkedin.com/in/akhilesh-gupta-826067228/)
🐈 [GitHub](https://github.com/Akhilesh10gupta)

---

## 📄 License

Licensed under the [MIT License](LICENSE)
Built for good – not profit 💛
