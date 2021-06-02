import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ReglamentoService } from '../../services/reglamento.service'

@Component({
  selector: 'app-regla',
  templateUrl: './regla.component.html',
  styleUrls: ['./regla.component.scss'],
})
export class ReglaComponent implements OnInit {

  regla: any = {};

  constructor( public menuController: MenuController,
               public activateRoute: ActivatedRoute,
               private _reglamentoServices: ReglamentoService ) { 
                 this.activateRoute.params.subscribe( params => {
                   this.regla = this._reglamentoServices.getRegla( params['id'] )
                 });
               }

  ngOnInit() {}

  openMenu() { 
    console.log('se abrio esta joda');
    this.menuController.toggle('principal');
  }

}
