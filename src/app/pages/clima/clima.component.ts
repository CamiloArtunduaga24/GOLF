import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-clima',
  templateUrl: './clima.component.html',
  styleUrls: ['./clima.component.scss'],
})
export class ClimaComponent implements OnInit {


  dataClima:any;
  constructor( public menuController: MenuController ) { }

  ngOnInit() {
    this.getDataClima();
    console.log(this.dataClima);
    console.log("aqui se ejecuta la api");
    
    
  }

  
  openMenu() { 
    this.menuController.toggle('principal');
  }

  getDataClima(){
    let data = JSON.parse('{"coord":{"lon":-74.098,"lat":4.8094},"weather":[{"id":501,"main":"Rain","description":"moderate rain","icon":"10d"}],"base":"stations","main":{"temp":287.15,"feels_like":286.75,"temp_min":287.15,"temp_max":287.15,"pressure":1028,"humidity":82},"visibility":10000,"wind":{"speed":2.06,"deg":270},"rain":{"1h":3.65},"clouds":{"all":75},"dt":1619807942,"sys":{"type":1,"id":8582,"country":"CO","sunrise":1619779493,"sunset":1619823723},"timezone":-18000,"id":3685733,"name":"Cota","cod":200}');
    this.setDataClima(data);
  }
  setDataClima(data){
    this.dataClima = data;
    let sunsetTime = new Date(this.dataClima.sys.sunset * 1000);
    this.dataClima.sunset_time = sunsetTime.toLocaleDateString();
    let currentDate = new Date();
    this.dataClima.isDay = (currentDate.getTime() < sunsetTime.getTime() );
    this.dataClima.temp_celcius = (this.dataClima.main.temp - 273.15).toFixed(0);
    this.dataClima.temp_min = (this.dataClima.main.temp_min - 273.15).toFixed(0);
    this.dataClima.temp_max = (this.dataClima.main.temp_max - 273.15).toFixed(0);
    this.dataClima.pressure = (this.dataClima.main.pressure - 273.15).toFixed(0);
    this.dataClima.temp_feels_like = (this.dataClima.main.temp_feels_like - 273.15).toFixed(0);

  }

}
