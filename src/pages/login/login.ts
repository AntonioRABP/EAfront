import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,LoadingController ,MenuController } from 'ionic-angular';
import { LoginServiceProvider } from '../../providers/login-service/login-service';
import { ExamenAlumnoPage } from '../examen-alumno/examen-alumno';
import { ResetPasswordPage } from '../reset-password/reset-password';
import { RegisterPage } from '../register/register';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm :FormGroup;

	user = {username: '', password: '', rol : ''}; //VALORES PARA EL FORM DE LOGIN
  listExamenes = {};


  constructor(public navCtrl: NavController, 
          public menuCtrl: MenuController,
  				public navParams: NavParams,
          public serviceLogin: LoginServiceProvider,
          public alertCtrl: AlertController,
          public loadingCtrl: LoadingController,
          public formBuilder : FormBuilder) {
    this.menuCtrl.enable(false,'MenuStudent');
    //Validación del formulario
    this.loginForm = formBuilder.group({
      username : ['',Validators.required],
      password : ['',Validators.required],
      rol : ['',Validators.required]
    })
  }



  ionViewDidLoad() {
   	console.log('Carga LoginPage');
  }

  isLogin(){
    if(this.loginForm.valid){
      console.log("formulario valido")
      console.log("isLogin Fired")
      //CONSULTAMOS EL SERVICIO PARA OBTENER LA SESION
      console.log(this.user)
      let res = this.serviceLogin.getSessionStudent(this.user);
      
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
    else{
      console.log("formulario no válido")
    }
  }

  
  //Te envía a la vista de Registro

  goRegister(){
    console.log("goRegister Fired")
    this.navCtrl.setRoot(RegisterPage)
  }

  //Te envía a la vista de Recuperar Contraseña
  goReset(){
    this.navCtrl.setRoot(ResetPasswordPage);
  }


}
