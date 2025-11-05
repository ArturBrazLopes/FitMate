#!/bin/bash

echo "Instalando dependências do backend..."
cd backend
npm install

echo ""
echo "Instalando dependências do frontend..."
cd ../frontend
npm install

echo ""
echo "✅ Todas as dependências foram instaladas!"
echo ""
echo "Próximos passos:"
echo "1. Configure o arquivo backend/.env com suas credenciais MongoDB"
echo "2. Configure o arquivo frontend/.env com a URL da API"
echo "3. Execute 'npm start' na pasta backend para iniciar o servidor"
echo "4. Execute 'npm run dev' na pasta frontend para iniciar o frontend"

