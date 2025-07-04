# 🚀 Guia Rápido - FitTracker Pro

## Início Rápido em 5 Minutos

### 1. Pré-requisitos
Certifique-se de ter instalado:
- **Node.js** 18+ ([Download](https://nodejs.org/))
- **Yarn** 1.22+ (`npm install -g yarn`)
- **MongoDB** 4.4+ ([Download](https://www.mongodb.com/try/download/community))

### 2. Configuração Básica

```bash
# 1. Clone o projeto (se necessário)
git clone [seu-repositorio]
cd saas

# 2. Configure as variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com suas configurações

# 3. Inicie o MongoDB (se local)
mongod

# 4. Execute o projeto
./start-dev.sh
```

### 3. Acesse a Aplicação

- 🌐 **Frontend**: http://localhost:3000
- 🔧 **API**: http://localhost:8000
- 📊 **MongoDB**: localhost:27017

## 📝 Configuração Mínima (.env)

Para desenvolvimento local, configure pelo menos:

```env
# MongoDB local
MONGO_URL=mongodb://localhost:27017/fittracker-pro

# Chave de sessão (qualquer string longa)
SESSION_SECRET=minha_chave_super_secreta_de_desenvolvimento_123456789

# Google OAuth (opcional para desenvolvimento)
GOOGLE_CLIENTID=seu_google_client_id
GOOGLE_CLIENTSECRET=seu_google_client_secret
```

## 🎯 Próximos Passos

### 1. **Configurar Autenticação Google** (Recomendado)
- Acesse [Google Console](https://console.developers.google.com)
- Crie um projeto e configure OAuth2
- Adicione `http://localhost:3000/auth/google/callback` como redirect URI

### 2. **Configurar Pagamentos Stripe** (Para testes)
- Crie conta em [Stripe](https://dashboard.stripe.com)
- Use as chaves de teste no arquivo `.env`

### 3. **Configurar AWS** (Para fotos de progresso)
- Crie bucket S3 para upload de imagens
- Configure SES para envio de emails

## 🧪 Dados de Teste

### Usuário de Exemplo
Após configurar o Google OAuth, faça login e configure um perfil de atleta:

```json
{
  "personalInfo": {
    "age": 28,
    "height": 175,
    "currentWeight": 70,
    "targetWeight": 75,
    "gender": "male",
    "activityLevel": "moderate",
    "fitnessGoals": ["muscle_gain", "strength"]
  },
  "preferences": {
    "workoutTypes": ["strength_training", "cardio"],
    "workoutDuration": 60,
    "workoutFrequency": 4,
    "equipmentAvailable": ["dumbbells", "gym_access"]
  }
}
```

### Treino de Exemplo
```json
{
  "name": "Treino Upper Body",
  "type": "strength_training",
  "difficulty": "intermediate",
  "duration": 60,
  "exercises": [
    {
      "name": "Supino",
      "category": "strength",
      "muscleGroups": ["chest"],
      "sets": 4,
      "reps": 10,
      "equipment": ["barbell"]
    },
    {
      "name": "Remada",
      "category": "strength", 
      "muscleGroups": ["back"],
      "sets": 4,
      "reps": 12,
      "equipment": ["dumbbells"]
    }
  ]
}
```

## 🔧 Comandos Úteis

```bash
# Instalar dependências
cd api && yarn install
cd app && yarn install

# Desenvolvimento
cd api && yarn dev      # API na porta 8000
cd app && yarn dev      # App na porta 3000

# Build para produção
cd api && yarn build && yarn start
cd app && yarn build && yarn start

# Testes
cd api && yarn test

# Linting
cd api && yarn lint
cd app && yarn lint
```

## 📱 Funcionalidades Principais

### ✅ Implementadas
- [x] **Perfil do Atleta** - Configuração completa
- [x] **Dashboard** - Visão geral e estatísticas
- [x] **Treinos** - CRUD completo com exercícios
- [x] **Dieta** - Planos alimentares e macros
- [x] **Progresso** - Logs, medições e metas
- [x] **Autenticação** - Google OAuth
- [x] **API REST** - Endpoints completos

### 🚧 Em Desenvolvimento
- [ ] Interface para criação de treinos
- [ ] Interface para planos alimentares
- [ ] Gráficos de progresso
- [ ] Sistema de notificações
- [ ] Upload de fotos de progresso

### 🎯 Próximas Features
- [ ] Recomendações por IA
- [ ] Integração com wearables
- [ ] Apps móveis nativos
- [ ] Comunidade de atletas

## 📚 Documentação Completa

Para documentação detalhada, consulte:
- [README Principal](./FitTracker-Pro-README.md)
- [Documentação da API](./api/docs/)
- [Guia de Contribuição](./CONTRIBUTING.md)

## 🆘 Problemas Comuns

### MongoDB não conecta
```bash
# Verificar se o MongoDB está rodando
sudo systemctl status mongod  # Linux
brew services list | grep mongo  # macOS

# Iniciar MongoDB
sudo systemctl start mongod  # Linux
brew services start mongodb/brew/mongodb-community  # macOS
```

### Erro de porta em uso
```bash
# Verificar processos nas portas
lsof -i :3000  # Frontend
lsof -i :8000  # API

# Matar processo
kill -9 <PID>
```

### Dependências não instalam
```bash
# Limpar cache e reinstalar
rm -rf node_modules yarn.lock
yarn install
```

## 💬 Suporte

- 📧 Email: suporte@fittrackerpro.com
- 💬 Discord: [FitTracker Community]
- 📖 Wiki: [GitHub Wiki]
- 🐛 Issues: [GitHub Issues]

---

**Desenvolvido com ❤️ para atletas amadores brasileiros!** 🇧🇷