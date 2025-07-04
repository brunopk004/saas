import * as express from 'express';
import { Athlete } from '../models/Athlete';
import { Workout } from '../models/Workout';
import { Diet } from '../models/Diet';
import { Progress } from '../models/Progress';

const router = express.Router();

// ROTAS DO PERFIL DO ATLETA

// Criar/Atualizar perfil do atleta
router.post('/profile', async (req, res) => {
  try {
    const { userId } = req.user;
    const profileData = req.body;

    let athlete = await Athlete.findOne({ userId });
    
    if (athlete) {
      Object.assign(athlete, profileData);
      await athlete.save();
    } else {
      athlete = new Athlete({ userId, ...profileData });
      await athlete.save();
    }

    res.json({ athlete });
  } catch (error) {
    console.error('Erro ao salvar perfil do atleta:', error);
    res.status(400).json({ error: error.message });
  }
});

// Obter perfil do atleta
router.get('/profile', async (req, res) => {
  try {
    const { userId } = req.user;
    const athlete = await Athlete.findOne({ userId });

    if (!athlete) {
      return res.status(404).json({ error: 'Perfil do atleta não encontrado' });
    }

    res.json({ athlete });
  } catch (error) {
    console.error('Erro ao buscar perfil do atleta:', error);
    res.status(400).json({ error: error.message });
  }
});

// ROTAS DE TREINOS

// Criar treino personalizado
router.post('/workouts', async (req, res) => {
  try {
    const { userId } = req.user;
    const workoutData = { ...req.body, userId };

    const workout = new Workout(workoutData);
    await workout.save();

    res.json({ workout });
  } catch (error) {
    console.error('Erro ao criar treino:', error);
    res.status(400).json({ error: error.message });
  }
});

// Listar treinos do usuário
router.get('/workouts', async (req, res) => {
  try {
    const { userId } = req.user;
    const { type, difficulty, isTemplate } = req.query;

    const filter: any = { userId };
    if (type) filter.type = type;
    if (difficulty) filter.difficulty = difficulty;
    if (isTemplate !== undefined) filter.isTemplate = isTemplate === 'true';

    const workouts = await Workout.find(filter).sort({ createdAt: -1 });

    res.json({ workouts });
  } catch (error) {
    console.error('Erro ao buscar treinos:', error);
    res.status(400).json({ error: error.message });
  }
});

// Obter treino específico
router.get('/workouts/:id', async (req, res) => {
  try {
    const { userId } = req.user;
    const { id } = req.params;

    const workout = await Workout.findOne({ _id: id, userId });

    if (!workout) {
      return res.status(404).json({ error: 'Treino não encontrado' });
    }

    res.json({ workout });
  } catch (error) {
    console.error('Erro ao buscar treino:', error);
    res.status(400).json({ error: error.message });
  }
});

// Atualizar treino
router.put('/workouts/:id', async (req, res) => {
  try {
    const { userId } = req.user;
    const { id } = req.params;

    const workout = await Workout.findOneAndUpdate(
      { _id: id, userId },
      req.body,
      { new: true }
    );

    if (!workout) {
      return res.status(404).json({ error: 'Treino não encontrado' });
    }

    res.json({ workout });
  } catch (error) {
    console.error('Erro ao atualizar treino:', error);
    res.status(400).json({ error: error.message });
  }
});

// Deletar treino
router.delete('/workouts/:id', async (req, res) => {
  try {
    const { userId } = req.user;
    const { id } = req.params;

    const workout = await Workout.findOneAndDelete({ _id: id, userId });

    if (!workout) {
      return res.status(404).json({ error: 'Treino não encontrado' });
    }

    res.json({ message: 'Treino deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar treino:', error);
    res.status(400).json({ error: error.message });
  }
});

// ROTAS DE DIETA

// Criar plano alimentar
router.post('/diets', async (req, res) => {
  try {
    const { userId } = req.user;
    const dietData = { ...req.body, userId };

    const diet = new Diet(dietData);
    await diet.save();

    res.json({ diet });
  } catch (error) {
    console.error('Erro ao criar dieta:', error);
    res.status(400).json({ error: error.message });
  }
});

// Listar dietas do usuário
router.get('/diets', async (req, res) => {
  try {
    const { userId } = req.user;
    const { type, isActive, isTemplate } = req.query;

    const filter: any = { userId };
    if (type) filter.type = type;
    if (isActive !== undefined) filter.isActive = isActive === 'true';
    if (isTemplate !== undefined) filter.isTemplate = isTemplate === 'true';

    const diets = await Diet.find(filter).sort({ createdAt: -1 });

    res.json({ diets });
  } catch (error) {
    console.error('Erro ao buscar dietas:', error);
    res.status(400).json({ error: error.message });
  }
});

// Obter dieta específica
router.get('/diets/:id', async (req, res) => {
  try {
    const { userId } = req.user;
    const { id } = req.params;

    const diet = await Diet.findOne({ _id: id, userId });

    if (!diet) {
      return res.status(404).json({ error: 'Dieta não encontrada' });
    }

    res.json({ diet });
  } catch (error) {
    console.error('Erro ao buscar dieta:', error);
    res.status(400).json({ error: error.message });
  }
});

// Atualizar dieta
router.put('/diets/:id', async (req, res) => {
  try {
    const { userId } = req.user;
    const { id } = req.params;

    const diet = await Diet.findOneAndUpdate(
      { _id: id, userId },
      req.body,
      { new: true }
    );

    if (!diet) {
      return res.status(404).json({ error: 'Dieta não encontrada' });
    }

    res.json({ diet });
  } catch (error) {
    console.error('Erro ao atualizar dieta:', error);
    res.status(400).json({ error: error.message });
  }
});

// Ativar/Desativar dieta
router.patch('/diets/:id/toggle-active', async (req, res) => {
  try {
    const { userId } = req.user;
    const { id } = req.params;

    // Primeiro, desativa todas as dietas ativas do usuário
    await Diet.updateMany({ userId, isActive: true }, { isActive: false });

    // Depois ativa a dieta selecionada
    const diet = await Diet.findOneAndUpdate(
      { _id: id, userId },
      { isActive: true },
      { new: true }
    );

    if (!diet) {
      return res.status(404).json({ error: 'Dieta não encontrada' });
    }

    res.json({ diet });
  } catch (error) {
    console.error('Erro ao ativar dieta:', error);
    res.status(400).json({ error: error.message });
  }
});

// ROTAS DE PROGRESSO

// Registrar treino completado
router.post('/progress/workout-log', async (req, res) => {
  try {
    const { userId } = req.user;
    const workoutLog = req.body;

    let progress = await Progress.findOne({ userId });
    
    if (!progress) {
      progress = new Progress({ 
        userId,
        workoutLogs: [workoutLog],
        dietLogs: [],
        bodyMeasurements: [],
        goals: [],
        streaks: {
          workout: { current: 1, longest: 1, lastWorkoutDate: new Date() },
          diet: { current: 0, longest: 0 }
        },
        statistics: {
          totalWorkouts: 1,
          totalWorkoutMinutes: workoutLog.duration,
          totalCaloriesBurned: workoutLog.caloriesBurned || 0,
          averageWorkoutDuration: workoutLog.duration,
          weeklyWorkoutFrequency: 0,
          monthlyProgress: []
        }
      });
    } else {
      progress.workoutLogs.push(workoutLog);
      
      // Atualizar estatísticas
      progress.statistics.totalWorkouts += 1;
      progress.statistics.totalWorkoutMinutes += workoutLog.duration;
      if (workoutLog.caloriesBurned) {
        progress.statistics.totalCaloriesBurned += workoutLog.caloriesBurned;
      }
      progress.statistics.averageWorkoutDuration = 
        progress.statistics.totalWorkoutMinutes / progress.statistics.totalWorkouts;

      // Atualizar streak de treino
      const lastWorkout = progress.streaks.workout.lastWorkoutDate;
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      if (!lastWorkout || lastWorkout.toDateString() === yesterday.toDateString()) {
        progress.streaks.workout.current += 1;
        if (progress.streaks.workout.current > progress.streaks.workout.longest) {
          progress.streaks.workout.longest = progress.streaks.workout.current;
        }
      } else if (lastWorkout.toDateString() !== today.toDateString()) {
        progress.streaks.workout.current = 1;
      }
      
      progress.streaks.workout.lastWorkoutDate = today;
    }

    await progress.save();
    res.json({ progress });
  } catch (error) {
    console.error('Erro ao registrar treino:', error);
    res.status(400).json({ error: error.message });
  }
});

// Registrar log de dieta
router.post('/progress/diet-log', async (req, res) => {
  try {
    const { userId } = req.user;
    const dietLog = req.body;

    let progress = await Progress.findOne({ userId });
    
    if (!progress) {
      progress = new Progress({ 
        userId,
        workoutLogs: [],
        dietLogs: [dietLog],
        bodyMeasurements: [],
        goals: [],
        streaks: {
          workout: { current: 0, longest: 0 },
          diet: { current: 1, longest: 1, lastLogDate: new Date() }
        },
        statistics: {
          totalWorkouts: 0,
          totalWorkoutMinutes: 0,
          totalCaloriesBurned: 0,
          averageWorkoutDuration: 0,
          weeklyWorkoutFrequency: 0,
          monthlyProgress: []
        }
      });
    } else {
      progress.dietLogs.push(dietLog);
      
      // Atualizar streak de dieta
      const lastLog = progress.streaks.diet.lastLogDate;
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      if (!lastLog || lastLog.toDateString() === yesterday.toDateString()) {
        progress.streaks.diet.current += 1;
        if (progress.streaks.diet.current > progress.streaks.diet.longest) {
          progress.streaks.diet.longest = progress.streaks.diet.current;
        }
      } else if (lastLog.toDateString() !== today.toDateString()) {
        progress.streaks.diet.current = 1;
      }
      
      progress.streaks.diet.lastLogDate = today;
    }

    await progress.save();
    res.json({ progress });
  } catch (error) {
    console.error('Erro ao registrar dieta:', error);
    res.status(400).json({ error: error.message });
  }
});

// Registrar medições corporais
router.post('/progress/body-measurement', async (req, res) => {
  try {
    const { userId } = req.user;
    const measurement = req.body;

    let progress = await Progress.findOne({ userId });
    
    if (!progress) {
      progress = new Progress({ 
        userId,
        workoutLogs: [],
        dietLogs: [],
        bodyMeasurements: [measurement],
        goals: [],
        streaks: {
          workout: { current: 0, longest: 0 },
          diet: { current: 0, longest: 0 }
        },
        statistics: {
          totalWorkouts: 0,
          totalWorkoutMinutes: 0,
          totalCaloriesBurned: 0,
          averageWorkoutDuration: 0,
          weeklyWorkoutFrequency: 0,
          monthlyProgress: []
        }
      });
    } else {
      progress.bodyMeasurements.push(measurement);
    }

    await progress.save();
    res.json({ progress });
  } catch (error) {
    console.error('Erro ao registrar medição:', error);
    res.status(400).json({ error: error.message });
  }
});

// Obter progresso completo
router.get('/progress', async (req, res) => {
  try {
    const { userId } = req.user;
    const progress = await Progress.findOne({ userId });

    if (!progress) {
      return res.status(404).json({ error: 'Progresso não encontrado' });
    }

    res.json({ progress });
  } catch (error) {
    console.error('Erro ao buscar progresso:', error);
    res.status(400).json({ error: error.message });
  }
});

// Definir metas
router.post('/progress/goals', async (req, res) => {
  try {
    const { userId } = req.user;
    const goal = req.body;

    let progress = await Progress.findOne({ userId });
    
    if (!progress) {
      progress = new Progress({ 
        userId,
        workoutLogs: [],
        dietLogs: [],
        bodyMeasurements: [],
        goals: [goal],
        streaks: {
          workout: { current: 0, longest: 0 },
          diet: { current: 0, longest: 0 }
        },
        statistics: {
          totalWorkouts: 0,
          totalWorkoutMinutes: 0,
          totalCaloriesBurned: 0,
          averageWorkoutDuration: 0,
          weeklyWorkoutFrequency: 0,
          monthlyProgress: []
        }
      });
    } else {
      progress.goals.push(goal);
    }

    await progress.save();
    res.json({ progress });
  } catch (error) {
    console.error('Erro ao definir meta:', error);
    res.status(400).json({ error: error.message });
  }
});

export default router;