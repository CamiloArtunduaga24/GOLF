import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ReglamentoService, Regla} from '../../services/reglamento.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reglamento',
  templateUrl: './reglamento.component.html',
  styleUrls: ['./reglamento.component.scss'],
})
export class ReglamentoComponent implements OnInit {

  reglas:Regla [] = [];

  constructor( public menuController: MenuController,
               public reglamento: ReglamentoService,
               private router: Router  ) {
                 
                }

  ngOnInit() {
    this.reglas = this.reglamento.getReglas();
    // console.log(this.reglas);
  }

  openMenu() { 
    this.menuController.toggle('principal');
  }

  verReglamento(idx: number){
    this.router.navigate( ['/regla', idx] );
    
  }

}
