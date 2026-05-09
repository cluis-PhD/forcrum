# ⚡ Comandos Rápidos - forScrum

Comandos essenciais para trabalhar com o projeto.

---

## 🚀 Setup Inicial

```bash
# 1. Navegar para o projeto
cd /workspaces/default/code/myforscrum-vercel

# 2. Instalar dependências
npm install

# 3. Configurar environment
echo "DATABASE_URL=postgresql://sua_connection_string_aqui" > .env.local

# 4. Rodar projeto
npm run dev
```

---

## 📦 Git & GitHub

### Primeira vez (Criar Repo)

```bash
# 1. Inicializar Git
git init

# 2. Adicionar arquivos
git add .

# 3. Commit inicial
git commit -m "Initial commit - forScrum Vercel"

# 4. Conectar ao GitHub (criar repo primeiro em github.com)
git remote add origin https://github.com/SEU_USERNAME/myforscrum-vercel.git

# 5. Push
git branch -M main
git push -u origin main
```

### Comandos Diários

```bash
# Ver status
git status

# Adicionar mudanças
git add .

# Commit
git commit -m "Descrição da mudança"

# Push para GitHub
git push

# Ver histórico
git log --oneline

# Ver diferenças
git diff
```

---

## 🗄️ Neon Database

### Executar Schema (primeira vez)

1. Copiar conteúdo de `schema.sql`
2. Ir para: https://console.neon.tech
3. SQL Editor → Colar → Run

### Queries Úteis

```sql
-- Ver todos os dados
SELECT * FROM kv_store;

-- Ver cursos
SELECT * FROM kv_store WHERE key LIKE 'course:%';

-- Ver formandos
SELECT * FROM kv_store WHERE key LIKE 'student:%';

-- Contar registos por tipo
SELECT 
  SPLIT_PART(key, ':', 1) as tipo,
  COUNT(*) as quantidade
FROM kv_store
GROUP BY tipo;

-- Limpar tudo (CUIDADO!)
TRUNCATE TABLE kv_store;
```

---

## 🧪 Testar API

### Local (http://localhost:3000)

```bash
# Listar cursos
curl http://localhost:3000/api/courses

# Criar curso
curl -X POST http://localhost:3000/api/courses \
  -H "Content-Type: application/json" \
  -d '{"name":"Curso Teste","description":"Descrição"}'

# Obter curso específico
curl http://localhost:3000/api/courses/1234567890

# Listar formandos
curl http://localhost:3000/api/students

# Criar formando
curl -X POST http://localhost:3000/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"João Silva","email":"joao@test.com","courseId":"1234567890"}'
```

### Produção (substituir SEU_APP)

```bash
# Listar cursos
curl https://SEU_APP.vercel.app/api/courses

# Criar curso
curl -X POST https://SEU_APP.vercel.app/api/courses \
  -H "Content-Type: application/json" \
  -d '{"name":"Curso Produção","description":"Teste"}'
```

---

## 📱 NPM Scripts

```bash
# Desenvolvimento (com hot reload)
npm run dev

# Build (testar antes de fazer deploy)
npm run build

# Produção (após build)
npm start

# Lint (verificar código)
npm run lint
```

---

## 🔍 Debug

### Ver Logs Locais

```bash
# Rodar com logs detalhados
npm run dev

# Em outro terminal, fazer requests
curl http://localhost:3000/api/courses
```

### Ver Logs no Vercel

1. Vercel Dashboard → Project
2. Deployments → Latest
3. Functions → Ver logs de cada API

---

## 🔄 Deploy

### Deploy Automático (Recomendado)

```bash
# Simplesmente fazer push
git add .
git commit -m "Nova feature"
git push

# Vercel detecta e faz deploy automático!
```

### Deploy Manual (Vercel CLI)

```bash
# Instalar CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

---

## 📂 Estrutura de Pastas

```bash
# Ver estrutura do projeto
tree -L 2 -I 'node_modules'

# Ou:
find . -type d -maxdepth 2 -not -path "*/node_modules/*" -not -path "*/.git/*"

# Contar arquivos por tipo
find app -name "*.tsx" | wc -l
find app/api -name "*.ts" | wc -l
```

---

## 🔒 Environment Variables

### Local (.env.local)

```bash
# Criar/editar
nano .env.local

# Ver (sem mostrar valores)
cat .env.local | sed 's/=.*/=***/'

# Verificar se existe
ls -la | grep .env
```

### Vercel (Produção)

```bash
# Via CLI
vercel env add DATABASE_URL production

# Ou via Dashboard:
# vercel.com → Project → Settings → Environment Variables
```

---

## 🗑️ Limpeza

```bash
# Limpar node_modules
rm -rf node_modules

# Limpar build
rm -rf .next

# Reinstalar tudo
npm install

# Rebuild
npm run build
```

---

## 📊 Estatísticas do Projeto

```bash
# Contar linhas de código
find app -name "*.tsx" -o -name "*.ts" | xargs wc -l

# Contar componentes
find app/components -name "*.tsx" | wc -l

# Contar APIs
find app/api -name "*.ts" | wc -l

# Tamanho do projeto
du -sh .
```

---

## 🆘 Problemas Comuns

### Porta 3000 ocupada

```bash
# Matar processo na porta 3000
lsof -ti:3000 | xargs kill -9

# Ou usar outra porta
PORT=3001 npm run dev
```

### Erro de dependências

```bash
# Limpar cache
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Build falha

```bash
# Ver erros detalhados
npm run build 2>&1 | tee build.log

# Verificar TypeScript
npx tsc --noEmit
```

---

## 📚 Links Úteis

```bash
# Abrir no browser
open http://localhost:3000                    # App local
open https://github.com/SEU_USERNAME/myforscrum-vercel  # GitHub
open https://vercel.com/dashboard            # Vercel
open https://console.neon.tech               # Neon
```

---

## 💡 Dicas

```bash
# Ver package.json de forma bonita
cat package.json | jq

# Atualizar dependências
npm outdated
npm update

# Verificar segurança
npm audit
npm audit fix

# Ver tamanho do bundle
npm run build
ls -lh .next/static/chunks/*.js
```

---

**Última atualização:** 05/05/2026
