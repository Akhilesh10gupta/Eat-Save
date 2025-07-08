
# 🍽️ ExtraBite – Food Donation Platform

[![Frontend Live](https://img.shields.io/badge/Live%20Frontend-blue?style=flat-square&logo=vercel)](https://extra-bite-frontend.vercel.app)
[![Backend API Docs](https://img.shields.io/badge/API%20Docs-Swagger-green?style=flat-square&logo=spring)](https://extrabite-backend-2.onrender.com/swagger-ui/index.html#/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**ExtraBite** is a full-stack food donation platform connecting donors and receivers to reduce food waste in local communities. Users can browse, request, donate, and rate food, all within a seamless interface built with modern technologies.

---

## 🌐 Live Demo

- **Frontend:** [extra-bite-frontend.vercel.app](https://extra-bite-frontend.vercel.app)
- **Backend API Docs:** [Swagger UI](https://extrabite-backend-2.onrender.com/swagger-ui/index.html#/)

---

## 🚀 Tech Stack

### 🖥️ Frontend
- React.js
- Tailwind CSS
- Axios
- Framer Motion
- Cloudinary (image uploads)

### ⚙️ Backend
- Java 17
- Spring Boot 3.5.0
- PostgreSQL + JPA/Hibernate
- Spring Security (JWT)
- Swagger / OpenAPI 3
- Maven
- Docker

---

## 📦 Features

- 🔐 **User Authentication** – Role-based access (Donor / Receiver), JWT-secured sessions
- 🍱 **Donation System** – Create, view, and manage food donations with images and expiry
- 📥 **Request System** – Request food, manage status, and confirm pickup with OTP
- 🌍 **Browse & Directory** – View food donations filtered by location and type
- ⭐ **Ratings** – Leave feedback and star ratings after completed donations
- 🛠️ **Admin Panel** – Manage users and content (under development)
- 📦 **API Security** – Custom API Key authentication for secure access

---

## 🛠️ Installation & Setup

### 🔧 Backend

```bash
# Clone the repo
git clone https://github.com/alokmaurya22/extrabite-backend-2.git
cd extrabite-backend-2

# Create and configure `.env` file
cp env.example .env

# Build and run
mvn clean install
mvn spring-boot:run

# OR using Docker
docker build -t extrabite-backend .
docker run -p 8080:8080 --env-file .env extrabite-backend
```

### 💻 Frontend

```bash
# Clone the repo
git clone https://github.com/Akhilesh10gupta/Extrabite.git
cd Extrabite

# Install dependencies
npm install

# Run in dev mode
npm run dev
```

---

## 📂 Project Structure

```
Extrabite/
├── src/
│   ├── components/         # Reusable components
│   ├── pages/              # Page views (Home, Signup, etc.)
│   ├── context/            # Auth & loading context
│   ├── api/                # API utility functions
│   └── assets/             # Images, icons, etc.
```

---

## 🔐 Authentication & API Usage

- **JWT Authentication**: Used for login-protected operations.
- **API Key**: Required in headers for all backend requests.

Example Header:
```http
EXTRABITE-API-KEY: your_api_key_here
```

---

## 📄 API Documentation

Explore complete API details here:

- 🔍 **Swagger UI**: [https://extrabite-backend-2.onrender.com/swagger-ui/index.html#/](https://extrabite-backend-2.onrender.com/swagger-ui/index.html#/)
- 📘 **Modules Included**:
  - Auth API
  - User Profile API
  - Donation API
  - Request API
  - Rating API
  - Browse/Directory API

---

## 🧪 Testing

```bash
# Run backend tests
mvn test

# Generate coverage report
mvn test jacoco:report
```

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the project
2. Create your feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a pull request

---

## 📬 Contact

**Developer**: Akhilesh Gupta  
📧 Email: gakhilesh946@gmail.com  
🌐 GitHub: [@Akhilesh10gupta](https://github.com/Akhilesh10gupta)  
🔗 LinkedIn: [Akhilesh Gupta](https://www.linkedin.com/in/akhilesh-gupta-826067228/)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
