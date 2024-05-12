import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItemDivider, IonLabel, IonIcon, IonButtons, IonButton, IonItem, IonItemGroup, IonList } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { addIcons } from 'ionicons';
import { addOutline, chevronBackOutline, chevronForwardOutline } from 'ionicons/icons';
import moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-tab',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonList, IonItemGroup, IonItem, IonButton, IonButtons, IonIcon, IonLabel, IonItemDivider, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent]
})
export class HomePage {
  currentDate = moment();

  constructor(private router: Router) {
    addIcons({chevronBackOutline, chevronForwardOutline, addOutline})
  }

  get weekRange() {
    const startOfWeek = this.currentDate.clone().startOf('isoWeek');
    const endOfWeek = this.currentDate.clone().endOf('isoWeek');

    return `${startOfWeek.format('MMM D')} - ${endOfWeek.format('MMM D')}`;
  }

  get daysOfWeek() {
    const week = [];

    for (let i = 0; i < 7; i++) {
      const date = this.currentDate.clone().startOf('isoWeek').add(i, 'days');
      week.push({
        dayOfWeek: date.format('dddd'),
        date: date.format('MMMM D YYYY') // 'April 9 2024' format
      });
    }

    return week;
  }

  navigateWeeks(direction: 'prev' | 'next') {
    if (direction === 'prev') {
      this.currentDate.subtract(1, 'weeks');
    } else {
      this.currentDate.add(1, 'weeks');
    }
  }

  startWorkout(dateStr: string) {
    this.router.navigate(['/tabs/workout-session'], { queryParams: { date: dateStr } }).then(() => {
      // do nothing
    });
  }
}
