import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ReglamentoService {

  private reglas:Regla [] = [
    {
      titulo: "El juego, la Conducta del jugador y las reglas",
      regla: "Establece Los principios fundamentales del juego",
      img:"assets/img/regla.png",
      puntos:"el golf se juega golpeando su bola con un \
      palo y cada hoyo comienza desde el area de salida y \
      termina cuando su bola se emboca sobre el green",
    },
    {
      titulo: "El campo",
      regla: "Límites del Campo y Fuera de Límites",
      img:"assets/img/campo.png",
      puntos:"El área general cubre todo el campo, excepto \
      las cuatro específicas áreas del campo, descritas en la Regla 2.2b \
      Se llama área general porque: Cubre la mayor parte del campo y es donde se \
      jugará normalmente la bola hasta que llegue al green. Incluye todo tipo \
      terreno y objetos fijos o en crecimiento dentro del área, como fairway \
      (calle), rough y árboles."
    },
    {
      titulo: "La Competición",
      regla: "Modalidades de Juego",
      img:"assets/img/competicion.png",
      puntos:"En match play (juego por hoyos) (ver Regla 3.2), un jugador y un contrario \
      compiten uno contra el otro en base a hoyos ganados, perdidos o empatados."
    }

  ];

  constructor( private http: HttpClient ) {
    console.log('Informacion del reglamento'); 
  }

  getReglas():Regla[]{
    return this.reglas;
  }
  getRegla( idx: string ){
    return this.reglas[idx];
  }
}
export interface Regla{
  titulo: string;
  regla: string;
  puntos: string;
  img: string;
};
