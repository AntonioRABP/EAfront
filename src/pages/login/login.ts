import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams, AlertController  } from 'ionic-angular';

import { LoginServiceProvider } from '../../providers/login-service/login-service';

import {HomePage} from '../home/home';
import { ExamenAlumnoPage } from '../examen-alumno/examen-alumno';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

	typeLogin = "login"; //TIPO DE VISTA QUE SE MOSTRARA (PUEDE SER LOGIN O REGISTRO)
	user = {username: '', password: ''}; //VALORES PARA EL FORM DE LOGIN
  listExamenes = {};

  constructor(public navCtrl: NavController, 
  				public navParams: NavParams,
          public serviceLogin: LoginServiceProvider,
          public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
   	console.log('Carga LoginPage');
  }

  isLogin(){
    //CONSULTAMOS EL SERVICIO PARA OBTENER LA SESION
    let res = this.serviceLogin.getSession(this.user);

    //NOS SUSCRIBIMOS AL SERVICIO
    res.subscribe(
      value => {
        //SI DEVUELVE TRUE ES POR QUE NOS HEMOS LOGUEADO CORRECTAMENTE
        if (value.success) {
          console.log("Welcome!");
          //GUARDAMOS LOS VALORES EN LA BD DEL FRONT
          window.localStorage.setItem("s-session", value.data.session_id);

          console.log('Redirigimos a la vista de examenes');
          this.navCtrl.setRoot(ExamenAlumnoPage);//HomePage);//REDIRIGIMOS AL HOME
        }else{
          //SI NO NOS HEMOS LOGUEADO LANZAMOS UNA ALERTA
          console.log("Contraseña Equivocada");
          let alert = this.alertCtrl.create({
            title: 'Sin Acceso! :(',
            subTitle: 'Puede que tu usuario y/o contraseña sean incorrectas.',
            buttons: ['OK']
          });
          alert.present();
        }

      },
      err => {console.log('Error: ' + err)},//CONTROLAMOS LOS ERRORES
      () => console.log('this is the end')
    );
  }


  isRegister(){
    
  }
  //CAMBIAMOS EL PARAMETRO PARA MOSTRAR EL REGISTRO
  goRegister(){
    this.typeLogin = 'register';
  }
  //CAMBIAMOS EL PARAMETRO PARA MOSTRAR EL LOGIN
  goLogin(){
    this.typeLogin = 'login';
  }
}
