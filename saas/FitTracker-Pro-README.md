# FitTracker Pro - SaaS para Atletas Amadores

## 🏋️‍♀️ Visão Geral

O **FitTracker Pro** é uma plataforma SaaS completa desenvolvida especificamente para atletas amadores que desejam acompanhar e otimizar seu desempenho físico. A plataforma oferece um ecossistema integrado para gestão de treinos, dieta, progresso e metas pessoais.

## 🎯 Funcionalidades Principais

### 1. **Perfil Completo do Atleta**
- Informações pessoais detalhadas (idade, altura, peso, gênero)
- Nível de atividade física atual
- Objetivos de fitness personalizados
- Histórico médico e lesões
- Preferências de treino e equipamentos disponíveis
- Restrições alimentares e alergias
- Cálculo automático de BMI e Taxa Metabólica Basal (TMB)

### 2. **Sistema de Treinos Inteligente**
- **Criação de treinos personalizados** com base no perfil do atleta
- **Biblioteca de exercícios** categorizada por:
  - Grupos musculares
  - Tipo de equipamento necessário
  - Nível de dificuldade
  - Duração e intensidade
- **Templates de treino** para diferentes objetivos:
  - Perda de peso
  - Ganho de massa muscular
  - Resistência cardiovascular
  - Força e potência
  - Flexibilidade e mobilidade
- **Acompanhamento de execução** com registro de:
  - Séries e repetições realizadas
  - Peso utilizado
  - Tempo de exercício
  - Avaliação do treino (1-5 estrelas)

### 3. **Plano Alimentar Personalizado**
- **Criação de dietas customizadas** baseadas em:
  - Objetivos do atleta
  - Restrições alimentares
  - Preferências pessoais
  - Cálculo calórico personalizado
- **Acompanhamento de macronutrientes**:
  - Proteínas, carboidratos e gorduras
  - Metas diárias personalizadas
  - Progresso visual em tempo real
- **Biblioteca de alimentos** com informações nutricionais completas
- **Planejamento de refeições** por horário do dia
- **Registro de consumo de água**

### 4. **Sistema de Progresso e Analytics**
- **Acompanhamento corporal**:
  - Peso e composição corporal
  - Medidas corporais (cintura, braços, pernas, etc.)
  - Percentual de gordura corporal
  - Fotos de progresso
- **Estatísticas de treino**:
  - Total de treinos realizados
  - Tempo total de exercício
  - Calorias queimadas
  - Frequência semanal de treinos
- **Sistema de streaks**:
  - Sequência de dias consecutivos de treino
  - Sequência de dias de alimentação saudável
  - Recordes pessoais
- **Relatórios mensais** com análise de progresso
- **Gráficos evolutivos** para visualizar tendências

### 5. **Sistema de Metas e Gamificação**
- **Definição de objetivos** SMART:
  - Perda/ganho de peso
  - Aumento de massa muscular
  - Redução de gordura corporal
  - Melhoria de força e resistência
- **Acompanhamento de metas** com indicadores visuais
- **Sistema de conquistas** e badges
- **Lembretes e motivação** personalizada

## 🛠️ Arquitetura Técnica

### Backend (API)
- **Node.js + Express.js** para servidor web
- **TypeScript** para tipagem forte
- **MongoDB + Mongoose** para banco de dados
- **Autenticação** via Google OAuth e Passwordless
- **Validação de dados** robusta
- **Logs estruturados** com Winston
- **Integração com Stripe** para pagamentos

### Frontend (Web App)
- **Next.js + React** para interface responsiva
- **Material-UI (MUI)** para componentes elegantes
- **TypeScript** para maior confiabilidade
- **Mobx** para gerenciamento de estado
- **Server-Side Rendering** para melhor performance
- **Design responsivo** para dispositivos móveis

### Modelos de Dados

#### 1. **Athlete Model**
```typescript
interface Athlete {
  userId: string;
  personalInfo: {
    age: number;
    height: number; // cm
    currentWeight: number; // kg
    targetWeight?: number; // kg
    gender: 'male' | 'female' | 'other';
    activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
    fitnessGoals: string[];
    medicalConditions?: string[];
    injuries?: string[];
  };
  preferences: {
    workoutTypes: string[];
    dietaryRestrictions?: string[];
    allergies?: string[];
    equipmentAvailable: string[];
    workoutDuration: number; // minutos
    workoutFrequency: number; // por semana
  };
  metrics: {
    bmi: number;
    bodyFatPercentage?: number;
    muscleMass?: number;
    basalMetabolicRate: number;
  };
}
```

#### 2. **Workout Model**
```typescript
interface Workout {
  userId: string;
  name: string;
  description?: string;
  type: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // minutos
  calories?: number;
  exercises: Exercise[];
  isTemplate: boolean;
  isCustom: boolean;
  tags: string[];
}
```

#### 3. **Diet Model**
```typescript
interface Diet {
  userId: string;
  name: string;
  type: string;
  dailyCalorieTarget: number;
  macroTargets: {
    protein: number; // gramas
    carbs: number; // gramas
    fat: number; // gramas
  };
  meals: Meal[];
  waterIntake?: number; // ml
  isTemplate: boolean;
  isActive: boolean;
}
```

#### 4. **Progress Model**
```typescript
interface Progress {
  userId: string;
  workoutLogs: WorkoutLog[];
  dietLogs: DietLog[];
  bodyMeasurements: BodyMeasurement[];
  goals: Goal[];
  streaks: {
    workout: StreakInfo;
    diet: StreakInfo;
  };
  statistics: Statistics;
}
```

## 📱 Páginas da Aplicação

### 1. **Dashboard Principal** (`/athlete-dashboard`)
- Visão geral das atividades do dia
- Cards com estatísticas principais
- Treino de hoje e plano alimentar ativo
- Progresso recente e metas
- Interface intuitiva e informativa

### 2. **Perfil do Atleta** (`/athlete-profile`)
- Formulário multi-step para configuração completa
- Validação em tempo real
- Interface guiada com stepper
- Persistência automática de dados

### 3. **Gestão de Treinos** (`/workouts`)
- Lista de treinos personalizados
- Criação e edição de treinos
- Biblioteca de exercícios
- Sistema de templates

### 4. **Gestão de Dieta** (`/diet`)
- Planos alimentares ativos e inativos
- Criação de refeições personalizadas
- Calculadora de macronutrientes
- Histórico alimentar

### 5. **Acompanhamento de Progresso** (`/progress`)
- Gráficos de evolução
- Registro de medições corporais
- Análise de tendências
- Relatórios personalizados

## 🚀 APIs Implementadas

### Athlete Profile Routes
```
POST   /api/v1/athlete/profile          # Criar/atualizar perfil
GET    /api/v1/athlete/profile          # Obter perfil do atleta
```

### Workout Routes
```
POST   /api/v1/athlete/workouts         # Criar treino
GET    /api/v1/athlete/workouts         # Listar treinos
GET    /api/v1/athlete/workouts/:id     # Obter treino específico
PUT    /api/v1/athlete/workouts/:id     # Atualizar treino
DELETE /api/v1/athlete/workouts/:id     # Deletar treino
```

### Diet Routes
```
POST   /api/v1/athlete/diets            # Criar plano alimentar
GET    /api/v1/athlete/diets            # Listar dietas
GET    /api/v1/athlete/diets/:id        # Obter dieta específica
PUT    /api/v1/athlete/diets/:id        # Atualizar dieta
PATCH  /api/v1/athlete/diets/:id/toggle-active # Ativar/desativar dieta
```

### Progress Routes
```
POST   /api/v1/athlete/progress/workout-log        # Registrar treino completado
POST   /api/v1/athlete/progress/diet-log           # Registrar log de dieta
POST   /api/v1/athlete/progress/body-measurement   # Registrar medições corporais
GET    /api/v1/athlete/progress                    # Obter progresso completo
POST   /api/v1/athlete/progress/goals              # Definir metas
```

## 🎨 Interface e UX

### Design System
- **Material Design 3** como base
- **Paleta de cores** inspirada em fitness e saúde
- **Tipografia** clara e legível (Roboto)
- **Iconografia** consistente (Material Icons)
- **Layout responsivo** para todas as telas
- **Micro-interações** para melhor feedback

### Experiência do Usuário
- **Onboarding intuitivo** com stepper guiado
- **Dashboard informativo** com dados relevantes
- **Navegação simples** e intuitiva
- **Feedback visual** para todas as ações
- **Loading states** e tratamento de erros
- **Acessibilidade** seguindo padrões WCAG

## 💡 Diferenciais Competitivos

### 1. **Personalização Avançada**
- Algoritmos que consideram perfil completo do usuário
- Recomendações baseadas em preferências e limitações
- Adaptação automática conforme progresso

### 2. **Integração Completa**
- Treinos e dieta trabalham em sinergia
- Cálculos automáticos de necessidades calóricas
- Ajustes baseados em objetivos e progresso

### 3. **Acompanhamento Científico**
- Fórmulas validadas para cálculos metabólicos
- Métricas baseadas em evidências científicas
- Progressão inteligente de cargas e intensidade

### 4. **Interface Moderna**
- Design clean e profissional
- Experiência mobile-first
- Performance otimizada

## 🔧 Configuração e Deploy

### Pré-requisitos
- Node.js 18.17.0+
- MongoDB 4.4+
- Yarn 1.22.19
- Conta AWS (para S3 e SES)
- Conta Stripe (para pagamentos)

### Instalação
```bash
# Clone o repositório
git clone [repository-url]

# Instale dependências da API
cd saas/api
yarn install

# Instale dependências do App
cd ../app
yarn install
```

### Variáveis de Ambiente
```env
# MongoDB
MONGO_URL=mongodb://localhost:27017/fittracker

# Authentication
GOOGLE_CLIENTID=your_google_client_id
GOOGLE_CLIENTSECRET=your_google_client_secret

# AWS
AWS_ACCESSKEYID=your_aws_access_key
AWS_SECRETACCESSKEY=your_aws_secret_key
AWS_REGION=us-east-1

# Stripe
STRIPE_TEST_SECRETKEY=your_stripe_secret_key
STRIPE_TEST_PUBLISHABLEKEY=your_stripe_publishable_key

# Session
SESSION_SECRET=your_session_secret
```

### Executar em Desenvolvimento
```bash
# API
cd saas/api
yarn dev

# App (em outro terminal)
cd saas/app
yarn dev
```

### Build para Produção
```bash
# API
cd saas/api
yarn build
yarn start

# App
cd saas/app
yarn build
yarn start
```

## 📊 Planos de Monetização

### Freemium Model
- **Plano Gratuito**: Funcionalidades básicas limitadas
- **Plano Pro**: Acesso completo e recursos avançados
- **Plano Premium**: Coaching personalizado e análises avançadas

### Recursos Premium
- Planos de treino personalizados por IA
- Consultas nutricionais
- Acompanhamento de personal trainer virtual
- Análises avançadas de progresso
- Integração com wearables
- Planos familiares

## 🚀 Roadmap Futuro

### Fase 2 - Inteligência Artificial
- [ ] Recomendações automáticas de treinos
- [ ] Ajustes dinâmicos de planos alimentares
- [ ] Predição de resultados baseada em dados históricos
- [ ] Chatbot para suporte e motivação

### Fase 3 - Integração IoT
- [ ] Sincronização com Apple Health e Google Fit
- [ ] Conexão com smartwatches e fitness trackers
- [ ] Monitoramento de sono e recovery
- [ ] Integração com balanças inteligentes

### Fase 4 - Comunidade
- [ ] Rede social de atletas
- [ ] Desafios e competições
- [ ] Sistema de mentoria
- [ ] Marketplace de produtos fitness

### Fase 5 - Mobile Apps
- [ ] App nativo iOS
- [ ] App nativo Android
- [ ] Modo offline
- [ ] Notificações push inteligentes

## 📞 Suporte e Contato

- **Email**: support@fittrackerpro.com
- **Documentação**: [docs.fittrackerpro.com]
- **Status**: [status.fittrackerpro.com]
- **Community**: [community.fittrackerpro.com]

---

**FitTracker Pro** - Transformando atletas amadores em versões melhores de si mesmos! 💪

*Desenvolvido com ❤️ para a comunidade fitness brasileira*