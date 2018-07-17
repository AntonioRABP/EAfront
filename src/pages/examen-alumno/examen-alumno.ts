import { Component,ViewChild } from '@angular/core';
import { App, IonicPage, NavController, NavParams, AlertController  } from 'ionic-angular';
import { ExamenServiceProvider } from '../../providers/examen-service/examen-service';
import { MenuController } from 'ionic-angular';
import { TimerPage } from '../timer/timer';
import { RendirExamenAlumnoPage } from '../rendir-examen-alumno/rendir-examen-alumno';


@IonicPage()
@Component({
  selector: 'page-examen-alumno',
  templateUrl: 'examen-alumno.html',
})
export class ExamenAlumnoPage {

	//variables globales
	examenPendingCurrent = {
		id: null,
		name: '',
		subject: '',
		correct_points: null,
		error_points: null,
		attempts_allowed: null,
		start_datetime: '',
		end_datetime:'',
		duration_time: null
	};

	//variables para el inicio
	examen = 'exam-pendiente';
	exam_pendientes = [];
	exam_pasados = [];

	//variables para el resultado
	constructor(public navCtrl: NavController, 
		public navParams: NavParams,
		public examenServiceProvider: ExamenServiceProvider,
		public menuCtrl: MenuController,
		private alertCtrl: AlertController,
		public appCtrl: App) {
	  	
	  	this.menuCtrl.enable(true,'MenuStudent');
  		this.menuCtrl.enable(false,'MenuTeacher');		
	}

	ionViewDidLoad() {
	    console.log('Inicializando ExamenAlumnoPage');

	}

	ionViewWillEnter(){
		this.menuCtrl.enable(true,'MenuStudent');
		let res = this.examenServiceProvider.getListExam();

	    res.subscribe(
	      value => {
	        if (value.success){
		    	this.exam_pendientes = value.data;
	        }else{
	        	console.log('No se ha podido recuperar los examenes pendientes del alumno.');
	        }
	      },
	      err => {console.log('Error: ' + err)},//CONTROLAMOS LOS ERRORES
	      () => console.log('this is the end')
	    );
	}

	rendirExamen($id){
		//INI: 0
		//Establacemos el examen pendiente actual y su duraccion		
		let message = 'El examen durará: ';
		let examenCurrent = this.examenPendingCurrent;
		this.exam_pendientes.forEach(function (elemento, indice, array) {
    		if (elemento.id == $id){
				examenCurrent = elemento;
				return;
    		};
		});
    	this.examenPendingCurrent = examenCurrent;

		message = message.concat(this.getMinute(examenCurrent.duration_time),' minutos');
		let alert = this.alertCtrl.create({
	    	title: 'Rendir Examen',
	    	message: message,
	    	buttons: [
	      	{
	        	text: 'Cancelar',
	        	role: 'cancel',
	        	handler: () => {
	          		console.log('Se cancelo el inicio de la prueba.');
	        	}
	      	},
	      	{
	        	text: 'Ir a la prueba',
	        	handler: () => {

	        		this.navCtrl.setRoot(RendirExamenAlumnoPage,{
	        			id: examenCurrent.id,
						duration_time: examenCurrent.duration_time,
						name: examenCurrent.name
					});
	        	}//end hadler
	      	}
	    	
	    	]
	  	});
	  	alert.present();
	  	//END 2

	}
/*
	calcularNota(ptos_favor, ptos_contra){

		let intento = this.attempt_current;

		let ptos_favor_calc = 0;
		let ptos_contra_calc = 0;

		let registroAnswer = [];

		console.log('calcular nota');

		this.respuestas.forEach(function (elemento, indice, array) {
			let respuesta_correcta = '';
			let notaAnswer = 0;

			if(!!elemento.e){
				respuesta_correcta = elemento.answer.toString(2).padStart(5,'0');//convertir answer a binario mas lpad
				notaAnswer = elemento.a*16+elemento.b*8+elemento.c*4+elemento.d*2+elemento.e;
			}else{
				respuesta_correcta = elemento.answer.toString(2).padStart(4,'0');//convertir answer a binario mas lpad
				notaAnswer = elemento.a*8+elemento.b*4+elemento.c*2+elemento.d;
			}


			registroAnswer.push({'intento': intento*1, 
							'answer':elemento.id*1, 
				    		'notaAnswer': notaAnswer*1
				    		});

			let ptos_divididos_f = ptos_favor/(respuesta_correcta.split('1').length-1);//contar cantidad de respuestas correctas que se deberia tener
			let ptos_divididos_c = ptos_contra/(respuesta_correcta.split('1').length-1);//contar cantidad de respuestas correctas que se deberia tener
			let total_correctas = 0;
			let total_incorrectas = 0;
			//comprobar equivocados
			console.log(respuesta_correcta);

			if(1){
				if(elemento.a == 1){
					total_incorrectas = total_incorrectas +  (respuesta_correcta[0] != '1' ? 1 : 0);
				}
				if(elemento.b == 1){
					total_incorrectas = total_incorrectas +  (respuesta_correcta[1] != '1' ? 1 : 0);
				}
				if(elemento.c == 1){
					total_incorrectas = total_incorrectas +  (respuesta_correcta[2] != '1' ? 1 : 0);
				}
				if(elemento.d == 1){
					total_incorrectas = total_incorrectas +  (respuesta_correcta[3] != '1' ? 1 : 0);
				}
				if(elemento.e == 1){
					total_incorrectas = total_incorrectas +  (respuesta_correcta[4] != '1' ? 1 : 0);
				}
				//comprobar aciertos
				if( respuesta_correcta[0] == '1'){
					total_correctas = total_correctas +  (elemento.a == 1? 1 : 0);
				}
				if( respuesta_correcta[1] == '1'){
					total_correctas = total_correctas +  (elemento.b == 1 ? 1 : 0);
				}
				if( respuesta_correcta[2] == '1'){
					total_correctas = total_correctas +  (elemento.c == 1 ? 1 : 0);
				}
				if( respuesta_correcta[3] == '1'){
					total_correctas = total_correctas +  (elemento.d == 1 ? 1 : 0);
				}
				if( respuesta_correcta[4] == '1'){
					total_correctas = total_correctas +  (elemento.e == 1 ? 1 : 0);
				}
			}
			elemento.correct = total_correctas*ptos_divididos_f;
			elemento.error = total_incorrectas*ptos_divididos_c;

			ptos_favor_calc += total_correctas*ptos_divididos_f;
			ptos_contra_calc += total_incorrectas*ptos_divididos_c;

		});

		this.nota = (ptos_favor_calc - ptos_contra_calc).toString();

		console.log(this.nota);

		for(let j=0;j<registroAnswer.length;j++){

			this.examenServiceProvider.setRespuestas(registroAnswer[j]["intento"], 
				registroAnswer[j]["answer"], 
				registroAnswer[j]["notaAnswer"]).subscribe(
				res => {
					console.log(res);
				},
				err => {
					console.log(err);
				}
			);
		}


		return;
	}

*/

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