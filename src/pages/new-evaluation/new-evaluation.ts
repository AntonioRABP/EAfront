import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, AlertController, Select } from 'ionic-angular';
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
  queries: {select: new ViewChild('select')}
})
export class NewEvaluationPage {
  @ViewChild('select') select: Select;
  loading: Loading;

  curso_disps = [];
  tema_disps = [];
  isDataAvailable = true;
  exam_gener = {course_period_id: 0, name: '', subject: '', start_datetime: '', end_datetime: '', questions_count: 0,  
                correct_points: 0, error_points: 0, attempts_allowed: 0, duration_time: 0, everyone: 1, 
                group_access: '', is_solution_visible: 0,   state: 21, difficulty_level: 0, 
                type: 0, category: 0, is_random: 0, access_code: '', require_access_code: 0};
               
  duracion_min: number;
  codReq: boolean;
  curso_ident: string;
  isVisible = false;
  constructor(public navCtrl: NavController, 
  			  public navParams: NavParams,
  			  public preEvaluationServiceProvider: PreEvaluationServiceProvider,
  			  public loadingCtrl: LoadingController,
          public alertCtrl: AlertController,
          public cdr: ChangeDetectorRef
          ){ 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewEvaluationPage');
  }

  ionViewWillEnter(){
  	let res = this.preEvaluationServiceProvider.getListCourse();

  	res.subscribe(
  		value => {
        //console.log(value)
  			if (value.success){
          this.curso_disps = value.courses;
          console.log(this.curso_disps);
  			}else{
  				console.log('No se ha podido recuperar los cursos disponibles');
          console.log(typeof value.courses);
          console.log(typeof this.curso_disps);		
        }
  		},
  		err => {console.log('Error: ' + err)},//CONTROLAMOS LOS ERRORES
  		() => console.log('Este es el final')
  		);
  }
  
  enlistarTemas(){
    console.log(this.curso_ident);
  	let res = this.preEvaluationServiceProvider.getListSubjects(Number(this.curso_ident));

  	res.subscribe(
  		value => {
  			if(value.success){
          console.log('=========================================');
  				this.tema_disps = value.data;
          console.log(typeof value.data);
          console.log(typeof this.tema_disps);
          console.log('=========================================');
  			}else{
  				console.log('No se ha podido recuperar los temas por cursos');
  			}
  		},
  		err => {console.log('Error: ' + err)},//CONTROLAMOS LOS ERRORES
  		() => console.log('Este es el final') 
  		);

    this.isVisible = true;
  }  

  public generateEvaluation(){
    this.exam_gener.course_period_id = Number(this.curso_ident);
  	this.exam_gener.duration_time = 60 * this.duracion_min;
  	this.exam_gener.category = 9;
  	this.exam_gener.is_random = 1;
  	if (this.codReq == true){
  		this.exam_gener.require_access_code = 1
  	}else{
  		this.exam_gener.require_access_code = 0
  	};

  	this.preEvaluationServiceProvider.setGeneratePreEvaluation(this.exam_gener.course_period_id, this.exam_gener.name, this.exam_gener.subject,
      this.exam_gener.start_datetime, this.exam_gener.end_datetime, this.exam_gener.questions_count, this.exam_gener.correct_points,
      this.exam_gener.error_points, this.exam_gener.attempts_allowed, this.exam_gener.duration_time, this.exam_gener.everyone,
      this.exam_gener.group_access, this.exam_gener.is_solution_visible, this.exam_gener.state, this.exam_gener.difficulty_level,
      this.exam_gener.type, this.exam_gener.category, this.exam_gener.is_random, this.exam_gener.access_code, this.exam_gener.access_code).subscribe(data => {
          if(data.success){
              let alertRegister = this.alertCtrl.create({
                title: '¡Ha registrado su pregunta!',
                buttons: ['OK']
              });
            alertRegister.present();
      }
  	});
//    this.cdr.detectChanges();
//    this.select.open();
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  
//  wait(ms){
//   var start = new Date().getTime();
//   var end = start;
//   while(end < start + ms) {
//     end = new Date().getTime();
//  }
//}
}
