import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, AlertController, Select } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
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
  curso = {id:0, course_id:0, period:'', teacher_id:0, start_date:'', end_date:'',};
  tema_disps = [];
  isDataAvailable = true;
  exam_gener = {course_period_id: 0, name: '', subject: '', start_datetime: '', end_datetime: '', questions_count: 0,  
                correct_points: 0, error_points: 0, attempts_allowed: 0, duration_time: 0, everyone: 1, 
                group_access: {}, is_solution_visible: 0,   state: 21, difficulty_level: 0, 
                type: 0, category: 0, is_random: 0, access_code: '', require_access_code: 0};
               
  duracion_min: number;
  codReq: boolean;
  curso_ident: string;
  isVisible = false;
  fecha_ini: string;
  fecha_fin: string;
  constructor(public navCtrl: NavController, 
  			  public navParams: NavParams,
  			  public preEvaluationServiceProvider: PreEvaluationServiceProvider,
  			  public loadingCtrl: LoadingController,
          public alertCtrl: AlertController,
          public cdr: ChangeDetectorRef,
          public menuCtrl: MenuController
          ){ 
            this.menuCtrl.enable(false,'MenuStudent');
            this.menuCtrl.enable(true,'MenuTeacher');
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
          this.curso_disps = value.data;
  			}else{
  				console.log('No se ha podido recuperar los cursos disponibles');		
        }
  		},
  		err => {console.log('Error: ' + err)},//CONTROLAMOS LOS ERRORES
  		() => console.log('Este es el final')
  		);
  }
  
  enlistarTemas(){
    var curso_id = 0;
    var found = false;
    var i = 0;
    for (i; found == false ; i++){
      if (Number(this.curso_ident) == Number(this.curso_disps[i].id)){
        found = true;
        curso_id = Number(this.curso_disps[i].course_id);
      } 
    } 
  	let res = this.preEvaluationServiceProvider.getListSubjects(curso_id);

  	res.subscribe(
  		value => {
  			if(value.success){
  				this.tema_disps = value.topics;
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
    var res = this.fecha_ini.substring(0,10);
    var tas = this.fecha_ini.substring(11,19);
    this.exam_gener.start_datetime = res + ' ' + tas;
    //var res = this.fecha_fin.substring(0,10);
    //var tas = this.fecha_fin.substring(11,19);
    this.exam_gener.end_datetime = res + ' ' + tas;

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
      this.exam_gener.type, this.exam_gener.category, this.exam_gener.is_random, this.exam_gener.access_code, this.exam_gener.require_access_code).subscribe(data => {
          if(data.success){
              let alertRegister = this.alertCtrl.create({
                title: '¡Ha registrado su evaluacion!',
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
