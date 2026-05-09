# 📘 Manual Completo: GitHub + Vercel + Neon

## Guia Passo-a-Passo para Deploy do forScrum

---

## 📋 Pré-requisitos

Antes de começar, precisa ter:

- ✅ Conta no [GitHub](https://github.com)
- ✅ Conta no [Vercel](https://vercel.com)
- ✅ Conta no [Neon](https://neon.tech)
- ✅ Git instalado no computador
- ✅ Node.js 18+ instalado

---

## 🚀 PARTE 1: Preparar o Projeto

### 1.1 Verificar Estrutura do Projeto

```bash
cd /workspaces/default/code/myforscrum-vercel
ls -la
```

**Deve ver:**
```
.env.example
.gitignore
app/
lib/
package.json
schema.sql
README.md
... (outros arquivos)
```

### 1.2 Verificar .gitignore

Abra o arquivo `.gitignore` e confirme que tem:

```
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local
.env

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
```

**✅ IMPORTANTE:** O `.env` e `.env.local` devem estar no `.gitignore` para NÃO commitar credenciais!

---

## 🚀 PARTE 2: Criar Repositório no GitHub

### 2.1 Inicializar Git

```bash
cd /workspaces/default/code/myforscrum-vercel

# Inicializar repositório Git
git init

# Verificar status
git status
```

### 2.2 Adicionar Todos os Arquivos

```bash
# Adicionar todos os arquivos (exceto os do .gitignore)
git add .

# Verificar o que será commitado
git status
```

**Verifique que `.env.local` NÃO aparece na lista!**

### 2.3 Fazer Commit Inicial

```bash
git commit -m "Initial commit - forScrum Vercel

- Next.js 15 + React 18 + TypeScript
- 14 API Routes REST (courses, students, teams, sprints, stories, messages, alerts)
- 72 componentes React copiados
- Neon PostgreSQL configurado
- Estilos completos
- Pronto para deploy no Vercel"
```

### 2.4 Criar Repositório no GitHub

1. **Ir para:** https://github.com/new

2. **Preencher:**
   - **Repository name:** `myforscrum-vercel`
   - **Description:** `Plataforma de Ensino Scrum - Next.js + Vercel + Neon PostgreSQL`
   - **Visibility:** 
     - ✅ **Public** (se quiser partilhar)
     - ✅ **Private** (se quiser manter privado)
   - **❌ NÃO** marcar "Add a README file"
   - **❌ NÃO** marcar "Add .gitignore"
   - **❌ NÃO** marcar "Choose a license"

3. **Clicar em:** `Create repository`

### 2.5 Conectar Repositório Local ao GitHub

**Copiar o comando do GitHub** (aparece depois de criar o repo):

```bash
# Substitua SEU_USERNAME pelo seu username do GitHub
git remote add origin https://github.com/SEU_USERNAME/myforscrum-vercel.git

# Verificar remote
git remote -v
```

**Deve mostrar:**
```
origin  https://github.com/SEU_USERNAME/myforscrum-vercel.git (fetch)
origin  https://github.com/SEU_USERNAME/myforscrum-vercel.git (push)
```

### 2.6 Fazer Push para o GitHub

```bash
# Renomear branch para 'main' (se necessário)
git branch -M main

# Fazer push
git push -u origin main
```

**Se pedir autenticação:**
- Username: `seu_username_github`
- Password: `seu_personal_access_token` (NÃO é a password normal!)

**Para criar Personal Access Token:**
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token
3. Marcar: `repo` (acesso completo)
4. Copiar o token e usar como password

### 2.7 Verificar no GitHub

1. Ir para: `https://github.com/SEU_USERNAME/myforscrum-vercel`
2. Deve ver todos os arquivos do projeto ✅

---

## 🗄️ PARTE 3: Configurar Neon Database

### 3.1 Criar Conta no Neon

1. Ir para: https://console.neon.tech
2. Clicar em **"Sign Up"**
3. Fazer login com GitHub (recomendado) ou email

### 3.2 Criar Projeto

1. Clicar em **"Create Project"**
2. Preencher:
   - **Project name:** `forscrum-db`
   - **Database name:** `forscrum` (ou deixar padrão)
   - **Region:** Escolher mais próximo (ex: `Frankfurt` para Europa)
3. Clicar em **"Create Project"**

### 3.3 Copiar Connection String

Após criar, vai aparecer a **Connection String**:

```
postgresql://username:password@ep-xxx-xxx.eu-central-1.aws.neon.tech/forscrum?sslmode=require
```

**✅ COPIAR ESTA STRING COMPLETA!**

### 3.4 Executar Schema SQL

1. No Neon Console, ir para **"SQL Editor"** (menu lateral)
2. Abrir o arquivo `schema.sql` do projeto
3. Copiar TODO o conteúdo
4. Colar no SQL Editor do Neon
5. Clicar em **"Run"**

**Deve ver:**
```
✅ CREATE TABLE
✅ CREATE INDEX
✅ CREATE FUNCTION
✅ CREATE TRIGGER
```

### 3.5 Verificar Tabela Criada

No SQL Editor, executar:

```sql
SELECT * FROM kv_store;
```

**Deve retornar:** 0 linhas (tabela vazia mas criada com sucesso)

---

## 🚀 PARTE 4: Deploy no Vercel

### 4.1 Criar Conta no Vercel

1. Ir para: https://vercel.com/signup
2. Clicar em **"Continue with GitHub"**
3. Autorizar Vercel a aceder ao GitHub

### 4.2 Importar Projeto

1. No Vercel Dashboard, clicar em **"Add New..."** → **"Project"**
2. Encontrar `myforscrum-vercel` na lista
3. Clicar em **"Import"**

### 4.3 Configurar Projeto

**Framework Preset:**
- Deve detectar automaticamente: **Next.js** ✅

**Root Directory:**
- Deixar: `./` (raiz do projeto)

**Build and Output Settings:**
- Build Command: `npm run build` (já preenchido)
- Output Directory: `.next` (já preenchido)
- Install Command: `npm install` (já preenchido)

### 4.4 Adicionar Variável de Ambiente

**MUITO IMPORTANTE!**

1. Expandir **"Environment Variables"**
2. Adicionar:
   - **Name:** `DATABASE_URL`
   - **Value:** Colar a Connection String do Neon (copiada no passo 3.3)
   - **Environments:** Marcar TODAS (Production, Preview, Development)

**Exemplo:**
```
DATABASE_URL = postgresql://username:password@ep-xxx.eu-central-1.aws.neon.tech/forscrum?sslmode=require
```

3. Clicar em **"Add"**

### 4.5 Fazer Deploy

1. Clicar em **"Deploy"**
2. Aguardar 2-3 minutos
3. Deploy em progresso... ⏳

**Vai ver:**
```
Running "npm install"...
Running "npm run build"...
Uploading build outputs...
✓ Deployment Complete!
```

### 4.6 Obter URL de Produção

Após deploy completo:

```
🎉 https://myforscrum-vercel.vercel.app
```

**Copiar esta URL!**

---

## 🧪 PARTE 5: Testar a Aplicação

### 5.1 Testar Frontend

1. Abrir: `https://SEU_APP.vercel.app`
2. Deve ver a **tela de login** do forScrum ✅
3. Testar escrever "Formador" e clicar em "Entrar"

### 5.2 Testar API

```bash
# Testar endpoint de cursos
curl https://SEU_APP.vercel.app/api/courses
```

**Resposta esperada:**
```json
{"success":true,"courses":[]}
```

### 5.3 Criar Curso de Teste

```bash
curl -X POST https://SEU_APP.vercel.app/api/courses \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Curso de Teste",
    "description": "Primeiro curso criado",
    "startDate": "06/05/2026",
    "endDate": "30/12/2026"
  }'
```

**Resposta esperada:**
```json
{
  "success": true,
  "course": {
    "id": "1746443521234",
    "name": "Curso de Teste",
    "description": "Primeiro curso criado",
    ...
  }
}
```

### 5.4 Verificar no Neon

1. Voltar ao Neon Console → SQL Editor
2. Executar:

```sql
SELECT * FROM kv_store;
```

**Deve mostrar:** 1 linha com o curso criado! ✅

---

## ✅ PARTE 6: Configurações Adicionais (Opcional)

### 6.1 Domínio Personalizado

Se tiver um domínio (ex: `meuforscrum.com`):

1. Vercel → Project Settings → Domains
2. Add Domain
3. Seguir instruções para configurar DNS

### 6.2 Environment Variables Adicionais

Adicionar em Vercel → Settings → Environment Variables:

```
NEXT_PUBLIC_APP_NAME=forScrum
NEXT_PUBLIC_APP_VERSION=1.0.0
```

### 6.3 Habilitar Analytics

1. Vercel → Project → Analytics
2. Enable Vercel Analytics
3. Enable Speed Insights

---

## 🔄 PARTE 7: Fazer Mudanças Futuras

### 7.1 Fazer Alterações no Código

```bash
cd /workspaces/default/code/myforscrum-vercel

# Editar arquivos...
# Exemplo: editar app/page.tsx

# Ver o que mudou
git status

# Adicionar mudanças
git add .

# Commit
git commit -m "Descrição da mudança"

# Push para GitHub
git push
```

### 7.2 Deploy Automático

O Vercel faz **deploy automático** sempre que fizer `git push`!

**Fluxo:**
1. `git push` → GitHub
2. GitHub notifica Vercel
3. Vercel faz build e deploy automático
4. ~2 minutos depois: nova versão no ar ✅

---

## 📊 Resumo dos URLs Importantes

| Serviço | URL |
|---------|-----|
| **GitHub Repo** | `https://github.com/SEU_USERNAME/myforscrum-vercel` |
| **Vercel Dashboard** | `https://vercel.com/dashboard` |
| **Neon Console** | `https://console.neon.tech` |
| **App em Produção** | `https://myforscrum-vercel.vercel.app` |

---

## 🆘 Resolução de Problemas

### Problema: "Build failed"

**Solução:**
1. Verificar logs no Vercel
2. Testar build localmente: `npm run build`
3. Corrigir erros TypeScript
4. Fazer commit e push novamente

### Problema: "Cannot connect to database"

**Solução:**
1. Verificar que `DATABASE_URL` está configurada no Vercel
2. Verificar que Connection String está correta
3. Verificar que tem `?sslmode=require` no final

### Problema: "API retorna 500"

**Solução:**
1. Verificar logs no Vercel → Deployments → Logs
2. Verificar que `schema.sql` foi executado no Neon
3. Testar API localmente primeiro

---

## ✅ Checklist Final

- [ ] ✅ Projeto no GitHub
- [ ] ✅ Database criada no Neon
- [ ] ✅ `schema.sql` executado
- [ ] ✅ Deploy no Vercel
- [ ] ✅ `DATABASE_URL` configurada
- [ ] ✅ App acessível online
- [ ] ✅ API funcionando
- [ ] ✅ Teste criando um curso

---

## 🎉 Parabéns!

Seu **forScrum** está agora:

✅ No GitHub (versionado)  
✅ No Vercel (hospedado)  
✅ Com Neon PostgreSQL (base de dados)  
✅ Deploy automático configurado  
✅ Pronto para usar!  

**URL da sua app:** `https://myforscrum-vercel.vercel.app`

---

**Criado por:** forScrum Team  
**Data:** 05/05/2026  
**Versão:** 1.0.0
