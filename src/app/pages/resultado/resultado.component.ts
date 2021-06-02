import { Component, OnInit } from '@angular/core';
import {ModalController, NavController, NavParams} from '@ionic/angular';

import * as moment from 'moment';


@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.scss'],
})
export class ResultadoComponent implements OnInit {

  private timestamp;
  private golfCourseName;
  private holeNumber;
  private parResult;
  private holeResult;

  private parCal;
  private holeCal;

  constructor(private modalController: ModalController, private navParams: NavParams, private navigationController: NavController,
              ) {

    // Get the golf data from the start advisor page which the user has entered.
    this.timestamp = this.navParams.get('timestamp');
    this.golfCourseName = this.navParams.get('golfCourseName');
    this.holeNumber = this.navParams.get('holeNumber');
    this.parResult = this.navParams.get('parResult');
    this.holeResult = this.navParams.get('holeResult');
  }

  ngOnInit() {
    // This ensures that the user has to be logged into the system to use the app.
    this.timestamp = moment(this.timestamp).format('DD-MMM-YYYY HH:mm:ss');

    this.parCal = '';
    this.holeCal = '';

    // calculates the total scores as needed.
    this.parCal = this.calc(String(this.parResult).replace(/,/g, ''));
    this.holeCal = this.calc(String(this.holeResult).replace(/,/g, ''));
  }

  // When the modal is closed, this function does handles this operation.
  return() {
    this.modalController.dismiss();
  }

  // used to add up all the numbers in the par and hole array
  calc(n) {
    const str = n.toString().split('');
    let sum = 0;
    for (let i = 0; i <= str.length - 1; i++) {
      sum += Number(str[i]);
    }
    return sum;
  }
  

}
