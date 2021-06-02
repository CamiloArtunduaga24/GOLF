import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import {ModalController, NavController} from '@ionic/angular';
import { ResultadoComponent } from '../resultado/resultado.component';
import { MenuController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';



@Component({
    selector: 'app-pages',
    templateUrl: './tarjeta.component.html',
    styleUrls: ['./tarjeta.component.scss'],
})
export class TarjetaComponent implements OnInit {

    golfCourseName: string;
    holeNumber: number;
    email: string;
    timestamp: moment.Moment;

    populateInputFlag = false;

    parResult = [];
    holeResult = [];

    // Par and score input ranges can be changed accordingly.
    minScore = 0;
    maxScore = 9;

    attrMaxLength = 1;

    constructor(private resultModal: ModalController,
                private navigationController: NavController,
                public menuController: MenuController,
                private db: AngularFirestore,
    ) {
    }

    ngOnInit() {
    }

    // When the user clicks the populate button, this function enables the flag to populate the par, score inputs
    populateInput() {
        this.populateInputFlag = true;
    }

    createRecord() {
        this.populateInputFlag = false;

        // Stores the inputs in suitable key: value relationship
        let record = {};
        record['timestamp'] = Date.now();
        record['golfCourseName'] = this.golfCourseName;
        record['holeNumber'] = this.holeNumber.toString();
        record['parResult'] = this.parResult.toString();
        record['holeResult'] = this.holeResult.toString();

        // Shows the result page modal to the user
        this.db.collection('Score').add(record);
        this.showResult();
    }
    // This function checks the inputs of the score, par fields.
    disableGolfRecordButton() {

        // Checks the length of inputs for empty array values.
        if (this.parResult.length === 0 || this.holeResult.length === 0) {
            return true;
        }

        // Ensures the par input values are integer values and are in range.
        for (let i = 0; i < this.parResult.length; i++) {
            if (this.isInt(this.parResult[i])) {
                if (this.parResult[i] < this.minScore || this.parResult[i] > this.maxScore) {
                    return true;
                }
            } else {
                return true;
            }
        }

        // Ensures the hole input values are integer values and are in range.
        for (let i = 0; i < this.holeResult.length; i++) {
            if (this.isInt(this.holeResult[i])) {
                if (this.holeResult[i] < this.minScore || this.holeResult[i] > this.maxScore) {
                    return true;
                }
            } else {
                return true;
            }
        }

        // Checks the length of inputs for consistent array values.
        if (this.parResult.length < this.holeNumber || this.holeResult.length < this.holeNumber) {
            return true;
        }
        return false;
    }

    // When the clear input button is pressed, the hole and par results are cleared.
    clearInput() {
        for (let i = 0; i < this.parResult.length; i++) {
            this.parResult[i] = '';
        }

        for (let i = 0; i < this.holeResult.length; i++) {
            this.holeResult[i] = '';
        }
    }

    // passes in the relevant data that is needed for the weather modal
    async showResult() {
        const modal = await this.resultModal.create({
            // References to the UserResult page
            component: ResultadoComponent,
            componentProps: {
                timestamp: this.timestamp,
                golfCourseName: this.golfCourseName,
                holeNumber: this.holeNumber,
                parResult: this.parResult,
                holeResult: this.holeResult
            },
        });
        await modal.present();
    }

    // Checks to see if number is acutally a integer type.
    isInt(n) {
        return ((typeof n === 'number') && (n % 1 === 0));
    }

    openMenu() { 
        this.menuController.toggle('principal');
      }
          
}

 


  