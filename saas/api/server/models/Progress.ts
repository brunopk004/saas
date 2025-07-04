import * as mongoose from 'mongoose';

export interface IWorkoutLog {
  workoutId: string;
  workoutName: string;
  completedAt: Date;
  duration: number; // em minutos
  caloriesBurned?: number;
  exercises: {
    exerciseName: string;
    setsCompleted: number;
    repsCompleted?: number;
    weightUsed?: number;
    durationCompleted?: number;
    notes?: string;
  }[];
  overallRating?: number; // 1-5
  notes?: string;
}

export interface IDietLog {
  dietId?: string;
  date: Date;
  meals: {
    mealName: string;
    type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
    foods: string[];
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  }[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  waterIntake?: number;
}

export interface IBodyMeasurement {
  date: Date;
  weight: number;
  bodyFatPercentage?: number;
  muscleMass?: number;
  measurements?: {
    chest?: number;
    waist?: number;
    hips?: number;
    biceps?: number;
    thighs?: number;
  };
  photos?: {
    front?: string;
    side?: string;
    back?: string;
  };
  notes?: string;
}

export interface IProgressDocument extends mongoose.Document {
  userId: string;
  workoutLogs: IWorkoutLog[];
  dietLogs: IDietLog[];
  bodyMeasurements: IBodyMeasurement[];
  goals: {
    type: string;
    target: number;
    current?: number;
    deadline?: Date;
    achieved?: boolean;
    achievedAt?: Date;
  }[];
  streaks: {
    workout: {
      current: number;
      longest: number;
      lastWorkoutDate?: Date;
    };
    diet: {
      current: number;
      longest: number;
      lastLogDate?: Date;
    };
  };
  statistics: {
    totalWorkouts: number;
    totalWorkoutMinutes: number;
    totalCaloriesBurned: number;
    averageWorkoutDuration: number;
    favoriteWorkoutType?: string;
    weeklyWorkoutFrequency: number;
    monthlyProgress: {
      month: string; // YYYY-MM
      workouts: number;
      avgWeight?: number;
      caloriesBurned: number;
    }[];
  };
  createdAt: Date;
  updatedAt: Date;
}

const workoutLogSchema = new mongoose.Schema({
  workoutId: {
    type: String,
    required: true,
  },
  workoutName: {
    type: String,
    required: true,
  },
  completedAt: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
    min: 1,
  },
  caloriesBurned: {
    type: Number,
    min: 0,
  },
  exercises: [{
    exerciseName: {
      type: String,
      required: true,
    },
    setsCompleted: {
      type: Number,
      required: true,
      min: 1,
    },
    repsCompleted: {
      type: Number,
      min: 1,
    },
    weightUsed: {
      type: Number,
      min: 0,
    },
    durationCompleted: {
      type: Number,
      min: 0,
    },
    notes: String,
  }],
  overallRating: {
    type: Number,
    min: 1,
    max: 5,
  },
  notes: String,
});

const dietLogSchema = new mongoose.Schema({
  dietId: String,
  date: {
    type: Date,
    required: true,
  },
  meals: [{
    mealName: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['breakfast', 'lunch', 'dinner', 'snack'],
      required: true,
    },
    foods: [String],
    calories: {
      type: Number,
      required: true,
      min: 0,
    },
    protein: {
      type: Number,
      required: true,
      min: 0,
    },
    carbs: {
      type: Number,
      required: true,
      min: 0,
    },
    fat: {
      type: Number,
      required: true,
      min: 0,
    },
  }],
  totalCalories: {
    type: Number,
    required: true,
    min: 0,
  },
  totalProtein: {
    type: Number,
    required: true,
    min: 0,
  },
  totalCarbs: {
    type: Number,
    required: true,
    min: 0,
  },
  totalFat: {
    type: Number,
    required: true,
    min: 0,
  },
  waterIntake: {
    type: Number,
    min: 0,
  },
});

const bodyMeasurementSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
    min: 30,
    max: 300,
  },
  bodyFatPercentage: {
    type: Number,
    min: 3,
    max: 50,
  },
  muscleMass: {
    type: Number,
    min: 0,
  },
  measurements: {
    chest: Number,
    waist: Number,
    hips: Number,
    biceps: Number,
    thighs: Number,
  },
  photos: {
    front: String,
    side: String,
    back: String,
  },
  notes: String,
});

const mongoSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  workoutLogs: [workoutLogSchema],
  dietLogs: [dietLogSchema],
  bodyMeasurements: [bodyMeasurementSchema],
  goals: [{
    type: {
      type: String,
      enum: [
        'weight_loss',
        'weight_gain',
        'muscle_gain',
        'body_fat_reduction',
        'strength_increase',
        'endurance_improvement',
        'workout_frequency',
        'water_intake'
      ],
      required: true,
    },
    target: {
      type: Number,
      required: true,
    },
    current: Number,
    deadline: Date,
    achieved: {
      type: Boolean,
      default: false,
    },
    achievedAt: Date,
  }],
  streaks: {
    workout: {
      current: {
        type: Number,
        default: 0,
      },
      longest: {
        type: Number,
        default: 0,
      },
      lastWorkoutDate: Date,
    },
    diet: {
      current: {
        type: Number,
        default: 0,
      },
      longest: {
        type: Number,
        default: 0,
      },
      lastLogDate: Date,
    },
  },
  statistics: {
    totalWorkouts: {
      type: Number,
      default: 0,
    },
    totalWorkoutMinutes: {
      type: Number,
      default: 0,
    },
    totalCaloriesBurned: {
      type: Number,
      default: 0,
    },
    averageWorkoutDuration: {
      type: Number,
      default: 0,
    },
    favoriteWorkoutType: String,
    weeklyWorkoutFrequency: {
      type: Number,
      default: 0,
    },
    monthlyProgress: [{
      month: {
        type: String,
        required: true,
        match: /^\d{4}-\d{2}$/,
      },
      workouts: {
        type: Number,
        default: 0,
      },
      avgWeight: Number,
      caloriesBurned: {
        type: Number,
        default: 0,
      },
    }],
  },
}, {
  timestamps: true,
});

mongoSchema.index({ userId: 1 });
mongoSchema.index({ 'workoutLogs.completedAt': -1 });
mongoSchema.index({ 'dietLogs.date': -1 });
mongoSchema.index({ 'bodyMeasurements.date': -1 });

export const Progress = mongoose.model<IProgressDocument>('Progress', mongoSchema);