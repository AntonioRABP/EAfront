import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController,LoadingController,MenuController} from 'ionic-angular';
import { RegisterServiceProvider } from '../../providers/register-service/register-service';
import { LoginPage } from '../login/login';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  registerForm : FormGroup;
  
  constructor(public navCtrl: NavController, 
              public menuCtrl: MenuController,
              public navParams: NavParams,
              public serviceRegister: RegisterServiceProvider,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public formBuilder : FormBuilder) {           
                this.menuCtrl.enable(false,'MenuStudent');
                
                //Validación del formulario
                this.registerForm = formBuilder.group({
                  username : ['',Validators.required],
                  password : ['',Validators.required],
                  nombre : ['',Validators.required],
                  apellido : ['',Validators.required],
                  email : ['',[Validators.compose([Validators.required, Validators.email])]]
                })
}

  //campos para el registro
  userRegister = {username: '', password: '', nombres: '', apellidos: '', email: ''};

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  isRegister(){
    if(this.registerForm.valid){
    //const loader = this.loadingCtrl.create({
   //   spinner : "bubbles",
    //  content: "Registrandote...",
    //});
   // loader.present();

    this.serviceRegister.setRegister(this.userRegister).subscribe(
      data => {
        console.log('antes del if')
        if(data.success){
            console.log(data)
            //loader.dismiss()
            let alertRegister = this.alertCtrl.create({
              title: '¡Se ha registrado!',
              subTitle: 'Revise su correo para verificar su cuenta.',
              buttons: [
                {
                  text:'OK',
                  handler: () => {
                    this.navCtrl.setRoot(LoginPage)
                  }
                }]
            });
          alertRegister.present();
        }
        else{
          console.log('No entró al if');
        }
      },
      err => {console.log('Error: ' + err)},
      () => console.log('this is the end')
    );
  }
  else{
    console.log("formulario inválido")
  }}

  goLogin(){
    this.navCtrl.setRoot(LoginPage)
  }
}