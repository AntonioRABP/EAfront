import { Component,ViewChild } from '@angular/core';
import { ToastController, IonicPage, NavController, NavParams,AlertController, Slides } from 'ionic-angular';
import { ExamenServiceProvider } from '../../providers/examen-service/examen-service';
import { MenuController } from 'ionic-angular';
import { ExamenAlumnoPage } from '../examen-alumno/examen-alumno';

/**
 * Generated class for the ResultadosExamenAlumnoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resultados-examen-alumno',
  templateUrl: 'resultados-examen-alumno.html',
})
export class ResultadosExamenAlumnoPage {

  @ViewChild(Slides) slides: Slides;

  id:number;//id de evaluacion
  showAttempt:boolean = false;
  list_attempt = [];
  nota: '0';
  msg = '';
  dynamicColor = 'dark';
  constructor(public navCtrl: NavController, 
		public navParams: NavParams,
		public examenServiceProvider: ExamenServiceProvider,
		public menuCtrl: MenuController,
		private alertCtrl: AlertController,
		public toastCtrl: ToastController) {

	this.menuCtrl.enable(true,'MenuStudent');
  	this.menuCtrl.enable(false,'MenuTeacher');

  	this.id = navParams.get('id');

  }

	ionViewDidLoad() {
	    console.log('ionViewDidLoad ResultadosExamenAlumnoPage');
	}

  	getAttempt(id_evaluation){
	  	console.log('obtener intentos');
		this.examenServiceProvider.getAttempts(id_evaluation).subscribe(
				value => {
				if (value.success){
					this.list_attempt = value.data;
				}else{
					console.log('No se ha podido recuperar los examenes pendientes del alumno.');
				}
			},
			err => {console.log('Error: ' + err)},//CONTROLAMOS LOS ERRORES
			() => console.log('this is the end')
		);

  	}

  	getResultExam(id_evaluation){
	  	console.log('obtener resultados');
		this.examenServiceProvider.getResultExam(id_evaluation).subscribe(
				value => {
				if (value.success){
					this.nota = value.data;
					if(Number(this.nota)>=18){
						this.msg = 'Felicitaciones por tu esfuerzo!!!';
						this.dynamicColor = 'secondary';
					}else if(Number(this.nota)<10){
						this.msg = 'Sigue esforzandote!!!';
						this.dynamicColor = 'danger';
					}else{
						this.msg = 'Vas por buen camino!!!'
						this.dynamicColor = 'primary';
					}

				}else{
					console.log('No se ha podido recuperar los examenes pendientes del alumno.');
				}
			},
			err => {console.log('Error: ' + err)},//CONTROLAMOS LOS ERRORES
			() => console.log('this is the end')
		);
	}

	ionViewWillEnter(){
		this.getResultExam(this.id);		
		this.getAttempt(this.id);
	}
	irExamen(){
		this.navCtrl.setRoot(ExamenAlumnoPage);
	}

	goPrev(){ this.slides.slidePrev() }
	goNext(){ this.slides.slideNext() }
	changePage(){
		let first =  this.slides.isBeginning();
		let last =  this.slides.isEnd();

		if(first){
			const toast = this.toastCtrl.create({
	      	message: 'Inicio de Intentos',
	      	duration: 3000,
	      	position: 'bottom'
	    	});
	    	toast.present();
		}else if(last){

			const toast = this.toastCtrl.create({
	      	message: 'Fin de intentos',
	      	duration: 3000,
	      	position: 'bottom'
	    	});
	    	toast.present();
		}
	}
	getTime(inputSeconds: number) {
		var sec_num = parseInt(inputSeconds.toString(), 10);
		var hours = Math.floor(sec_num / 3600);
		var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
		var seconds = sec_num - (hours * 3600) - (minutes * 60);
		return this.addo(hours) + ":" + this.addo(minutes) + ":" + this.addo(seconds);
	}
  
  	getFecha(horadia) {
    	let format = new Date(horadia);
    	return this.addo(format.getUTCFullYear()) + "-" + this.addo(format.getUTCMonth()) + "-" + this.addo(format.getUTCDate());
	}
	getMinute(inputSeconds: number) {
		var sec_num = parseInt(inputSeconds.toString(), 10);
		var minutes = Math.floor(sec_num / 60);
		var seconds = sec_num - (minutes * 60);
		return this.addo(minutes) + ":" + this.addo(seconds);
	}
  

  	addo(comp) {
    	return (((comp + "").length == 1) ? "0" + comp : comp);
 	}


}
