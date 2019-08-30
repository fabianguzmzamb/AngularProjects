import { Component } from '@angular/core';
import { LugaresService } from '../services/lugares.services';
@Component({
  selector: 'app-lugares',
  templateUrl: './lugar.component.html'
})
export class LugarComponent {
  title = 'Componente Lugar';
  lugares = null;
  errormsg = '';
  lat:number = -31.388792;
  lng:number = -64.2618386;
  constructor(private lugaresServices: LugaresService){
    lugaresServices.getLugares()//.valueChanges()
    .subscribe(lugares => {
       this.lugares = lugares; //.json();
       var me = this;
       //transformacion de objecto a array (importante)
       me.lugares = Object.keys(me.lugares).map(function (key) {return me.lugares [key];});
      },error =>{
        console.log(error);
        alert('Tenemos dificultades tecnicas :'+ error);
        this.errormsg = 'Tenemos dificultades tecnicas :'+ error;
      });
     //this.lugares = lugaresServices.getLugares();
  }
}
