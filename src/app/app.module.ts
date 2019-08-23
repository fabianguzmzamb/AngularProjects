import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/Forms';
import { Routes,RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LugarComponent } from './lugares/lugar.component';
import { ContactoComponent } from './contacto/contacto.component';
import {DetalleComponent} from './detalle/detalle.component';

import { ResaltarDirective } from './directives/resaltar.directives';
import { ContarClickDirective } from './directives/contar-clicks.directive';
import { LugaresService } from './services/lugares.services';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { CrearComponent } from './crear/crear.component';
import { HttpClientModule } from '@angular/common/http';

const appRoutes: Routes = [
 {path:'',component: AppComponent},
 {path:'app',component: AppComponent},
 {path:'detalle/:id',component: DetalleComponent},
 {path:'contacto',component: ContactoComponent},
 {path:'crear/:id',component: CrearComponent},
 {path:'lugares',component: LugarComponent},
];
export const firebaseConfig = {
  apiKey: "AIzaSyA1L0RWd8IxUsfCpTzM6RebX_EaZxipKI4",
  authDomain: "platzisquare-dbaab.firebaseapp.com",
  databaseURL: "https://platzisquare-dbaab.firebaseio.com",
  storageBucket: "",
  messagingSenderId: "968265231272",
  appId: "1:968265231272:web:01ebd0cef094f900"
};
@NgModule({
  declarations: [
    AppComponent,
    LugarComponent,
    DetalleComponent,
    ResaltarDirective,
    ContactoComponent,
    CrearComponent,
    ContarClickDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCGQIcYmvO3TNYE8dMqDTcs3YOtGsFMrRE'
    }),
    RouterModule.forRoot(appRoutes),
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    HttpClientModule,
    AngularFireAuthModule
  ],
  providers: [LugaresService],
  bootstrap: [AppComponent]
})
export class AppModule { }
