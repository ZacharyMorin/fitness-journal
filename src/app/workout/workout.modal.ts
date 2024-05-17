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
  IonCheckbox, IonModal, IonSearchbar, IonImg, IonAvatar } from '@ionic/angular/standalone';
import { Subscription, timer } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  addOutline,
  arrowBackCircleOutline,
  checkmarkOutline,
  closeOutline,
  timerOutline,
} from 'ionicons/icons';
import { ModalController } from '@ionic/angular';
import { RestTimerComponent } from '../rest-timer/rest-timer.component';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.modal.html',
  styleUrls: ['./workout.modal.scss'],
  standalone: true,
  imports: [IonAvatar, IonImg, IonSearchbar, IonModal,
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
  providers: [ModalController],
})
export class WorkoutSessionPage implements OnInit, OnDestroy {
  private routerQuerySub: Subscription | undefined;
  date: string | undefined;

  constructor(private modalController: ModalController, private route: ActivatedRoute, private fb: FormBuilder) {
    addIcons({
      addOutline,
      arrowBackCircleOutline,
      checkmarkOutline,
      closeOutline,
      timerOutline
    });
  }

  ngOnInit() {
    this.routerQuerySub = this.route.queryParams.subscribe((params) => {
      this.date = params['date'];
    });
  }

  ngOnDestroy() {
    if (this.routerQuerySub) {
      this.routerQuerySub.unsubscribe();
    }
  }

  async openTimerModal() {
    console.log('Opening timer modal');
    const modal = await this.modalController.create({
      component: RestTimerComponent
    });
    return await modal.present();
  }
}
