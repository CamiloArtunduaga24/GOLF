import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import {Router} from '@angular/router';
import { FirestoreService } from '../../services/firestore.service';
import { Noticia } from '../../models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  private path = 'Noticias/'

  noticias: Noticia[] = [];

   constructor( public menuController: MenuController,
                public router:Router,
                public firestoreService: FirestoreService ) { 
                    this.loadNoticias();
                }

  ngOnInit() {}

   openMenu() { 
     this.menuController.toggle('principal');
   }

   loadNoticias(){
     this.firestoreService.getCollection<Noticia>(this.path).subscribe( resp => {
       this.noticias = resp;
     });
   }
   ionViewWillEnter() {
    this.menuController.enable(true);
    {

    }
   }

 


}
