import { Component } from '@angular/core';
import { LugaresService } from '../services/lugares.services';
@Component({
  selector: 'app-lugares',
  templateUrl: './lugar.component.html'
})
export class LugarComponent {
  title = 'Componente Lugar';
  lugares = null;
  lat:number = -31.388792;
  lng:number = -64.2618386;
  constructor(private lugaresServices: LugaresService){
    lugaresServices.getLugares().valueChanges()
    .subscribe(lugares => { this.lugares = lugares});
     
     this.lugares = lugaresServices.getLugares();
  }
}
