import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment'
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    RouterModule,
    HttpClientModule,
    AngularFireStorageModule,
    IonicModule.forRoot(), 
    PagesModule,
    AngularFireAuthModule,
    AppRoutingModule],
    
  providers: [{
    provide: RouteReuseStrategy, 
    useClass: IonicRouteStrategy 
    }],
  bootstrap: [AppComponent],
})
export class AppModule {}
