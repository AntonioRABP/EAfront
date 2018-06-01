import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController  } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ExamenServiceProvider } from '../../providers/examen-service/examen-service';

import { TimerPage } from '../timer/timer'

//borrar data fake
import {DataExamenAlumno} from './data-examen-alumno'

@IonicPage()
@Component({
  selector: 'page-examen-alumno',
  templateUrl: 'examen-alumno.html',
})
export class ExamenAlumnoPage {

	@ViewChild(TimerPage) timer: TimerPage;

	duracionExamen: number = 0;
	inicioExamen;
	finExamen;
	dataExamenAlumno = new DataExamenAlumno();
	//variables globales
	partExamen = 'Inicio';
	//variables para el inicio
	examen = 'exam-pendiente';
	exam_pendientes = this.dataExamenAlumno.exam_pendientes;
	exam_pasados = this.dataExamenAlumno.exam_pasados;
	//variables para las preguntas
	preguntas = this.dataExamenAlumno.preguntas;
	//variables para el resultado

	constructor(public navCtrl: NavController, 
		public navParams: NavParams,
		public examenServiceProvider: ExamenServiceProvider,
		private alertCtrl: AlertController,
  		private storage: Storage) {
	}

	ionViewDidLoad() {
	    console.log('Inicializando ExamenAlumnoPage');

	}

	ionViewWillEnter(){

		let res = this.examenServiceProvider.getListExam();

	    res.subscribe(
	      value => {
	        //SI DEVUELVE TRUE ES POR QUE NOS HEMOS LOGUEADO CORRECTAMENTE
	        console.log(value);

	      },
	      err => {console.log('Error: ' + err)},//CONTROLAMOS LOS ERRORES
	      () => console.log('this is the end')
	    );
	}

	//FUNCIONES PARA VISTA DE EXAMENES
	irExamen(){

		this.partExamen = 'Inicio';
	}
	//FUNCIONES PARA RENDIR EXAMEN
	rendirExamen($id){

		let message = 'El examen durará: ';
		let duracion;
		this.exam_pendientes.forEach(function (elemento, indice, array) {
    		if (elemento.id == $id){
    			console.log(elemento.id,elemento.duracion);
    			duracion=elemento.duracion;
				message = message.concat(elemento.duracion.toString());
				return;
    		};
		});


		let alert = this.alertCtrl.create({
	    	title: 'Rendir Examen',
	    	message: message,
	    	buttons: [
	      	{
	        	text: 'Cancelar',
	        	role: 'cancel',
	        	handler: () => {
	          		console.log('Cancel clicked');
	        	}
	      	},
	      	{
	        	text: 'Ir a la prueba',
	        	handler: () => {
			        this.inicioExamen = new Date();
					this.partExamen = 'Preguntas';
					this.duracionExamen=duracion;
			        
			        setTimeout((result) => {//inicia el contador del examen
			            
			            this.timer.startTimer();
			            this.finalizo();//vemos si acabo el timer
			        }, 1000);
	          		
	          		console.log('Ir a la prueba');
	        	}
	      	}
	    	
	    	]
	  	});

	  	alert.present();
		//pedir las preguntas al servidor a traves del id
	}

	finalizo(){

		setTimeout(() => {
				if (!this.timer.hasFinished()) {
					this.finalizo();
				}
				else {
					console.log('fin examen');
					this.finExamen = new Date();


					const alert01 = this.alertCtrl.create({
				      title: 'Termino el Examen!',
				      subTitle: 'Puedes consultar tus notas!',
				      buttons: ['OK']
				    });

					alert01.present();

					this.partExamen = 'Resultados';

				}
			}, 1000)

	}

	//FUNCIONES PARA VER RESULTADDOS
	verResultados(){
		let alert = this.alertCtrl.create({
	    	title: 'Confirmar',
	    	message: 'Seguro que desesa terminar el examen?',
	    	buttons: [
	      	{
	        	text: 'Cancelar',
	        	role: 'cancel',
	        	handler: () => {
	          		console.log('Cancel clicked');
	        	}
	      	},
	      	{
	        	text: 'Seguro',
	        	handler: () => {
					this.partExamen = 'Resultados';
	          		console.log('Ver resultados');
	        	}
	      	}
	    			]
	  	});
	  	alert.present();		
		
	}

	//FORMATEO FECHAS

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
  
  addo(comp) {
    return (((comp + "").length == 1) ? "0" + comp : comp);
  }






}