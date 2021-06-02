import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Cliente } from '../../models';
import { FireauthService } from '../../services/fireauth.service';
import { FirestorageService } from '../../services/firestorage.service';
import { FirestoreService } from '../../services/firestore.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {

  cliente: Cliente = {
    uid: '',
    email: '',
    nombre: '',
    password: '',
    celular: '',
    imagen: '',
    referencia: '',
    ubicacion: null,
  };
  newFile: any;
  uid = '';
  suscriberUserInfo : Subscription;
  ingresaEnable = false;
  

  constructor(public menuController: MenuController,
              public auth: FireauthService,
              public firestorageService:FirestorageService,
              public firestoreService: FirestoreService,
              ) {

                this.auth.estateAuth().subscribe(resp => {
                  console.log(resp);;
                  
                  if (resp !== null) {
                    this.uid = resp.uid;
                    this.getUserInfo(this.uid);
                  } else {
                    this.initCliente();
                    
                  }
                });
               }

  async ngOnInit() {

    const uid = await this.auth.getUid();
    console.log(uid);
  }
  initCliente(){
    this.uid = '';
      this.cliente = {
      uid: '',
      email: '',
      nombre: '',
      password: '',
      celular: '',
      imagen: '',
      referencia: '',
      ubicacion: null,
    };
    console.log(this.cliente);
  }


  async newImageUpload(event:any){
    if ( event.target.files && event.target.files[0] ) {
      this.newFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = ((image) => {
        this.cliente.imagen = image.target.result as string;

      });
      reader.readAsDataURL(event.target.files[0]);
    }
 }

  async registrarse() {
    const credenciales = {
          email: this.cliente.email,
          password: this.cliente.password
    };
    const resp = await this.auth.registrar(credenciales.email, credenciales.password).catch(err => {
      console.log('error', resp );
      
    });  
    const uid = await this.auth.getUid();
    this.cliente.uid = uid;
    this.guardarUser();
  }

  async guardarUser(){
    const path = 'Clientes';
    const name = this.cliente.nombre;
    if(this.newFile !== undefined){
      const resp = await this.firestorageService.uploadImage(this.newFile, path, name);
      this.cliente.imagen = resp;
    }
    this.firestoreService.createDoc(this.cliente, path, this.cliente.uid ).then( resp =>{
      console.log('guardado con exito');
      
    }).catch(error => {
    });
  }



  async salir() {
    this.auth.logout();
    this.suscriberUserInfo.unsubscribe();
  }

  getUserInfo(uid: string){
    const path = 'Clientes';
    this.suscriberUserInfo = this.firestoreService.getDoc<Cliente>(path, this.uid).subscribe( resp => {
            this.cliente = resp;
    });
  }

  ingresar() {
    const credenciales = {
      email: this.cliente.email,
      password: this.cliente.password
    };
    this.auth.login(credenciales.email, credenciales.password).then(resp => {
        console.log('ingreso con exito');
        
    });

  }

  ionViewWillEnter() {
    this.menuController.enable(false);
   }


}
