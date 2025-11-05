@echo off
(
echo PORT=4000
echo MONGO_URI=mongodb+srv://arturbrazlopes_db_user:YIXuZX2hRacJSv9A@cluster0.jvb99nc.mongodb.net/financemate_db?retryWrites=true^&w=majority^&appName=Cluster0
echo JWT_SECRET=financemate-super-secret-jwt-key-change-this-in-production-2024
echo NODE_ENV=development
echo FRONTEND_URL=http://localhost:5173
) > backend\.env
echo MongoDB configurado!
