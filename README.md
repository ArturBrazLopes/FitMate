# 💰 Personal Finance Dashboard

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
- 🗒️ **Documentation File** — Includes a `DOCS.txt` explaining how the app works and its structure.

---

## 🧰 Tech Stack

**Frontend:**
- React.js (with Vite)
- HTML5, CSS3, JavaScript (ES6+)

**Backend:**
- Node.js (API setup)
- MongoDB (Database)

**Other Tools:**
- Chart.js (for Pie Chart visualization)
- Axios (API communication)
- dotenv (Environment configuration)

---

## ⚙️ How It Works

1. The user logs in or creates an account.
2. Inputs their **monthly salary**.
3. Adds **expenses** with predefined or custom categories.
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
├── 📁 client/               # React + Vite Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── 📁 server/               # Backend and MongoDB connection
│   ├── models/
│   ├── routes/
│   ├── index.js
│   └── .env
│
├── DOCS.txt                 # Documentation and explanations
└── README.md
```

---

## 🧑‍💻 Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/your-username/personal-finance-dashboard.git
cd personal-finance-dashboard
```

### 2. Install dependencies
**Frontend:**
```bash
cd client
npm install
```
**Backend:**
```bash
cd server
npm install
```

### 3. Configure environment variables
Create a `.env` file inside `/server` and add:
```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

### 4. Run the app
**Frontend:**
```bash
npm run dev
```
**Backend:**
```bash
npm start
```

---

## 🧾 Example Categories

- Food
- Transport
- Rent
- Entertainment
- Health
- Others
