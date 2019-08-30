import { Component } from '@angular/core';
import { LugaresService } from '../services/lugares.services';
import { ActivatedRoute } from '@angular/router';
import { google } from '@agm/core/services/google-maps-types';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html'
})
export class CrearComponent {
lugar:any = {};
id :any =null;
constructor(private lugaresServices:LugaresService, private route:ActivatedRoute, private http: HttpClient){
  this.id = this.route.snapshot.params['id'];
  if (this.id != 'new'){
    this.lugaresServices.getLugar(this.id).valueChanges()
    .subscribe((lugar)=> {
      this.lugar = lugar;
    })
  }
}
guardarLugar(){
  var direccion = this.lugar.calle+','+this.lugar.ciudad+','+this.lugar.pais;
  this.http.get<{status: string, results: any[]}>('https://maps.googleapis.com/maps/api/geocode/json?address='+direccion+'&key='+'AIzaSyAi-LaJnkdbBKkFhRXIOCIj_235yLtHbow',
     {responseType: 'json'}
   ).subscribe(e => {
     if (e.status === 'OK') {
       this.lugar.lng = e.results[0].geometry.location.lng; 
       this.lugar.lat = e.results[0].geometry.location.lat; 
       if (this.id != 'new'){
        this.lugaresServices.editarLugar(this.lugar);
        alert('Negocio editado con exito');
      }else{
        this.lugar.id =Date.now();
        this.lugaresServices.guardarLugar(this.lugar);
        alert('Negocio Guardado con exito');
      }
      this.lugar={};
     }else{
      alert('No devolvio bien');
      console.log(e);
      debugger;
     }
   });
  }
}
/*
----------------------
ejemplo 1
guardarLugar(){
  var direccion = this.lugar.calle+','+this.lugar.ciudad+','+this.lugar.pais;
  var url = this.lugaresServices.obtenerGeoData(direccion);
  if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition((position: Position) => 
    {
      if (position){
        this.lugar.lat = position.coords.latitude;
        this.lugar.lng = position.coords.longitude;
        if (this.id != 'new'){
          this.lugaresServices.editarLugar(this.lugar);
          alert('Negocio editado con exito');
        }else{
          this.lugar.id =Date.now();
          this.lugaresServices.guardarLugar(this.lugar);
          alert('Negocio Guardado con exito');
        }
        this.lugar={};
      }
    },
    (error: PositionError) => console.log(error));
  }else{
    alert('Geolocalizacion no soportada.');
  }
}*/
//--ejemplo2
/*
guardarLugar() {
  var direccion = this.lugar.calle+','+this.lugar.ciudad+','+this.lugar.pais;
  var url = this.lugaresServices.obtenerGeoData(direccion);
	var geocoder = new google.maps.Geocoder();
	geocoder.geocode({'address' : url}, function (results, status) {
		if (status === google.maps.GeocoderStatus.OK) {
			var firstAddress = results[0];
			this.lugar.lat = firstAddress.geometry.location.k;
      this.lugar.lng = firstAddress.geometry.location.B;
      if (this.id != 'new'){
        this.lugaresServices.editarLugar(this.lugar);
        alert('Negocio editado con exito');
      }else{
        this.lugar.id =Date.now();
        this.lugaresServices.guardarLugar(this.lugar);
        alert('Negocio Guardado con exito');
      }
      this.lugar={};
			//var marker = create(latitude, longitude);
			//invokeSuccessCallback(successCallback, marker);
		} else {
			alert("Unknown address: " + direccion);
		}
	});
}
ejemplo 3
    const lat = 45.45121212;
    const long = 45.451564;
    const TU_LLAVE = 'TU_LLAVE';
    this.http.get<{status: string, results: any[]}>(
         `https://maps.googleapis.com/maps/api/geocode/json?address=${lat},${long}&key=${TU_LLAVE}`,
          {responseType: 'json'}
        ).subscribe(e => {
          if (e.status === 'OK') {
            console.log(e.results[0].formatted_address);
          }
        });
*/




