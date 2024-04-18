import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonRadioGroup, IonRadio, IonItem, IonLabel, IonListHeader, IonList, IonInput, IonIcon, IonButton, IonButtons, IonCheckbox } from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { addIcons } from 'ionicons';
import { addOutline, arrowBackCircleOutline } from 'ionicons/icons';

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
      ReactiveFormsModule
  ]
})
export class WorkoutSessionPage implements OnInit, OnDestroy {
  private routerQuerySub: Subscription | undefined;
  date: string | undefined;
  selectedWorkoutTypeCtrl: FormControl = new FormControl();
  showRepsAndWeight: boolean = false;
  workoutForm: FormGroup | undefined;


  constructor(private route: ActivatedRoute, private fb: FormBuilder) {
    addIcons({ addOutline, arrowBackCircleOutline });
  }


  ngOnInit() {
    this.routerQuerySub = this.route.queryParams.subscribe(params => {
      this.date = params['date'];
    });

    this.workoutForm = this.fb.group({
        workoutName: ['', Validators.required],
        exerciseSets: this.fb.array([])
    });
  }


  ngOnDestroy() {
    if (this.routerQuerySub) {
      this.routerQuerySub.unsubscribe();
    }
  }


  get workoutName() {
    return this.workoutForm?.get('workoutName');
  }


  get exerciseSets(): FormArray {
    return this.workoutForm?.get('exerciseSets') as FormArray;
  }


  addExercise() {
    if (this.workoutForm?.value.workoutName?.length) {
      this.showRepsAndWeight = true;
    }
  }


  addExerciseSet() {
    if (this.workoutName?.valid) {
      this.exerciseSets.push(
        this.fb.group({
          reps: [''],
          weight: ['']
        })
      );
    }
  }


  resetSelection() {
    this.selectedWorkoutTypeCtrl.reset('');
  }

}
