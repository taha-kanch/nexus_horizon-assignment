# EdTech Platform Scaffold

A full-stack EdTech platform scaffold with:
- **Backend:** Express.js, Apollo GraphQL, Sequelize (MySQL)
- **Frontend:** Next.js, TypeScript, Apollo Client, Redux, Tailwind CSS, Formik

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd edtech-platform-scaffold
```

### 2. Install Dependencies
#### Backend
```bash
cd backend
npm install
```
#### Frontend
```bash
cd ../frontend
npm install
```

### 3. Configure Environment Variables
- Copy `.env.example` to `.env` in the `backend` folder and fill in your MySQL credentials:
  - `DB_NAME`, `DB_USER`, `DB_PASS`, `DB_HOST`, `DB_PORT`, `PORT`

### 4. Seed the Database
This will reset and populate the database with demo users and courses.
```bash
cd backend
node src/seed.js
```

### 5. Start the Backend
```bash
npm run dev
# Server runs at http://localhost:8080/graphql
```

### 6. Start the Frontend
```bash
cd ../frontend
npm run dev
# App runs at http://localhost:3000
```

---

## 👤 Demo Users (for Login)
Use these emails to log in (no password required):

| Name           | Email                | Role      |
|----------------|----------------------|-----------|
| Alice Johnson  | alice@example.com    | STUDENT   |
| Bob Smith      | bob@example.com      | PROFESSOR |
| Carol Lee      | carol@example.com    | STUDENT   |

---

## 📝 Features
- **Login:** Enter your email to log in as a student or professor.
- **Home:** View all courses.
- **Course Details:**
  - Students: View content, enroll if not already enrolled.
  - Professors: Edit course content.
- **Enrollment:**
  - Students can enroll in courses (button hidden if already enrolled).
  - Confirmation page after enrolling.
- **Role-based Routing:** Professors can edit, students cannot.
- **State Management:** Redux for user state.
- **Styling:** Tailwind CSS.
- **Forms:** Formik.

---

## ⚙️ Tech Stack
- **Backend:** Node.js, Express, Apollo Server, Sequelize, MySQL
- **Frontend:** Next.js, TypeScript, Apollo Client, Redux, Tailwind CSS, Formik

---

## 📂 Folder Structure
```
/edtech-platform-scaffold
  /backend      # Express + GraphQL API
  /frontend     # Next.js + TypeScript frontend
```

---

## 🛠️ Notes
- Make sure MySQL is running and accessible with the credentials in your `.env` file.
- The backend must be running before using the frontend.
- You can add more users/courses in `backend/src/seed.js`.
- For any issues, check backend logs for errors.

---

## 📧 Contact
For any questions, contact the assignment author or maintainer. 