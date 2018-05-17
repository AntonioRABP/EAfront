import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

import { IonicPage, NavController, NavParams, AlertController  } from 'ionic-angular';

import { LoginServiceProvider } from '../../providers/login-service/login-service';

import {HomePage} from '../home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

	typeLogin = "login";
	user = {username: '', password: ''};

  constructor(public navCtrl: NavController, 
  				public navParams: NavParams,
          public serviceLogin: LoginServiceProvider,
          public alertCtrl: AlertController,
          private storage: Storage) {
  }

  ionViewDidLoad() {
   	console.log('ionViewDidLoad LoginPage');
  }

  isLogin(){
  	let res = this.serviceLogin.getSession(this.user);
 
    res.subscribe(
      value => {

        if (value.success) {
          console.log("Welcome!" + value.data.session_id + value.data.expires_at);
          this.storage.set("session_id" , value.data.session_id);
          this.storage.set("expires_at" , value.data.expires_at);
          this.navCtrl.setRoot(HomePage);
        }else{
          console.log("Contraseña Equivocada");
          let alert = this.alertCtrl.create({
            title: 'Sin Acceso! :(',
            subTitle: 'Puede que tu usuario y/o contraseña sean incorrectas.',
            buttons: ['OK']
          });
          alert.present();
        }

      },
      err => {console.log('Error: ' + err)},
      () => console.log('this is the end')
    );
  }
}
