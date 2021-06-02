import { Component, OnInit } from '@angular/core';
import { DatabaseService} from '../../services/database.service';
import { MenuController } from '@ionic/angular';
//import { FireauthService } from '../../services/fireauth.service';

import * as moment from 'moment';
import {NavController} from '@ionic/angular';


@Component({
  selector: 'app-consulta-score',
  templateUrl: './consulta-score.component.html',
  styleUrls: ['./consulta-score.component.scss'],
})
export class ConsultaScoreComponent implements OnInit {

  golfData;
  constructor(private databaseService: DatabaseService, 
    private navigationController: NavController,
    //public auth: FireauthService,
    public menuController: MenuController) { }


  ngOnInit() {
   /* if (this.FireauthService.userDetails()) {
      this.FireauthService.email;
    } else {
      this.navigationController.navigateBack('');
    }
  */
    this.databaseService.readAllRecord().subscribe(data => {
      this.golfData = data.map(e => {

        let date = moment(e.payload.doc.data()['timestamp']).format("DD-MMM-YYYY HH:mm:ss");

        return {
          id: e.payload.doc.id,
          Email: e.payload.doc.data()['email'],
          Timestamp: date,
          GolfCourseName: e.payload.doc.data()['golfCourseName'],
          HoleNumber: e.payload.doc.data()['holeNumber'],
          ParResult: e.payload.doc.data()['parResult'],
          HoleResult: e.payload.doc.data()['holeResult'],
        };
      });
    });
  }

  openMenu() { 
    this.menuController.toggle('principal');
  }

}
