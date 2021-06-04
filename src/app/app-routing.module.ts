import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { TarjetaComponent } from './pages/tarjeta/tarjeta.component';
import { ReglamentoComponent } from './pages/reglamento/reglamento.component';
import { ClimaComponent } from './pages/clima/clima.component';
import { Calendariocomponent} from './pages/calendario/calendario.component';
import { ConsultaScoreComponent} from './pages/consulta-score/consulta-score.component';
import { canActivate } from '@angular/fire/auth-guard';
import { map } from 'rxjs/operators';
import { ReglaComponent } from './components/regla/regla.component';

const isAdmin = (next: any) => map( (user: any) => !!user && 'avDpZUmDLye6TxYoK91JkDIddHM2' === user.uid);

const routes: Routes = [
  {path: 'perfil', component:PerfilComponent },
  {path: 'inicio', component:InicioComponent, ...canActivate(isAdmin) },
  {path: 'home', component:HomeComponent, },
  {path: 'tarjeta', component:TarjetaComponent },
  {path: 'reglamento', component:ReglamentoComponent },
  {path: 'clima', component:ClimaComponent },
  {path: 'calendario', component:Calendariocomponent},
  {path: 'regla/:id', component:ReglaComponent },
  {path: 'consulta-score', component:ConsultaScoreComponent},
  {path: '', component: HomeComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
