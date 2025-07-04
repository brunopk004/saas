import * as mongoose from 'mongoose';

export interface IFood {
  name: string;
  category: string;
  calories: number; // por 100g
  protein: number; // gramas por 100g
  carbs: number; // gramas por 100g
  fat: number; // gramas por 100g
  fiber?: number; // gramas por 100g
  sugar?: number; // gramas por 100g
  sodium?: number; // mg por 100g
}

export interface IMeal {
  name: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  foods: {
    food: IFood;
    quantity: number; // em gramas
  }[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  scheduledTime?: string; // HH:mm
}

export interface IDietDocument extends mongoose.Document {
  userId: string;
  name: string;
  description?: string;
  type: string;
  dailyCalorieTarget: number;
  macroTargets: {
    protein: number; // gramas
    carbs: number; // gramas
    fat: number; // gramas
  };
  meals: IMeal[];
  waterIntake?: number; // em ml
  isTemplate: boolean;
  isActive: boolean;
  startDate?: Date;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: [
      'fruits',
      'vegetables',
      'grains',
      'protein',
      'dairy',
      'nuts_seeds',
      'fats_oils',
      'beverages',
      'sweets',
      'processed'
    ],
    required: true,
  },
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
  fiber: {
    type: Number,
    min: 0,
  },
  sugar: {
    type: Number,
    min: 0,
  },
  sodium: {
    type: Number,
    min: 0,
  },
});

const mealSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['breakfast', 'lunch', 'dinner', 'snack'],
    required: true,
  },
  foods: [{
    food: foodSchema,
    quantity: {
      type: Number,
      required: true,
      min: 1,
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
  scheduledTime: {
    type: String,
    match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
  },
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
      'weight_loss',
      'muscle_gain',
      'maintenance',
      'cutting',
      'bulking',
      'vegetarian',
      'vegan',
      'keto',
      'paleo',
      'mediterranean',
      'low_carb',
      'balanced'
    ],
    required: true,
  },
  dailyCalorieTarget: {
    type: Number,
    required: true,
    min: 1000,
    max: 5000,
  },
  macroTargets: {
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
  },
  meals: [mealSchema],
  waterIntake: {
    type: Number,
    min: 0,
    max: 10000,
  },
  isTemplate: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  startDate: Date,
  endDate: Date,
}, {
  timestamps: true,
});

mongoSchema.index({ userId: 1, createdAt: -1 });
mongoSchema.index({ type: 1 });
mongoSchema.index({ isTemplate: 1 });
mongoSchema.index({ isActive: 1 });

export const Diet = mongoose.model<IDietDocument>('Diet', mongoSchema);