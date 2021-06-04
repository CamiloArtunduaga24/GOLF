import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { FireauthService } from './services/fireauth.service';
import { ReglamentoService } from './services/reglamento.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  admin=false;
  constructor(private fireauthService: FireauthService,
              public infoReglamento: ReglamentoService) {
                this.initializeApp();
              }

                initializeApp() {
                  this.getUid();
                }

              toggleTheme(event){
                if(event.detail.checked){
                  document.body.setAttribute('color-theme','dark')
                }else{
                  document.body.setAttribute('color-theme','light')
                }
               }
               getUid() {
                this.fireauthService.estateAuth().subscribe( resp => {
                  if(resp !== null) {
                    if ( resp.uid == 'avDpZUmDLye6TxYoK91JkDIddHM2') {
                      this.admin = true;         
                    }else {      
                      this.admin = false;        
                    }        
                  } else {         
                    this.admin = false;         
                  }     
                });
              }   

}


