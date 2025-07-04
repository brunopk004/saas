import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
  Button,
  LinearProgress,
  Chip,
  Avatar,
  IconButton,
} from '@mui/material';
import {
  FitnessCenter,
  Restaurant,
  TrendingUp,
  Timer,
  LocalFireDepartment,
  Add,
  PlayArrow,
  CheckCircle,
} from '@mui/icons-material';
import Head from 'next/head';
import Layout from '../components/layout';
import { withAuth } from '../lib/auth';

const AthleteeDashboard = () => {
  const [athleteData, setAthleteData] = useState(null);
  const [todayWorkout, setTodayWorkout] = useState(null);
  const [activeDiet, setActiveDiet] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Carregar dados do atleta
      const athleteResponse = await fetch('/api/v1/athlete/profile');
      if (athleteResponse.ok) {
        const athleteResult = await athleteResponse.json();
        setAthleteData(athleteResult.athlete);
      }

      // Carregar treino de hoje (simulado)
      const workoutsResponse = await fetch('/api/v1/athlete/workouts?limit=1');
      if (workoutsResponse.ok) {
        const workoutsResult = await workoutsResponse.json();
        if (workoutsResult.workouts?.length > 0) {
          setTodayWorkout(workoutsResult.workouts[0]);
        }
      }

      // Carregar dieta ativa
      const dietsResponse = await fetch('/api/v1/athlete/diets?isActive=true');
      if (dietsResponse.ok) {
        const dietsResult = await dietsResponse.json();
        if (dietsResult.diets?.length > 0) {
          setActiveDiet(dietsResult.diets[0]);
        }
      }

      // Carregar progresso
      const progressResponse = await fetch('/api/v1/athlete/progress');
      if (progressResponse.ok) {
        const progressResult = await progressResponse.json();
        setProgress(progressResult.progress);
      }

      setLoading(false);
    } catch (error) {
      console.error('Erro ao carregar dados do dashboard:', error);
      setLoading(false);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  const StatCard = ({ title, value, icon, color = 'primary', subtitle = '' }) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography color="textSecondary" gutterBottom variant="body2">
              {title}
            </Typography>
            <Typography variant="h4" component="div">
              {value}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="textSecondary">
                {subtitle}
              </Typography>
            )}
          </Box>
          <Avatar sx={{ bgcolor: `${color}.main`, width: 56, height: 56 }}>
            {icon}
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <Layout>
        <Container maxWidth="lg">
          <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
            <LinearProgress sx={{ width: '50%' }} />
          </Box>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>Dashboard do Atleta - FitTracker Pro</title>
        <meta name="description" content="Seu dashboard pessoal para acompanhar treinos, dieta e progresso" />
      </Head>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {/* Header */}
        <Box mb={4}>
          <Typography variant="h3" component="h1" gutterBottom>
            {getGreeting()}, {athleteData?.personalInfo?.name || 'Atleta'}! 👋
          </Typography>
          <Typography variant="h6" color="textSecondary">
            Vamos conquistar seus objetivos hoje!
          </Typography>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Sequência de Treinos"
              value={`${progress?.streaks?.workout?.current || 0} dias`}
              icon={<FitnessCenter />}
              color="primary"
              subtitle={`Recorde: ${progress?.streaks?.workout?.longest || 0} dias`}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Calorias Queimadas"
              value={progress?.statistics?.totalCaloriesBurned || 0}
              icon={<LocalFireDepartment />}
              color="error"
              subtitle="Total até agora"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Treinos Completos"
              value={progress?.statistics?.totalWorkouts || 0}
              icon={<CheckCircle />}
              color="success"
              subtitle="Total realizados"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Tempo de Treino"
              value={`${Math.round((progress?.statistics?.averageWorkoutDuration || 0))} min`}
              icon={<Timer />}
              color="info"
              subtitle="Média por treino"
            />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          {/* Treino de Hoje */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="between" mb={2}>
                  <Typography variant="h6" component="h2">
                    Treino de Hoje
                  </Typography>
                  <IconButton color="primary" size="small">
                    <Add />
                  </IconButton>
                </Box>
                
                {todayWorkout ? (
                  <Box>
                    <Typography variant="h5" gutterBottom>
                      {todayWorkout.name}
                    </Typography>
                    <Box display="flex" gap={1} mb={2}>
                      <Chip
                        label={todayWorkout.type}
                        size="small"
                        variant="outlined"
                      />
                      <Chip
                        label={`${todayWorkout.duration} min`}
                        size="small"
                        variant="outlined"
                      />
                      <Chip
                        label={todayWorkout.difficulty}
                        size="small"
                        color={
                          todayWorkout.difficulty === 'beginner' ? 'success' :
                          todayWorkout.difficulty === 'intermediate' ? 'warning' : 'error'
                        }
                      />
                    </Box>
                    <Typography variant="body2" color="textSecondary" mb={2}>
                      {todayWorkout.description}
                    </Typography>
                    <Button
                      variant="contained"
                      startIcon={<PlayArrow />}
                      fullWidth
                      size="large"
                    >
                      Iniciar Treino
                    </Button>
                  </Box>
                ) : (
                  <Box textAlign="center" py={4}>
                    <Typography variant="body1" color="textSecondary" mb={2}>
                      Nenhum treino programado para hoje
                    </Typography>
                    <Button variant="outlined" startIcon={<Add />}>
                      Criar Treino
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Dieta Ativa */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="between" mb={2}>
                  <Typography variant="h6" component="h2">
                    Plano Alimentar
                  </Typography>
                  <IconButton color="primary" size="small">
                    <Restaurant />
                  </IconButton>
                </Box>
                
                {activeDiet ? (
                  <Box>
                    <Typography variant="h5" gutterBottom>
                      {activeDiet.name}
                    </Typography>
                    <Box display="flex" gap={1} mb={2}>
                      <Chip
                        label={activeDiet.type}
                        size="small"
                        variant="outlined"
                        color="primary"
                      />
                      <Chip
                        label={`${activeDiet.dailyCalorieTarget} cal/dia`}
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                    
                    {/* Macros Progress */}
                    <Box mb={2}>
                      <Typography variant="body2" gutterBottom>
                        Metas Diárias de Macronutrientes
                      </Typography>
                      <Box mb={1}>
                        <Typography variant="caption">
                          Proteína: {activeDiet.macroTargets?.protein || 0}g
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={75}
                          sx={{ height: 6, borderRadius: 3 }}
                        />
                      </Box>
                      <Box mb={1}>
                        <Typography variant="caption">
                          Carboidratos: {activeDiet.macroTargets?.carbs || 0}g
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={60}
                          sx={{ height: 6, borderRadius: 3 }}
                          color="warning"
                        />
                      </Box>
                      <Box>
                        <Typography variant="caption">
                          Gorduras: {activeDiet.macroTargets?.fat || 0}g
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={80}
                          sx={{ height: 6, borderRadius: 3 }}
                          color="error"
                        />
                      </Box>
                    </Box>
                    
                    <Button variant="outlined" fullWidth>
                      Ver Plano Completo
                    </Button>
                  </Box>
                ) : (
                  <Box textAlign="center" py={4}>
                    <Typography variant="body1" color="textSecondary" mb={2}>
                      Nenhuma dieta ativa
                    </Typography>
                    <Button variant="outlined" startIcon={<Add />}>
                      Criar Plano Alimentar
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Progresso Recente */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="between" mb={2}>
                  <Typography variant="h6" component="h2">
                    Progresso Recente
                  </Typography>
                  <IconButton color="primary" size="small">
                    <TrendingUp />
                  </IconButton>
                </Box>
                
                {progress?.bodyMeasurements?.length > 0 ? (
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={3}>
                      <Paper sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="h4" color="primary">
                          {progress.bodyMeasurements[progress.bodyMeasurements.length - 1]?.weight || 0}kg
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Peso Atual
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Paper sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="h4" color="primary">
                          {athleteData?.metrics?.bmi?.toFixed(1) || 0}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          IMC
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Paper sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="h4" color="primary">
                          {progress.bodyMeasurements[progress.bodyMeasurements.length - 1]?.bodyFatPercentage || 0}%
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Gordura Corporal
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Paper sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="h4" color="primary">
                          {progress.statistics?.weeklyWorkoutFrequency || 0}x
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Treinos/Semana
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                ) : (
                  <Box textAlign="center" py={4}>
                    <Typography variant="body1" color="textSecondary" mb={2}>
                      Registre suas medições para acompanhar o progresso
                    </Typography>
                    <Button variant="outlined" startIcon={<Add />}>
                      Adicionar Medições
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default withAuth(AthleteeDashboard);