import { Injectable } from "@angular/core";
import { AngularFireDatabase } from '@angular/fire/database';
import {HttpClient} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable()
export class LugaresService{
  API_ENDPOINT = 'https://platzisquare-dbaab.firebaseio.com';
    lugares:any = [
        {id:1,plan:'pagado',cercania:1 , distancia:1,active : true ,nombre :'Floreria la Gardenia'},
        {id:2,plan:'gratuito',cercania:1 , distancia:1.8,active : true ,nombre :'Donas la pasadita'},
        {id:3,plan:'gratuito',cercania:2 , distancia:5,active : true ,nombre :'Veterinaria Huellitas felices'},
        {id:4,plan:'gratuito',cercania:3 , distancia:10,active : false ,nombre :'Sushi Sushiworld'},
        {id:5,plan:'pagado',cercania:3 , distancia:35,active : true ,nombre :'Panaderia LaPana'},
        {id:6,plan:'gratuito',cercania:3 , distancia:120,active : true ,nombre :'Verduleria Doña Tita'}
       ];
       constructor (private afDB:AngularFireDatabase, private http: HttpClient){
             
       }
       public getLugares(){
        //return this.afDB.list('lugares/');
        //obtenemos los negocios
        return this.http.get(this.API_ENDPOINT+'/.json')
        .pipe(map((resultado: any) => resultado.lugares));
       }  
       public buscarLugar(id){
        //return this.afDB.list('lugares/'+id);
        return this.lugares.filter((lugar) =>{return lugar.id == id})[0] || null;
      }
      public guardarLugar(lugar){
        //this.afDB.database.ref('lugares/'+lugar.id).set(lugar);
        const headers = new HttpHeaders({"Content-Type":"application/json"});
        return this.http.post(this.API_ENDPOINT+'/lugares.json',lugar,{headers : headers});
      }
      public obtenerGeoData(direccion){
          //http://maps.google.com/maps/api/geocode/json?address=9-55+calle+72,+Bogota,Colombia
          return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address='+direccion+'&key='+'AIzaSyCGQIcYmvO3TNYE8dMqDTcs3YOtGsFMrRE');
      }
      public getLugar(id){
        //obtengo el registro segun el id correspondiente
         return this.afDB.object('lugares/'+id);
      }
      public editarLugar(lugar){
        //se edita el lugar segun el id correspondiente
        this.afDB.database.ref('lugares/'+lugar.id).set(lugar);
      }
}