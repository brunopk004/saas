import * as mongoose from 'mongoose';

export interface IAthleteDocument extends mongoose.Document {
  userId: string;
  personalInfo: {
    age: number;
    height: number; // em cm
    currentWeight: number; // em kg
    targetWeight?: number; // em kg
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
    workoutDuration: number; // em minutos
    workoutFrequency: number; // por semana
  };
  metrics: {
    bmi: number;
    bodyFatPercentage?: number;
    muscleMass?: number;
    basalMetabolicRate: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const mongoSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  personalInfo: {
    age: {
      type: Number,
      required: true,
      min: 13,
      max: 100,
    },
    height: {
      type: Number,
      required: true,
      min: 100,
      max: 250,
    },
    currentWeight: {
      type: Number,
      required: true,
      min: 30,
      max: 300,
    },
    targetWeight: {
      type: Number,
      min: 30,
      max: 300,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: true,
    },
    activityLevel: {
      type: String,
      enum: ['sedentary', 'light', 'moderate', 'active', 'very_active'],
      required: true,
    },
    fitnessGoals: [{
      type: String,
      enum: [
        'weight_loss',
        'muscle_gain',
        'endurance',
        'strength',
        'flexibility',
        'general_fitness',
        'sports_performance',
        'rehabilitation'
      ],
    }],
    medicalConditions: [String],
    injuries: [String],
  },
  preferences: {
    workoutTypes: [{
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
        'sports'
      ],
    }],
    dietaryRestrictions: [{
      type: String,
      enum: [
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
      ],
    }],
    allergies: [String],
    equipmentAvailable: [{
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
        'gym_access',
        'none'
      ],
    }],
    workoutDuration: {
      type: Number,
      required: true,
      min: 15,
      max: 180,
    },
    workoutFrequency: {
      type: Number,
      required: true,
      min: 1,
      max: 7,
    },
  },
  metrics: {
    bmi: {
      type: Number,
      required: true,
    },
    bodyFatPercentage: Number,
    muscleMass: Number,
    basalMetabolicRate: {
      type: Number,
      required: true,
    },
  },
}, {
  timestamps: true,
});

mongoSchema.pre('save', function(next) {
  // Calcular BMI
  if (this.personalInfo.height && this.personalInfo.currentWeight) {
    const heightInMeters = this.personalInfo.height / 100;
    this.metrics.bmi = this.personalInfo.currentWeight / (heightInMeters * heightInMeters);
  }

  // Calcular TMB (Taxa Metabólica Basal) usando fórmula de Mifflin-St Jeor
  const { age, currentWeight, height, gender } = this.personalInfo;
  if (gender === 'male') {
    this.metrics.basalMetabolicRate = (10 * currentWeight) + (6.25 * height) - (5 * age) + 5;
  } else {
    this.metrics.basalMetabolicRate = (10 * currentWeight) + (6.25 * height) - (5 * age) - 161;
  }

  next();
});

export const Athlete = mongoose.model<IAthleteDocument>('Athlete', mongoSchema);