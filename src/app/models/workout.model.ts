export interface Workout {
  exerciseName: string;
  sets: WorkoutSet[];
}

export interface WorkoutSet {
  reps: any;
  weight: any;
}
