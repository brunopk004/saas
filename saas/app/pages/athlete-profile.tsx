import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  FormControlLabel,
  Checkbox,
  Alert,
  Stepper,
  Step,
  StepLabel,
  Paper,
} from '@mui/material';
import {
  Save,
  Person,
  FitnessCenter,
  Restaurant,
  TrendingUp,
} from '@mui/icons-material';
import Head from 'next/head';
import Layout from '../components/layout';
import { withAuth } from '../lib/auth';

const steps = ['Informações Pessoais', 'Objetivos e Preferências', 'Equipamentos e Restrições'];

const AthleteProfile = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    personalInfo: {
      age: '',
      height: '',
      currentWeight: '',
      targetWeight: '',
      gender: '',
      activityLevel: '',
      fitnessGoals: [],
      medicalConditions: [],
      injuries: [],
    },
    preferences: {
      workoutTypes: [],
      dietaryRestrictions: [],
      allergies: [],
      equipmentAvailable: [],
      workoutDuration: '',
      workoutFrequency: '',
    },
  });

  useEffect(() => {
    loadAthleteData();
  }, []);

  const loadAthleteData = async () => {
    try {
      const response = await fetch('/api/v1/athlete/profile');
      if (response.ok) {
        const result = await response.json();
        if (result.athlete) {
          setFormData({
            personalInfo: result.athlete.personalInfo || formData.personalInfo,
            preferences: result.athlete.preferences || formData.preferences,
          });
        }
      }
    } catch (error) {
      console.error('Erro ao carregar dados do atleta:', error);
    }
  };

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleArrayChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: typeof value === 'string' ? value.split(',') : value,
      },
    }));
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/v1/athlete/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        const result = await response.json();
        setError(result.error || 'Erro ao salvar perfil');
      }
    } catch (error) {
      setError('Erro de conexão');
    } finally {
      setLoading(false);
    }
  };

  const PersonalInfoStep = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Idade"
          type="number"
          value={formData.personalInfo.age}
          onChange={(e) => handleInputChange('personalInfo', 'age', e.target.value)}
          inputProps={{ min: 13, max: 100 }}
        />
      </Grid>
      
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>Gênero</InputLabel>
          <Select
            value={formData.personalInfo.gender}
            onChange={(e) => handleInputChange('personalInfo', 'gender', e.target.value)}
          >
            <MenuItem value="male">Masculino</MenuItem>
            <MenuItem value="female">Feminino</MenuItem>
            <MenuItem value="other">Outro</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Altura (cm)"
          type="number"
          value={formData.personalInfo.height}
          onChange={(e) => handleInputChange('personalInfo', 'height', e.target.value)}
          inputProps={{ min: 100, max: 250 }}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Peso Atual (kg)"
          type="number"
          value={formData.personalInfo.currentWeight}
          onChange={(e) => handleInputChange('personalInfo', 'currentWeight', e.target.value)}
          inputProps={{ min: 30, max: 300 }}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Peso Meta (kg)"
          type="number"
          value={formData.personalInfo.targetWeight}
          onChange={(e) => handleInputChange('personalInfo', 'targetWeight', e.target.value)}
          inputProps={{ min: 30, max: 300 }}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>Nível de Atividade</InputLabel>
          <Select
            value={formData.personalInfo.activityLevel}
            onChange={(e) => handleInputChange('personalInfo', 'activityLevel', e.target.value)}
          >
            <MenuItem value="sedentary">Sedentário</MenuItem>
            <MenuItem value="light">Levemente Ativo</MenuItem>
            <MenuItem value="moderate">Moderadamente Ativo</MenuItem>
            <MenuItem value="active">Ativo</MenuItem>
            <MenuItem value="very_active">Muito Ativo</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Condições Médicas (separadas por vírgula)"
          multiline
          rows={2}
          value={formData.personalInfo.medicalConditions.join(', ')}
          onChange={(e) => handleArrayChange('personalInfo', 'medicalConditions', e.target.value)}
          placeholder="Ex: diabetes, hipertensão, asma"
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Lesões ou Limitações (separadas por vírgula)"
          multiline
          rows={2}
          value={formData.personalInfo.injuries.join(', ')}
          onChange={(e) => handleArrayChange('personalInfo', 'injuries', e.target.value)}
          placeholder="Ex: lesão no joelho, dor nas costas"
        />
      </Grid>
    </Grid>
  );

  const GoalsPreferencesStep = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Objetivos de Fitness
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={1}>
          {[
            'weight_loss',
            'muscle_gain',
            'endurance',
            'strength',
            'flexibility',
            'general_fitness',
            'sports_performance',
            'rehabilitation'
          ].map((goal) => (
            <Chip
              key={goal}
              label={goal.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              clickable
              color={formData.personalInfo.fitnessGoals.includes(goal) ? 'primary' : 'default'}
              onClick={() => {
                const goals = formData.personalInfo.fitnessGoals.includes(goal)
                  ? formData.personalInfo.fitnessGoals.filter(g => g !== goal)
                  : [...formData.personalInfo.fitnessGoals, goal];
                handleInputChange('personalInfo', 'fitnessGoals', goals);
              }}
            />
          ))}
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Tipos de Treino Preferidos
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={1}>
          {[
            'cardio',
            'strength_training',
            'yoga',
            'pilates',
            'crossfit',
            'running',
            'cycling',
            'swimming',
            'martial_arts',
            'dance',
            'sports'
          ].map((type) => (
            <Chip
              key={type}
              label={type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              clickable
              color={formData.preferences.workoutTypes.includes(type) ? 'primary' : 'default'}
              onClick={() => {
                const types = formData.preferences.workoutTypes.includes(type)
                  ? formData.preferences.workoutTypes.filter(t => t !== type)
                  : [...formData.preferences.workoutTypes, type];
                handleInputChange('preferences', 'workoutTypes', types);
              }}
            />
          ))}
        </Box>
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Duração do Treino (minutos)"
          type="number"
          value={formData.preferences.workoutDuration}
          onChange={(e) => handleInputChange('preferences', 'workoutDuration', e.target.value)}
          inputProps={{ min: 15, max: 180 }}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Frequência Semanal de Treinos"
          type="number"
          value={formData.preferences.workoutFrequency}
          onChange={(e) => handleInputChange('preferences', 'workoutFrequency', e.target.value)}
          inputProps={{ min: 1, max: 7 }}
        />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Restrições Alimentares
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={1}>
          {[
            'vegetarian',
            'vegan',
            'keto',
            'paleo',
            'low_carb',
            'low_fat',
            'gluten_free',
            'dairy_free',
            'halal',
            'kosher'
          ].map((restriction) => (
            <Chip
              key={restriction}
              label={restriction.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              clickable
              color={formData.preferences.dietaryRestrictions.includes(restriction) ? 'secondary' : 'default'}
              onClick={() => {
                const restrictions = formData.preferences.dietaryRestrictions.includes(restriction)
                  ? formData.preferences.dietaryRestrictions.filter(r => r !== restriction)
                  : [...formData.preferences.dietaryRestrictions, restriction];
                handleInputChange('preferences', 'dietaryRestrictions', restrictions);
              }}
            />
          ))}
        </Box>
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Alergias Alimentares (separadas por vírgula)"
          multiline
          rows={2}
          value={formData.preferences.allergies.join(', ')}
          onChange={(e) => handleArrayChange('preferences', 'allergies', e.target.value)}
          placeholder="Ex: amendoim, mariscos, lactose"
        />
      </Grid>
    </Grid>
  );

  const EquipmentStep = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Equipamentos Disponíveis
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={1}>
          {[
            'dumbbells',
            'barbell',
            'resistance_bands',
            'yoga_mat',
            'treadmill',
            'stationary_bike',
            'pull_up_bar',
            'kettlebells',
            'gym_access',
            'none'
          ].map((equipment) => (
            <Chip
              key={equipment}
              label={equipment.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              clickable
              color={formData.preferences.equipmentAvailable.includes(equipment) ? 'primary' : 'default'}
              onClick={() => {
                const equipments = formData.preferences.equipmentAvailable.includes(equipment)
                  ? formData.preferences.equipmentAvailable.filter(e => e !== equipment)
                  : [...formData.preferences.equipmentAvailable, equipment];
                handleInputChange('preferences', 'equipmentAvailable', equipments);
              }}
            />
          ))}
        </Box>
      </Grid>
    </Grid>
  );

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <PersonalInfoStep />;
      case 1:
        return <GoalsPreferencesStep />;
      case 2:
        return <EquipmentStep />;
      default:
        return 'Passo desconhecido';
    }
  };

  return (
    <Layout>
      <Head>
        <title>Perfil do Atleta - FitTracker Pro</title>
        <meta name="description" content="Configure seu perfil para receber recomendações personalizadas" />
      </Head>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Configurar Perfil do Atleta
        </Typography>
        <Typography variant="h6" color="textSecondary" paragraph>
          Nos conte mais sobre você para personalizarmos sua experiência
        </Typography>

        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Perfil salvo com sucesso!
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Paper sx={{ p: 3 }}>
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box sx={{ mt: 3, mb: 3 }}>
            {getStepContent(activeStep)}
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Voltar
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={loading}
                startIcon={<Save />}
              >
                {loading ? 'Salvando...' : 'Salvar Perfil'}
              </Button>
            ) : (
              <Button variant="contained" onClick={handleNext}>
                Próximo
              </Button>
            )}
          </Box>
        </Paper>
      </Container>
    </Layout>
  );
};

export default withAuth(AthleteProfile);