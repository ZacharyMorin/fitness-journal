import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonRadioGroup,
  IonRadio,
  IonItem,
  IonLabel,
  IonListHeader,
  IonList,
  IonInput,
  IonIcon,
  IonButton,
  IonButtons,
  IonCheckbox,
} from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  addOutline,
  arrowBackCircleOutline,
  checkmarkOutline,
  closeOutline,
} from 'ionicons/icons';
import { Workout } from '../models/workout.model';

@Component({
  selector: 'app-workout-session',
  templateUrl: './workout-session.page.html',
  styleUrls: ['./workout-session.page.scss'],
  standalone: true,
  imports: [
    IonCheckbox,
    IonButtons,
    IonButton,
    IonIcon,
    IonInput,
    IonList,
    IonListHeader,
    IonLabel,
    IonItem,
    IonRadio,
    IonRadioGroup,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class WorkoutSessionPage implements OnInit, OnDestroy {
  private routerQuerySub: Subscription | undefined;
  date: string | undefined;
  selectedWorkoutTypeCtrl: FormControl = new FormControl();
  workoutForm: FormGroup | undefined;
  completedExercises: Workout[] = [];

  constructor(private route: ActivatedRoute, private fb: FormBuilder) {
    addIcons({
      addOutline,
      arrowBackCircleOutline,
      checkmarkOutline,
      closeOutline,
    });
  }

  ngOnInit() {
    this.routerQuerySub = this.route.queryParams.subscribe((params) => {
      this.date = params['date'];
    });

    this.workoutForm = this.fb.group({
      workoutName: ['', Validators.required],
      exerciseSets: this.fb.array([]),
    });
  }

  ngOnDestroy() {
    if (this.routerQuerySub) {
      this.routerQuerySub.unsubscribe();
    }
  }

  get userHasSelectedWorkoutType(): boolean {
    return !!this.selectedWorkoutTypeCtrl?.value;
  }

  get workoutName() {
    return this.workoutForm?.get('workoutName');
  }

  get exerciseSets(): FormArray {
    return this.workoutForm?.get('exerciseSets') as FormArray;
  }

  get hasExerciseSets(): boolean {
    return this.exerciseSets?.length > 0;
  }

  addExerciseSet() {
    if (this.workoutName?.valid) {
      this.exerciseSets.push(
        this.fb.group({
          reps: [''],
          weight: [''],
        })
      );
    }
  }

  saveWorkout() {
    if (this.workoutForm?.valid) {
      // Filter out exercise sets where reps or weight are empty strings
      let workout: Workout = {
        exerciseName: this.workoutName?.value,
        sets: [],
      };

      workout.sets = this.exerciseSets.controls
        .filter((exerciseSet) => {
          const reps = exerciseSet.get('reps')?.value;
          const weight = exerciseSet.get('weight')?.value;
          return reps.trim() !== '' && weight?.trim() !== '';
        })
        .map((exerciseSet) => {
          // Map to the desired object structure if necessary
          return {
            reps: exerciseSet.get('reps')?.value,
            weight: exerciseSet.get('weight')?.value,
          };
        });

      console.log(workout);
      this.completedExercises.push(workout);

      // TODO: Make your API call with validExerciseSets array
      // this.myApiService.sendWorkoutData(validExerciseSets).subscribe(...);
    }
  }

  resetSelection() {
    this.selectedWorkoutTypeCtrl.patchValue(null, { emitEvent: false });
  }
}
