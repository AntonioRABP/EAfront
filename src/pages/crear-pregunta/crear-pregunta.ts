import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';
import { PreQuestionServiceProvider } from '../../providers/pre-question-service/pre-question-service';
/**
 * Generated class for the CrearPreguntaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-crear-pregunta',
  templateUrl: 'crear-pregunta.html',
})
export class CrearPreguntaPage {
  preg_gener = {name: '', header: {text: '', pictures: ['']},
                statement: {text: '', pictures:[''], alternatives:[{text:'', pictures: ['']},{text:'', pictures: ['']},{text:'', pictures: ['']},{text:'', pictures: ['']},{text:'', pictures: ['']}]},
                answer: 0, solution: {text:'', pictures:[''],videos:['']}, source:'', pre_evaluation_id:0,
                topic_id: 0, difficulty_level: 0
              };
  eval_disps = [];
  alt_correctas = [false,false,false,false,false];
  constructor(public navCtrl: NavController, 
              public alertCtrl: AlertController, 
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public preQuestionServiceProvider: PreQuestionServiceProvider
              ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CrearPreguntaPage');
  }

  ionViewWillEnter(){
    let res = this.preQuestionServiceProvider.getListEvaluation();

    res.suscribe(
      value => {
        if (value.success){
          this.eval_disps = value.data;
        }else{
          console.log('No se ha podido recuperar las pre-evaluaciones disponibles');
        }
      },
      err => {console.log('Error: ' + err)},
      () => console.log('Este es el final')
      );
  }

  doConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Registrar pregunta?',
      message: 'Esta usted de acuerdo en registrar esta pregunta en la base de datos?',
      buttons: [
        {
          text: 'Rechazar',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present()
  }

  regQuestion(){
    var num:number=0;
    var i:number;
    var aux:number=0;
    for(i=0;i<=4;i++){
      if (this.alt_correctas[i] = true){
        aux = 1;
      }else{
        aux = 0;
      }
      num = num*10 + aux;
    }
    this.preg_gener.answer = num;
    this.preQuestionServiceProvider.setGeneratePreQuestion(this.preg_gener).suscribe(data => {
        if(data.success){
          let alertRegister = this.alertCtrl.create({
            title: '¡Ha registrado su pregunta!',
            buttons: ['OK']
          });
        alertRegister.present();
      }
    });
  }
}


