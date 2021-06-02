import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, MenuController, ToastController } from '@ionic/angular';
import { FirestoreService } from '../../services/firestore.service';
import { FirestorageService } from '../../services/firestorage.service';
import { Noticia } from '../../models';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {

  noticias: Noticia [] = [];

newNoticias : Noticia;

enableNewNoticia = false;

 private path = 'Noticias/'

 loading: any;

 newImage = '';
 newFile = '';

  constructor(public menuController: MenuController,
              public firestoreService: FirestoreService,
              public loadingController: LoadingController,
              public toastController: ToastController,
              public alertController: AlertController,
              public firestorageService:FirestorageService) { }

  ngOnInit() {
   this.getNoticias();
  }

  openMenu() { 
    this.menuController.toggle('principal');
  }

  async guardarNoticia(){
    this.presentLoading();
    const path = 'Noticias';
    const name = this.newNoticias.nombre;
    if(this.newFile !== undefined){
      const resp = await this.firestorageService.uploadImage(this.newFile, path, name);
      this.newNoticias.imagen = resp;
    }
    this.firestoreService.createDoc(this.newNoticias, this.path, this.newNoticias.id ).then( resp =>{
         this.loading.dismiss();
         this.presentToast('Guardado con éxito');
    }).catch(error => {
      this.presentToast('No se pudo guardar');
    });
  }

  getNoticias (){
     this.firestoreService.getCollection<Noticia>(this.path).subscribe(resp => {
       this.noticias = resp;
     })
  }

  async deleteNoticia(noticia: Noticia){

      const alert = await this.alertController.create({
        cssClass: 'normal',
        header: 'Advertencia',
        message: 'Seguro desea <strong>eliminar?</strong>',
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
              this.firestoreService.deleteDoc(this.path, noticia.id ).then( resp =>{
                this.presentToast('Eliminado con éxito');
                this.alertController.dismiss();
           }).catch(error => {
             this.presentToast('No se pudo eliminar');
           });
            }
          }
        ]
      });
      await alert.present();
  }

  nuevo() {
    this.enableNewNoticia = true;
    this.newNoticias = {
      nombre: '',
      descripcion: '',
      imagen: '',
      id:this.firestoreService.getId(),
      fecha: new Date()
  };
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'normal',
      message: 'Guardando...',
    });
    await this.loading.present();
    // console.log('Loading dismissed!');
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      cssClass: 'normal',
      message: msg,
      duration: 2000,
      color: 'medium'
    });
    toast.present();
  }
  async newImageUpload(event:any){
     if ( event.target.files && event.target.files[0] ) {
       this.newFile = event.target.files[0];
       const reader = new FileReader();
       reader.onload = ((image) => {
         this.newNoticias.imagen = image.target.result as string;

       });
       reader.readAsDataURL(event.target.files[0]);
     }


  }



}
