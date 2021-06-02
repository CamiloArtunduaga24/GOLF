import { CalendarComponent } from 'ionic2-calendar';
import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { AngularFirestore } from '@angular/fire/firestore';
import { MenuController } from '@ionic/angular';
 
@Component({
  selector: 'app-pages',
  templateUrl: 'calendario.component.html',
  styleUrls: ['calendario.component.scss'],
})
export class Calendariocomponent implements OnInit {
 
  event = {
    title: '',
    desc: '',
    startTime: '',
    endTime: '',
    Cddie1: false ,Cddie2: false, Cddie3: false,
    NPlayer1: '', NPlayer2: '', NPlayer3: '',
    CPlayer1: '', CPlayer2: '', CPlayer3: '',
    DPlayer1: '', DPlayer2: '', DPlayer3: '',

  };
 
  minDate = new Date().toISOString();
 
  eventSource = [];
  viewTitle;
 
  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };
 
  @ViewChild(CalendarComponent) myCal: CalendarComponent;
 
  constructor(private alertCtrl: AlertController, @Inject(LOCALE_ID) private locale: string, private db: AngularFirestore, public menuController: MenuController) {
    this.db.collection(`events`).snapshotChanges().subscribe(colSnap => {
			this.eventSource = [];
			colSnap.forEach(snap => {
				const event: any = snap.payload.doc.data();
				event.id = snap.payload.doc.id;
				event.startTime = event.startTime.toDate();
				event.endTime = event.endTime.toDate();
				console.log(event);
				this.eventSource.push(event);
			});
		});
   }
 
  ngOnInit() {
    this.resetEvent();
  }
 
  resetEvent() {
    this.event = {
      title: '',
      desc: '',
      Cddie1: false, Cddie2: false, Cddie3: false,
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      NPlayer1: '', NPlayer2: '', NPlayer3: '',
      CPlayer1: '', CPlayer2: '', CPlayer3: '',
      DPlayer1: '', DPlayer2: '', DPlayer3: '',

    };
  }
 
  // Create the right event format and reload source
  addEvent() {
    let eventCopy = {
      title: this.event.title,
      startTime:  new Date(this.event.startTime),
      endTime: new Date(this.event.endTime),
      desc: this.event.desc,
      //nombre de los jugadores
      NPlayer1: this.event.NPlayer1,
      NPlayer2: this.event.NPlayer2,
      NPlayer3: this.event.NPlayer3,
      //correo de los jugadores
      CPlayer1: this.event.CPlayer1,
      CPlayer2: this.event.CPlayer2,
      CPlayer3: this.event.CPlayer3,
      //documento de los jugaroes
      DPlayer1: this.event.DPlayer1,
      DPlayer2: this.event.DPlayer2,
      DPlayer3: this.event.DPlayer3,     
      //reserva de caddie 
      Cddie1: this.event.Cddie1, 
      Cddie2: this.event.Cddie2, 
      Cddie3: this.event.Cddie3
    }

    this.db.collection('Teetime').add(eventCopy);
    this.eventSource.push(eventCopy);
    this.myCal.loadEvents();
    this.resetEvent();
  }
  // Change current month/week/day
 next() {
  var swiper = document.querySelector('.swiper-container')['swiper'];
  swiper.slideNext();
}
 
back() {
  var swiper = document.querySelector('.swiper-container')['swiper'];
  swiper.slidePrev();
}
 
// Change between month/week/day
changeMode(mode) {
  this.calendar.mode = mode;
}
 
// Focus today
today() {
  this.calendar.currentDate = new Date();
}
 
// Selected date reange and hence title changed
onViewTitleChanged(title) {
  this.viewTitle = title;
}
 
// Calendar event was clicked
async onEventSelected(event) {
  // Use Angular date pipe for conversion
  let start = formatDate(event.startTime, 'medium', this.locale);
  let end = formatDate(event.endTime, 'medium', this.locale);
 
  const alert = await this.alertCtrl.create({
    header: event.title,
    subHeader: event.desc,
    message: 'From: ' + start + '<br><br>To: ' + end,
    buttons: ['OK']
  });
  alert.present();
}
 // Time slot was clicked
onTimeSelected(ev) {
  let selected = new Date(ev.selectedTime);
  this.event.startTime = selected.toISOString();
  selected.setMinutes(selected.getMinutes() + 15);
  this.event.endTime = (selected.toISOString());
}

openMenu() { 
  this.menuController.toggle('principal');
}
}