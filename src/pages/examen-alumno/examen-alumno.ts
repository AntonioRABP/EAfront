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
	rendirExamen(id){
		let alert = this.alertCtrl.create({
	    	title: 'Rendir Examen',
	    	message: 'El examen durará',
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
					this.partExamen = 'Preguntas';
	          		console.log('Buy clicked');
	        	}
	      	}
	    	
	    	]
	  	});

	  	alert.present();
		//pedir las preguntas al servidor a traves del id
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

}