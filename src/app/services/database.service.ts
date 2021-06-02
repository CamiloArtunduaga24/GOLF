import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
  })
export class DatabaseService{

  constructor(private firestore: AngularFirestore) { }

  // Create a new golf data record
  createNewRecord(record) {
    return this.firestore.collection(environment.firebaseDB.dbCollection).add(record);
  }

  // Reads the golf data records stored in the database
  readAllRecord() {
    return this.firestore.collection(environment.firebaseDB.dbCollection).snapshotChanges();
  }
}

