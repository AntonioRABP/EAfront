import { Component, ViewChild } from '@angular/core';
import { Platform,MenuController,AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Nav } from 'ionic-angular';

import { LoginPage } from '../pages/login/login';
import { ExamenAlumnoPage } from '../pages/examen-alumno/examen-alumno';
import { PerfilEstudiantePage } from '../pages/perfil-estudiante/perfil-estudiante';


import { LogOutServiceProvider } from '../providers/log-out-service/log-out-service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any = LoginPage;

  constructor(platform: Platform, 
              statusBar: StatusBar, 
              splashScreen: SplashScreen,
              public menuCtrl: MenuController,
              public logOutServiceProvider: LogOutServiceProvider,
              private alertCtrl: AlertController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openPagePerfil(){
    this.nav.setRoot(PerfilEstudiantePage);
    this.menuCtrl.close();
  }

  openPageExEstudiante(){
    this.nav.setRoot(ExamenAlumnoPage);
    this.menuCtrl.close();
  }

  logout(){

    let alert = this.alertCtrl.create({
        title: 'Confirmar',
        message: 'Seguro que desesa salir?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
                console.log('Cancel clicked');
            }
          },
          {
            text: 'Salir',
            handler: () => {
              console.log('fin de session');

              let res = this.logOutServiceProvider.logOut();

                res.subscribe(
                  value => {
                    if (value.success){
                      console.log(value);
                    }else{
                      console.log('No se ha podido salir de session.');
                    }
                  },
                  err => {console.log('Error: ' + err)},//CONTROLAMOS LOS ERRORES
                  () => console.log('this is the end')
                );
                this.nav.setRoot(LoginPage);
            }
          }
        ]
      });
      alert.present();    

  }
}

