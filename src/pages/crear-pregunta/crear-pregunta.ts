import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
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
  preg_gener = {name: '', header: {text: '', pictures: []},
                statement: {text: '', pictures:[], alternatives:[{text:'', picture: []},{text:'', picture: []},{text:'', picture: []},{text:'', picture: []},{text:'', picture: []}]},
                answer: 0, solution: {text:'', pictures:[],videos:[]}, source:'', pre_evaluation_id:0,
                topic_id: 0, difficulty_level: 1
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
    res.subscribe(
      value => {
        if (value.success){
          this.eval_disps = value.data;
          console.log(this.eval_disps);
        }else{
          console.log('No se ha podido recuperar las pre-evaluaciones disponibles');
          console.log('No pude entrar');
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
            console.log(this.preg_gener);
                this.preQuestionServiceProvider.setGeneratePreQuestion(this.preg_gener.name, JSON.stringify(this.preg_gener.header), JSON.stringify(this.preg_gener.statement),
                                                           this.preg_gener.answer, JSON.stringify(this.preg_gener.solution), this.preg_gener.source,
                                                           Number(this.preg_gener.pre_evaluation_id), Number(this.preg_gener.topic_id) ,this.preg_gener.difficulty_level).subscribe(data => {
                if(data.success){
                  let alertRegister = this.alertCtrl.create({
                    title: '¡Ha registrado su pregunta!',
                    buttons: ['OK']
                  });
                alertRegister.present();
              }else{
                console.log('No se ha registrado su pregunta y ella no te ama :v');
              }
            });
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

    for(i=4;i>=0;i--){
      if (this.alt_correctas[i] == true ){
        aux = 2**(4-i);
      }else{
        aux = 0;
      }
      num = num + aux;
    }

    this.preg_gener.answer = num;

  }
}


