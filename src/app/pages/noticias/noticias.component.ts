import { Component, Input, OnInit } from '@angular/core';
import { Noticia } from '../../models';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss'],
})
export class NoticiasComponent implements OnInit {

  @Input() noticia: Noticia;

  constructor() {

   }

  ngOnInit() {
    
  }

}
