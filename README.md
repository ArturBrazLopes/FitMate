# 💰 FinanceMate - Personal Finance Dashboard

A **React.js + Vite** and **MongoDB** web application that helps users track income, expenses, and visualize their financial balance in real time — all in one clean, single-page dashboard.

It works like an **interactive Excel sheet**, where users can enter their **salary**, manage **expenses by category**, and see a **dynamic pie chart** showing how money is distributed.

---

## 🚀 Features

- 🔐 **Login System** — Secure user authentication to access personal data.
- 💵 **Salary Input** — Add or update your monthly income.
- 🧾 **Expense Management** — Add, edit, or delete expenses by predefined categories.
- 📊 **Dynamic Pie Chart** — Displays total salary, total expenses, and remaining balance at a glance.
- 🗂️ **Category System** — Expenses are organized by categories for better visualization.
- ⚡ **Single Page Application (SPA)** — Everything visible right after login, no unnecessary navigation.
- 🧮 **Real-Time Calculations** — Automatically updates balance and chart when data changes.
- 🗒️ **Documentation File** — Includes a `docs.txt` explaining how the app works and its structure.

---

## 🧰 Tech Stack

**Frontend:**
- React.js (with Vite)
- TailwindCSS, Chart.js, React Router
- HTML5, CSS3, JavaScript (ES6+)

**Backend:**
- Node.js + Express
- MongoDB (Mongoose)
- JWT Authentication

**Other Tools:**
- Chart.js (for Pie Chart visualization)
- Axios (API communication)
- dotenv (Environment configuration)

---

## ⚙️ How It Works

1. The user logs in or creates an account.
2. Inputs their **monthly salary**.
3. Adds **expenses** with predefined categories.
4. The system calculates:
   - 💰 Total Salary
   - 💸 Total Expenses
   - 🧮 Remaining Balance
5. A **pie chart** updates automatically showing the percentage of each category.

---

## 📂 Project Structure

```
📁 project-root
│
├── 📁 frontend/              # React + Vite Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── 📁 backend/               # Backend and MongoDB connection
│   ├── src/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── app.js
│   │   └── server.js
│   └── .env
│
├── docs.txt                  # Documentation and explanations
├── rodar.bat                 # Automatic setup and run script
├── start.bat                 # Start application
├── stop.bat                  # Stop servers
├── setup.bat                 # Install dependencies
└── README.md
```

---

## 🧑‍💻 Quick Setup (Windows)

### Automatic Setup
```bash
rodar.bat
```

### Manual Setup

#### 1. Clone the repository
```bash
git clone https://github.com/ArturBrazLopes/FitMate.git
cd FitMate
```

#### 2. Install dependencies
**Frontend:**
```bash
cd frontend
npm install
```
**Backend:**
```bash
cd backend
npm install
```

#### 3. Configure environment variables
Create a `.env` file inside `/backend` and add:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=4000
NODE_ENV=development
```

#### 4. Run the app
**Start everything:**
```bash
start.bat
```

**Or manually:**
- Frontend: `cd frontend && npm run dev`
- Backend: `cd backend && npm start`

---

## 📋 Available Scripts

| Arquivo | Função |
|---------|--------|
| `rodar.bat` | Automatic setup, configuration, and start |
| `start.bat` | Start both frontend and backend servers |
| `stop.bat` | Stop all running servers |
| `setup.bat` | Install all dependencies |
| `config-mongodb.bat` | Configure MongoDB connection |

---

## 🌐 Access

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:4000

---

## 🧾 Predefined Categories

- Food
- Transport
- Leisure
- Bills
- Health
- Others

---

## 📚 Documentation

For detailed documentation, see `docs.txt` in the project root.
