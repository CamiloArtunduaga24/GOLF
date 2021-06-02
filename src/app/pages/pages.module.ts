import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { PerfilComponent } from './perfil/perfil.component';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';
import { ReglamentoComponent } from './reglamento/reglamento.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { TarjetaComponent } from './tarjeta/tarjeta.component';
import { InicioComponent } from './inicio/inicio.component';
import { ResultadoComponent} from './resultado/resultado.component';
import { ClimaComponent } from './clima/clima.component';
import { NgCalendarModule  } from 'ionic2-calendar';
import { Calendariocomponent } from './calendario/calendario.component';
import { ConsultaScoreComponent} from './consulta-score/consulta-score.component';



@NgModule({
  declarations: [
    HomeComponent,
    PerfilComponent,
    ReglamentoComponent,
    TarjetaComponent,
    ClimaComponent,
    ResultadoComponent,
    Calendariocomponent,
    ConsultaScoreComponent,
    NoticiasComponent,
    InicioComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    IonicModule,
    NgCalendarModule,
    ComponentsModule 
  ],
  exports:[
    ClimaComponent,
    NoticiasComponent,
  ]
})
export class PagesModule { }
