import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//import { TimerComponent } from '../timer/timer'
/**
 * Generated class for the ExamenAlumnoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-examen-alumno',
  templateUrl: 'examen-alumno.html',
})
export class ExamenAlumnoPage {
	partExamen = 'Inicio';
	examen = 'exam-pendiente';
	duracionExamen: number = 0;
	preguntas = [
		{
			id: 1, 
			texto: 'Esta es la pregunta numero uno',
			alternativas:[
				{
					id: 1,
					texto: 'altenativa A'
				},
				{
					id: 2,
					texto: 'altenativa B'
				},
				{
					id: 3,
					texto: 'altenativa C'
				}
			]	
		},
		{
			id: 2, 
			texto: 'Esta es la pregunta numero dos',
			alternativas:[
				{
					id: 1,
					texto: 'altenativa D'
				},
				{
					id: 2,
					texto: 'altenativa E'
				},
				{
					id: 3,
					texto: 'altenativa F'
				}
			]	
		},
		{
			id: 3, 
			texto: 'Esta es la pregunta numero tres',
			alternativas:[
				{
					id: 1,
					texto: 'altenativa G'
				},
				{
					id: 2,
					texto: 'altenativa H'
				},
				{
					id: 3,
					texto: 'altenativa I'
				}
			]	
		}
	];

	constructor(public navCtrl: NavController, public navParams: NavParams) {
	}

	ionViewDidLoad() {
	    console.log('ionViewDidLoad ExamenAlumnoPage');
	    console.log(this.preguntas);
	}

	rendirExamen(){
		this.partExamen = 'Preguntas';
	}
	verResultados(){
		this.partExamen = 'Resultados';
	}
	irExamen(){
		this.partExamen = 'Inicio';
	}

}
