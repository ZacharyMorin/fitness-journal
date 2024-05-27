import { IonHeader, IonTitle, IonToolbar, IonContent, IonList, IonListHeader, IonRadioGroup, IonLabel, IonRadio, IonItem, IonButton, IonIcon, IonButtons } from '@ionic/angular/standalone';
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { closeOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-rest-timer',
  templateUrl: './rest-timer.component.html',
  styleUrls: ['./rest-timer.component.scss'],
  standalone: true,
  providers: [ModalController],
  imports: [IonButtons, IonIcon, IonButton, IonItem, IonRadio, IonLabel, IonRadioGroup, IonListHeader, IonList, IonContent, IonToolbar, IonTitle, IonHeader, ]
})
export class RestTimerComponent  {
  timeInSeconds: number[] = [60,90,105,120];

  constructor(private modalController: ModalController) {
    addIcons({
      closeOutline,
    });
  }


  close() {
    this.modalController.dismiss();
  }


  startTimer(duration: number) {
    const timerDuration: { duration: number } = {
      duration
    };

    // Logic to start the timer with the selected duration
    this.modalController.dismiss(timerDuration);
  }


  formatTime(restTimeInSeconds: number): string {
    const minutes: number = Math.floor(restTimeInSeconds / 60);
    const seconds: number = restTimeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
}
