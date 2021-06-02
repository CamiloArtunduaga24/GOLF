import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FireauthService {

  constructor(public auth: AngularFireAuth) {

    this.getUid();
  }

  login(email: string, password: string){
    return this.auth.signInWithEmailAndPassword(email, password)
  }

  registrar( email: string, password: string ){
    return this.auth.createUserWithEmailAndPassword(email, password);
  }


  logout(){
    return this.auth.signOut();
  }

  async getUid() {
    const user = await this.auth.currentUser;
    if(  user === null ) {
      return null;
    }else {
      return user.uid;
    }
  }

  estateAuth() {
    return this.auth.authState;

  }
}
