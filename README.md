# 🎓 forScrum - Plataforma de Ensino Scrum

**Projeto criado em:** `/workspaces/default/code/myforscrum-vercel/`

Aplicação web completa para ensino e gestão de metodologia Scrum, desenvolvida com Next.js, Tailwind CSS e Neon PostgreSQL.

## 🚀 Stack Tecnológica

- **Frontend:** Next.js 15 + React 18 + TypeScript
- **Styling:** Tailwind CSS v4
- **Base de Dados:** Neon PostgreSQL (Serverless)
- **Hosting:** Vercel

## ⚡ Quick Start

### 1. Instalar Dependências

```bash
cd /workspaces/default/code/myforscrum-vercel
npm install
```

### 2. Configurar Neon Database

1. Criar conta em https://neon.tech
2. Criar novo projeto
3. Executar `schema.sql` no Neon SQL Editor
4. Copiar Connection String

### 3. Configurar Variáveis de Ambiente

```bash
echo "DATABASE_URL=postgresql://..." > .env.local
```

### 4. Rodar Localmente

```bash
npm run dev
```

Abra http://localhost:3000

## 📁 Estrutura

```
/workspaces/default/code/myforscrum-vercel/
├── app/              # Next.js App
│   ├── api/         # API Routes (Backend)
│   └── page.tsx     # Página de login
├── lib/
│   ├── db.ts        # Neon Database
│   └── api-client.ts # API Client
├── schema.sql       # Database schema
└── README.md        # Este arquivo
```

## 🌐 Deploy no Vercel

1. Push para GitHub
2. Importar projeto no Vercel
3. Configurar `DATABASE_URL`
4. Deploy!

## 📚 Documentação Completa

Todos os guias e documentação estão nesta pasta:
- **README.md** - Este arquivo
- **schema.sql** - Schema da base de dados
- **package.json** - Dependências do projeto

---

**forScrum** © 2025
