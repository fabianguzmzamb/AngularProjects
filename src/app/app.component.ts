import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My App Nueva';
  a= 5;
  b= 3;
  listo = false;
  nombre = '';
  apellido = '';

  constructor (){
  	setTimeout(() => {
    this.listo =true;
  	},3000)
  }
  haceralgo(){
  	alert('Haciendo Algo');
  }
}
