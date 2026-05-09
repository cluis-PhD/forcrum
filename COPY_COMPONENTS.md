# 📋 Guia: Como Copiar Componentes do Projeto Original

Este documento explica como copiar todos os componentes, contextos e assets do projeto original para o novo projeto Vercel.

## 🎯 O Que Copiar

### 1. Componentes React

```bash
# Copiar todos os componentes
cp -r /workspaces/default/code/src/app/components /workspaces/default/code/myforscrum-vercel/app/

# Resultado: myforscrum-vercel/app/components/
#   ├── FormadorDashboard.tsx
#   ├── FormandoDashboard.tsx
#   ├── SprintBoard.tsx
#   ├── CourseManagement.tsx
#   ├── ... (todos os outros componentes)
#   ├── shared/
#   │   ├── Header.tsx
#   │   ├── BottomNav.tsx
#   └── ui/
#       ├── button.tsx
#       ├── dialog.tsx
#       └── ... (componentes UI)
```

### 2. Contexto (AppContext)

```bash
# Copiar contexto
cp -r /workspaces/default/code/src/app/context /workspaces/default/code/myforscrum-vercel/app/

# Resultado: myforscrum-vercel/app/context/AppContext.tsx
```

### 3. Assets (SVGs e Imagens)

```bash
# Copiar imports (SVGs)
cp -r /workspaces/default/code/src/app/imports /workspaces/default/code/myforscrum-vercel/app/

# Resultado: myforscrum-vercel/app/imports/
#   └── svg-*.ts (arquivos SVG)
```

### 4. Utilitários

```bash
# Copiar utilitários (opcional - alguns podem não ser necessários)
cp -r /workspaces/default/code/src/app/utils /workspaces/default/code/myforscrum-vercel/app/

# ATENÇÃO: Depois terá que atualizar imports de API!
```

## 🔧 Atualizar Imports

Depois de copiar os componentes, precisa atualizar os imports:

### Antes (Projeto Original)
```typescript
import { fetchAPI } from '../utils/supabase/api';
import { AppProvider } from '../context/AppContext';
```

### Depois (Projeto Novo)
```typescript
import { fetchAPI } from '@/lib/api-client';
import { AppProvider } from '@/app/context/AppContext';
```

## 🤖 Script Automático

Crie um script para fazer todas as cópias:

```bash
#!/bin/bash
# copy-components.sh

ORIGINAL="/workspaces/default/code/src/app"
DEST="/workspaces/default/code/myforscrum-vercel/app"

echo "📦 Copiando componentes..."
cp -r "$ORIGINAL/components" "$DEST/"

echo "📦 Copiando contexto..."
cp -r "$ORIGINAL/context" "$DEST/"

echo "📦 Copiando imports (SVGs)..."
cp -r "$ORIGINAL/imports" "$DEST/"

echo "✅ Cópia concluída!"
echo ""
echo "⚠️  PRÓXIMO PASSO: Atualizar imports nos componentes"
echo "   De: '../utils/supabase/api'"
echo "   Para: '@/lib/api-client'"
```

Para executar:
```bash
chmod +x copy-components.sh
./copy-components.sh
```

## 🔍 Find & Replace nos Componentes

Depois de copiar, fazer find & replace:

### 1. Atualizar imports de API

```bash
# Substituir imports do Supabase pela nova API
find app/components -type f -name "*.tsx" -exec sed -i "s|from '../utils/supabase/api'|from '@/lib/api-client'|g" {} +
find app/components -type f -name "*.tsx" -exec sed -i "s|from '../../utils/supabase/api'|from '@/lib/api-client'|g" {} +
```

### 2. Atualizar imports de contexto

```bash
# Atualizar caminhos de contexto
find app/components -type f -name "*.tsx" -exec sed -i "s|from '../context/AppContext'|from '@/app/context/AppContext'|g" {} +
find app/components -type f -name "*.tsx" -exec sed -i "s|from '../../context/AppContext'|from '@/app/context/AppContext'|g" {} +
```

### 3. Atualizar imports de componentes

```bash
# Atualizar imports relativos para absolutos
find app/components -type f -name "*.tsx" -exec sed -i "s|from './|from '@/app/components/|g" {} +
```

## 📝 Criar API Client

O novo `lib/api-client.ts` já existe, mas precisa ter funções equivalentes:

```typescript
// lib/api-client.ts
const API_BASE = '/api';

export async function fetchAPI(endpoint: string, options?: RequestInit) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });
  return res.json();
}

// Funções compatíveis com o original
export const getCourses = () => fetchAPI('/courses');
export const createCourse = (data: any) =>
  fetchAPI('/courses', { method: 'POST', body: JSON.stringify(data) });
// ... etc
```

## ✅ Checklist Completo

- [ ] Copiar `components/` folder
- [ ] Copiar `context/` folder
- [ ] Copiar `imports/` folder (SVGs)
- [ ] Atualizar imports de API em todos os componentes
- [ ] Atualizar imports de contexto
- [ ] Atualizar imports relativos
- [ ] Testar compilação (`npm run dev`)
- [ ] Verificar se não há erros TypeScript
- [ ] Testar funcionalidades no browser

## 🧪 Testar Depois de Copiar

```bash
cd /workspaces/default/code/myforscrum-vercel
npm run dev
```

Abrir http://localhost:3000 e verificar:
- ✅ Página de login funciona
- ✅ Navegação funciona
- ✅ Componentes renderizam
- ✅ Chamadas API funcionam

## 🚨 Problemas Comuns

### Erro: "Module not found '@/lib/api-client'"

**Solução:** Verificar `tsconfig.json` tem paths configurados:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### Erro: "Cannot find module 'lucide-react'"

**Solução:** Instalar dependências em falta:
```bash
npm install lucide-react sonner date-fns react-dnd react-dnd-html5-backend
```

### Componentes não aparecem

**Solução:** Verificar que `app/page.tsx` importa e usa os componentes copiados.

---

**Sucesso!** Agora tem todos os componentes migrados para o novo projeto! 🎉
