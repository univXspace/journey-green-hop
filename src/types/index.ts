
// User types
export interface User {
  id: string;
  name: string;
  email: string;
  city?: string;
  preferredTransport?: 'bus' | 'metro' | 'both';
  joinedDate: string;
  avatar?: string;
  points: number;
  badges: string[];
  streakDays: number;
  bestStreak: number;
}

// Trip types
export type TransportType = 'bus' | 'metro';

export interface Trip {
  id: string | number;
  userId: string;
  type: TransportType;
  start: string;
  end: string;
  distance: number;
  date: string;
  points: number;
  co2Saved: number;
}

// Reward types
export interface Reward {
  id: string | number;
  title: string;
  description: string;
  icon: string;
  points: number;
  category: 'food' | 'entertainment' | 'merchandise' | 'gift cards' | 'transport';
  available: boolean;
}

// Badge types
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  type: 'trip' | 'streak' | 'distance' | 'co2' | 'other';
  requirement: number;
  unlockedAt?: string;
}

// Dashboard stats
export interface DashboardStats {
  totalPoints: number;
  pointsThisWeek: number;
  totalTrips: number;
  tripsThisWeek: number;
  totalDistance: number;
  distanceThisWeek: number;
  totalCO2Saved: number;
  co2SavedThisWeek: number;
  currentStreak: number;
  bestStreak: number;
  transportDistribution: {
    bus: number;
    metro: number;
  };
  weeklyActivity: {
    day: string;
    trips: number;
    distance: number;
    co2Saved: number;
  }[];
}

// API responses
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
