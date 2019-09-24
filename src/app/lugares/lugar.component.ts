import { Component } from '@angular/core';
import { LugaresService } from '../services/lugares.services';
import {trigger,state,style,transition,animate} from "@angular/animations";
@Component({
  selector: 'app-lugares',
  templateUrl: './lugar.component.html',
  animations: [
    trigger('contenedorAnimable',[
      state('inicial',style({
        opacity: 0 /*,
        backgroundColor: 'green',
        transform: 'rotate3d(0,0,0,0deg)'*/
      })),
      state('final',style({
        opacity: 1 /*,
        backgroundColor: 'yellow',
        transform: 'rotate3d(5,10,20,30deg)'*/
      })),
      transition('inicial => final',animate(2000)),
      transition('final => inicial',animate(1000)),
    ])
  ]
})
export class LugarComponent {
  title = 'Componente Lugar';
  state = 'inicial';
  lugares = null;
  errormsg = '';
  lat:number = -31.388792;
  lng:number = -64.2618386;
  animar(){
    //si el estado es final lo pasamos a inical , else lo pasamos a final
    this.state = (this.state === 'final') ? 'inicial' : 'final';
  }
  animacionInicia(e){
    //callbacks : para saber exactamente q pasa con la animacion
    console.log('Iniciado!');
    console.log(e);
  }
  animacionTermina(e){
    //callbacks : para saber exactamente q pasa con la animacion
    console.log('Terminado!');
    console.log(e);
  }
  constructor(private lugaresServices: LugaresService){
    //obtenemos todos los lugares
    lugaresServices.getLugares()//.valueChanges()
    .subscribe(lugares => {
       this.lugares = lugares; //.json();
       var me = this;
       //transformacion de objecto a array (importante)
       me.lugares = Object.keys(me.lugares).map(function (key) {return me.lugares [key];});
       this.state = 'final';
      },error =>{
        console.log(error);
        alert('Tenemos dificultades tecnicas :'+ error);
        this.errormsg = 'Tenemos dificultades tecnicas :'+ error;
      });
     //this.lugares = lugaresServices.getLugares();
  }
}
