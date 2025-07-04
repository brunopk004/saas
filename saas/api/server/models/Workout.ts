import * as mongoose from 'mongoose';

export interface IExercise {
  name: string;
  category: string;
  muscleGroups: string[];
  equipment: string[];
  sets: number;
  reps?: number;
  duration?: number; // em segundos
  rest?: number; // em segundos
  weight?: number; // em kg
  distance?: number; // em metros
  intensity?: 'low' | 'medium' | 'high';
  instructions?: string;
  videoUrl?: string;
}

export interface IWorkoutDocument extends mongoose.Document {
  userId: string;
  name: string;
  description?: string;
  type: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // em minutos
  calories?: number;
  exercises: IExercise[];
  isTemplate: boolean;
  isCustom: boolean;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: [
      'cardio',
      'strength',
      'flexibility',
      'balance',
      'plyometric',
      'functional',
      'core',
      'warm_up',
      'cool_down'
    ],
    required: true,
  },
  muscleGroups: [{
    type: String,
    enum: [
      'chest',
      'back',
      'shoulders',
      'biceps',
      'triceps',
      'forearms',
      'abs',
      'obliques',
      'quadriceps',
      'hamstrings',
      'glutes',
      'calves',
      'full_body'
    ],
  }],
  equipment: [{
    type: String,
    enum: [
      'dumbbells',
      'barbell',
      'resistance_bands',
      'yoga_mat',
      'treadmill',
      'stationary_bike',
      'pull_up_bar',
      'kettlebells',
      'body_weight',
      'none'
    ],
  }],
  sets: {
    type: Number,
    required: true,
    min: 1,
  },
  reps: {
    type: Number,
    min: 1,
  },
  duration: {
    type: Number,
    min: 10,
  },
  rest: {
    type: Number,
    min: 0,
  },
  weight: {
    type: Number,
    min: 0,
  },
  distance: {
    type: Number,
    min: 0,
  },
  intensity: {
    type: String,
    enum: ['low', 'medium', 'high'],
  },
  instructions: String,
  videoUrl: String,
});

const mongoSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    maxlength: 100,
  },
  description: {
    type: String,
    maxlength: 500,
  },
  type: {
    type: String,
    enum: [
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
      'sports',
      'full_body',
      'upper_body',
      'lower_body',
      'core'
    ],
    required: true,
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true,
  },
  duration: {
    type: Number,
    required: true,
    min: 5,
    max: 180,
  },
  calories: {
    type: Number,
    min: 0,
  },
  exercises: [exerciseSchema],
  isTemplate: {
    type: Boolean,
    default: false,
  },
  isCustom: {
    type: Boolean,
    default: true,
  },
  tags: [String],
}, {
  timestamps: true,
});

mongoSchema.index({ userId: 1, createdAt: -1 });
mongoSchema.index({ type: 1, difficulty: 1 });
mongoSchema.index({ isTemplate: 1 });

export const Workout = mongoose.model<IWorkoutDocument>('Workout', mongoSchema);