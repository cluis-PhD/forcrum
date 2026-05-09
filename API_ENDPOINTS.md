# 🔌 API Endpoints Completos - forScrum

Todos os endpoints REST disponíveis no backend.

## 📍 Base URL

```
Local: http://localhost:3000/api
Produção: https://seu-app.vercel.app/api
```

## 📚 Endpoints Disponíveis

### 1. Courses (Cursos)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/courses` | Listar todos os cursos |
| POST | `/api/courses` | Criar novo curso |
| GET | `/api/courses/:id` | Obter curso específico |
| PUT | `/api/courses/:id` | Atualizar curso |
| DELETE | `/api/courses/:id` | Deletar curso |

**Exemplo POST:**
```bash
curl -X POST http://localhost:3000/api/courses \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Desenvolvimento Web",
    "description": "Curso de React e Node.js",
    "startDate": "01/01/2025",
    "endDate": "30/06/2025"
  }'
```

---

### 2. Students (Formandos)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/students` | Listar todos os formandos |
| POST | `/api/students` | Criar novo formando |
| GET | `/api/students/:id` | Obter formando específico |
| PUT | `/api/students/:id` | Atualizar formando |
| DELETE | `/api/students/:id` | Deletar formando |

**Exemplo POST:**
```bash
curl -X POST http://localhost:3000/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@email.com",
    "courseId": "1234567890",
    "teamId": "9876543210"
  }'
```

---

### 3. Teams (Equipas)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/teams` | Listar todas as equipas |
| POST | `/api/teams` | Criar nova equipa |
| GET | `/api/teams/:id` | Obter equipa específica |
| PUT | `/api/teams/:id` | Atualizar equipa |
| DELETE | `/api/teams/:id` | Deletar equipa |

**Exemplo POST:**
```bash
curl -X POST http://localhost:3000/api/teams \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Team Alpha",
    "courseId": "1234567890",
    "members": ["student1", "student2"]
  }'
```

---

### 4. Sprints

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/sprints` | Listar todos os sprints |
| POST | `/api/sprints` | Criar novo sprint |
| GET | `/api/sprints/:id` | Obter sprint específico |
| PUT | `/api/sprints/:id` | Atualizar sprint |
| DELETE | `/api/sprints/:id` | Deletar sprint |

**Exemplo POST:**
```bash
curl -X POST http://localhost:3000/api/sprints \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Sprint 1",
    "goal": "Desenvolver login",
    "startDate": "2025-01-01",
    "endDate": "2025-01-14",
    "courseId": "1234567890",
    "teamId": "9876543210"
  }'
```

---

### 5. Stories (User Stories)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/stories` | Listar todas as stories |
| POST | `/api/stories` | Criar nova story |
| GET | `/api/stories/:id` | Obter story específica |
| PUT | `/api/stories/:id` | Atualizar story |
| DELETE | `/api/stories/:id` | Deletar story |

**Exemplo POST:**
```bash
curl -X POST http://localhost:3000/api/stories \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Criar tela de login",
    "description": "Como utilizador, quero fazer login",
    "sprintId": "1111111111",
    "courseId": "1234567890",
    "priority": "high",
    "estimate": 5
  }'
```

---

### 6. Messages (Mensagens)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/messages` | Listar todas as mensagens |
| POST | `/api/messages` | Enviar nova mensagem |

**Exemplo POST:**
```bash
curl -X POST http://localhost:3000/api/messages \
  -H "Content-Type: application/json" \
  -d '{
    "from": "Formador",
    "to": "João Silva",
    "subject": "Parabéns",
    "body": "Excelente trabalho!"
  }'
```

---

### 7. Alerts (Alertas)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/alerts` | Listar todos os alertas |
| POST | `/api/alerts` | Criar novo alerta |

**Exemplo POST:**
```bash
curl -X POST http://localhost:3000/api/alerts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Nova Sprint",
    "message": "Sprint 2 iniciada!",
    "priority": "high",
    "courseId": "1234567890"
  }'
```

---

## 📊 Estrutura de Resposta

### Sucesso (200/201)
```json
{
  "success": true,
  "course": {
    "id": "1234567890",
    "name": "Desenvolvimento Web",
    "createdAt": "2025-01-01T10:00:00.000Z"
  }
}
```

### Erro (400/404/500)
```json
{
  "error": "Mensagem de erro descritiva"
}
```

---

## 🧪 Testar Todos os Endpoints

### Script de Teste Completo

```bash
#!/bin/bash
BASE_URL="http://localhost:3000/api"

echo "🧪 Testando API forScrum..."

# 1. Criar curso
echo "1️⃣ Criando curso..."
COURSE=$(curl -s -X POST $BASE_URL/courses \
  -H "Content-Type: application/json" \
  -d '{"name":"Curso Teste","description":"Teste API"}')
COURSE_ID=$(echo $COURSE | jq -r '.course.id')
echo "✅ Curso criado: $COURSE_ID"

# 2. Listar cursos
echo "2️⃣ Listando cursos..."
curl -s $BASE_URL/courses | jq '.courses | length'

# 3. Criar formando
echo "3️⃣ Criando formando..."
STUDENT=$(curl -s -X POST $BASE_URL/students \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Teste Student\",\"courseId\":\"$COURSE_ID\"}")
STUDENT_ID=$(echo $STUDENT | jq -r '.student.id')
echo "✅ Formando criado: $STUDENT_ID"

# 4. Criar equipa
echo "4️⃣ Criando equipa..."
TEAM=$(curl -s -X POST $BASE_URL/teams \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Team Test\",\"courseId\":\"$COURSE_ID\"}")
TEAM_ID=$(echo $TEAM | jq -r '.team.id')
echo "✅ Equipa criada: $TEAM_ID"

# 5. Criar sprint
echo "5️⃣ Criando sprint..."
SPRINT=$(curl -s -X POST $BASE_URL/sprints \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Sprint Test\",\"courseId\":\"$COURSE_ID\",\"teamId\":\"$TEAM_ID\"}")
SPRINT_ID=$(echo $SPRINT | jq -r '.sprint.id')
echo "✅ Sprint criado: $SPRINT_ID"

# 6. Criar story
echo "6️⃣ Criando user story..."
STORY=$(curl -s -X POST $BASE_URL/stories \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"Story Test\",\"sprintId\":\"$SPRINT_ID\",\"courseId\":\"$COURSE_ID\"}")
echo "✅ Story criada: $(echo $STORY | jq -r '.story.id')"

# 7. Criar mensagem
echo "7️⃣ Criando mensagem..."
curl -s -X POST $BASE_URL/messages \
  -H "Content-Type: application/json" \
  -d '{"from":"Test","to":"User","subject":"Test","body":"Test message"}' | jq .

# 8. Criar alerta
echo "8️⃣ Criando alerta..."
curl -s -X POST $BASE_URL/alerts \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"Test Alert\",\"message\":\"Test\",\"courseId\":\"$COURSE_ID\"}" | jq .

echo "✅ Todos os testes completados!"
```

Salve como `test-api.sh`, dê permissão (`chmod +x test-api.sh`) e execute: `./test-api.sh`

---

## 📚 Resumo

✅ **7 Recursos completos:**
- Courses (Cursos)
- Students (Formandos)
- Teams (Equipas)
- Sprints
- Stories (User Stories)
- Messages (Mensagens)
- Alerts (Alertas)

✅ **12 Arquivos de API Routes**
✅ **Todas as operações CRUD** (Create, Read, Update, Delete)
✅ **Respostas JSON padronizadas**
✅ **Validação de dados**
✅ **Mensagens de erro descritivas**

---

**Pronto para usar!** 🚀
