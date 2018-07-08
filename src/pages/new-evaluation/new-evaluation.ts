import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';
import { PreEvaluationServiceProvider } from '../../providers/pre-evaluation-service/pre-evaluation-service';

/**
 * Generated class for the NewEvaluationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-evaluation',
  templateUrl: 'new-evaluation.html',
})
export class NewEvaluationPage {
  loading: Loading;
  curso_disps = [];
  tema_disps = [];
  exam_gener = {name: '', subject: '', question_count: 0, 
                correct_points: 0, error_points: 0, attempts_allowed: 0,
                duration_time: 0, course_id: 0, difficulty_level: 0,
                type: 0, category: 0, is_random: 0, access_code: '',
                require_access_code: 0};
  duracion_min: number;
  codReq: boolean;

  constructor(public navCtrl: NavController, 
  			  public navParams: NavParams,
  			  public preEvaluationServiceProvider: PreEvaluationServiceProvider,
  			  public loadingCtrl: LoadingController,
          public alertCtrl: AlertController
          ){ 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewEvaluationPage');
  }

  ionViewWillEnter(){
  	let res = this.preEvaluationServiceProvider.getListCourse();
  
  	res.subscribe(
  		value => {
  			if (value.success){
          
  				this.curso_disps = value.data;
          console.log(this.curso_disps);
  			}else{
  				console.log('No se ha podido recuperar los cursos disponibles');
  			}
  		},
  		err => {console.log('Error: ' + err)},//CONTROLAMOS LOS ERRORES
  		() => console.log('Este es el final')
  		);
  }

  enlistarTemas(idCurso){
  	var node = document.getElementById(idCurso);
  	let res = this.preEvaluationServiceProvider.getListSubjects(node);

  	res.subscribe(
  		value => {
  			if(value.success){
  				this.tema_disps = value.data;
  			}else{
  				console.log('No se ha podido recuperar los temas por cursos');
  			}
  		},
  		err => {console.log('Error: ' + err)},//CONTROLAMOS LOS ERRORES
  		() => console.log('Este es el final') 
  		);
  }  

  public generateEvaluation(){
  	this.exam_gener.duration_time = 60 * this.duracion_min;
  	this.exam_gener.category = 9;
  	this.exam_gener.is_random = 1;
  	if (this.codReq = true){
  		this.exam_gener.require_access_code = 1
  	}else{
  		this.exam_gener.require_access_code = 0
  	};

  	this.preEvaluationServiceProvider.setGeneratePreEvaluation(this.exam_gener).subscribe(data => {
          if(data.success){
              let alertRegister = this.alertCtrl.create({
                title: '¡Ha registrado su pregunta!',
                buttons: ['OK']
              });
            alertRegister.present();
      }
  	});
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }
  
}
