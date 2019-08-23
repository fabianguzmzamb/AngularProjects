import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { LugaresService } from '../services/lugares.services';
@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html'
})
export class DetalleComponent {
  idref = 0;

  id = null;
  lugar:any = {};
  constructor(private route: ActivatedRoute,private lugaresServices:LugaresService){
    console.log(this.route.snapshot.params['id']);
    console.log(this.route.snapshot.queryParams['action2']);
    console.log(this.route.snapshot.queryParams['referer']);
    this.idref = this.route.snapshot.params['id'];
    this.id = this.route.snapshot.params['id'];
    this.lugar = this.lugaresServices.buscarLugar(this.id);
  }
}
