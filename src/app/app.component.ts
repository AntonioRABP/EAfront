import { Component, ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Nav } from 'ionic-angular';

import { LoginPage } from '../pages/login/login';
import { ExamenAlumnoPage } from '../pages/examen-alumno/examen-alumno';
import { PerfilEstudiantePage } from '../pages/perfil-estudiante/perfil-estudiante';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any = LoginPage;

  constructor(platform: Platform, 
              statusBar: StatusBar, 
              splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openPagePerfil(){
    this.nav.setRoot(PerfilEstudiantePage)
  }

  openPageExEstudiante(){
    this.nav.setRoot(ExamenAlumnoPage)
  }
}

