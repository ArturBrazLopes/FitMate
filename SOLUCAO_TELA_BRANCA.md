# 🔍 Solução: Tela em Branco

## Verificações Rápidas

### 1. Abra o Console do Navegador
- Pressione `F12` ou `Ctrl+Shift+I`
- Vá na aba "Console"
- Veja se há erros em vermelho

### 2. Verifique se os Servidores Estão Rodando
Execute:
```bash
verificar.bat
```

### 3. Problemas Comuns e Soluções

#### ❌ Erro: "Cannot GET /"
- **Causa**: Frontend não está rodando
- **Solução**: Execute `start.bat` novamente

#### ❌ Erro: "Network Error" ou "Failed to fetch"
- **Causa**: Backend não está rodando ou CORS bloqueado
- **Solução**: 
  1. Verifique se o backend está rodando na porta 4000
  2. Verifique o arquivo `backend/.env` tem `FRONTEND_URL=http://localhost:5173`
  3. Execute `stop.bat` e depois `start.bat`

#### ❌ Erro: "401 Unauthorized"
- **Causa**: Token inválido ou expirado
- **Solução**: Faça logout e login novamente

#### ❌ Tela Branca Sem Erros
- **Causa**: Problema com React ou TailwindCSS
- **Solução**: 
  1. Abra o console (F12)
  2. Veja se há avisos sobre imports
  3. Verifique se as dependências foram instaladas: `cd frontend && npm install`

### 4. Teste Manual

Abra o navegador e acesse:
- `http://localhost:5173` - Deve mostrar a página de login
- `http://localhost:4000/health` - Deve retornar `{"success":true,"message":"Server is running"}`

### 5. Limpar Cache
- Pressione `Ctrl+Shift+R` para fazer hard refresh
- Ou limpe o cache do navegador

### 6. Verificar Variáveis de Ambiente

**backend/.env** deve ter:
```
PORT=4000
MONGO_URI=mongodb+srv://...
JWT_SECRET=...
FRONTEND_URL=http://localhost:5173
```

**frontend/.env** deve ter:
```
VITE_API_URL=http://localhost:4000
```

### 7. Reinstalar Dependências

Se nada funcionar:
```bash
stop.bat
cd backend
del node_modules
npm install
cd ../frontend
del node_modules
npm install
cd ..
start.bat
```

## Depois de Verificar

Se ainda estiver em branco, me diga:
1. O que aparece no console do navegador (F12)?
2. Os servidores estão rodando (verificar.bat)?
3. Consegue acessar http://localhost:4000/health?

