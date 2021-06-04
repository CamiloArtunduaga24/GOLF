import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Cliente } from '../../models';
import { FireauthService } from '../../services/fireauth.service';
import { FirestorageService } from '../../services/firestorage.service';
import { FirestoreService } from '../../services/firestore.service';
import { FormControl, FormGroup, Validators } from '@angular/forms'


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  formularioRegistro = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.minLength(6)] ),
    email: new FormControl('', [Validators.required, Validators.email]), 
    celular: new FormControl('', [Validators.required, Validators.minLength(10)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])

  });
  pruebaCarajo() {
    console.log(this.formularioRegistro.value);
    console.log('Formulario valido:', this.formularioRegistro.valid);
  }

  get nombre() {
    return this.formularioRegistro.get('nombre');
  }
  get email() {
    return this.formularioRegistro.get('email');
  }
  get celular() {
    return this.formularioRegistro.get('celular');
  }

  get password() {
    return this.formularioRegistro.get('password');
  }

  loading: any;
  


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
              public loadingController: LoadingController,
              public toastController: ToastController,
              public alertController: AlertController,
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
    this.onRestForm();
    this.presentToast('Registrado con éxito');
  }

  async guardarUser(){
    const path = 'Clientes';
    const name = this.cliente.nombre;
    if(this.newFile !== undefined){
      const resp = await this.firestorageService.uploadImage(this.newFile, path, name);
      this.cliente.imagen = resp;
    }
    this.firestoreService.createDoc(this.cliente, path, this.cliente.uid ).then( resp =>{

    }).catch(error => {

    });
  }

  onRestForm() {
    this.formularioRegistro.reset();
  }

  async salir() {
    // this.auth.logout();
    // this.suscriberUserInfo.unsubscribe();
    // this.onRestForm();
    const alert = await this.alertController.create({
      cssClass: 'normal',
        header: 'Cerrar sesión',
        message: 'Seguro desea <strong>salir?</strong>',
        buttons: [
          {
            text: 'cancelar',
            role: 'cancel',
            cssClass: 'normal',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Ok',
            handler: () => {
              console.log('Confirm Okay');
              this.auth.logout().then( resp =>{
                this.onRestForm();
                this.suscriberUserInfo.unsubscribe();
                this.alertController.dismiss();
           }).catch(error => {
             this.presentToast('No se pudo salir');
           });
            }
          }
        ]
    });
    await alert.present();

    
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
      this.presentToast2('Bienvenido! ');        
    }).catch( error => {
      this.presentToast('No se pudo ingresar')
      this.presentToast('Verifica bien tus datos')
    } )

  }

  ionViewWillEnter() {
    this.menuController.enable(false);
   }

   async presentToast(msg: string) {
    const toast = await this.toastController.create({
      cssClass: 'normal',
      position: 'top',
      message: msg,
      duration: 2000,
      color: 'danger'
    });
    toast.present();
  }

  async presentToast2(msg: string) {
    const toast = await this.toastController.create({
      cssClass: 'normal',
      position: 'middle',
      message: msg,
      duration: 1500,
      color: 'success'
    });
    toast.present();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'normal',
      message: 'Guardando...',
    });
    await this.loading.present();
    // console.log('Loading dismissed!');
  }


}
