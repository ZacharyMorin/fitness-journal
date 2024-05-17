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

  constructor(private modalController: ModalController) {
    addIcons({
      closeOutline,
    });
  }

  close() {
    this.modalController.dismiss();
  }

  startTimer(duration: number) {
    // Logic to start the timer with the selected duration
    this.modalController.dismiss();
  }

}
