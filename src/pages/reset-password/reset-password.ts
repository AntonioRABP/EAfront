import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {LoginPage} from '../login/login'

@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {

  resetForm : FormGroup;
 

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public formBuilder : FormBuilder) {
    //Validación del formulario
    this.resetForm = formBuilder.group({
      email : ['',[Validators.compose([Validators.required, Validators.email])]]
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPasswordPage');
  }
  
  //Método para regresar a la página de Login
  returnToLogin(){
    this.navCtrl.setRoot(LoginPage);
  }

  

}
