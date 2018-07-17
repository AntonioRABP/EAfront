import { Component,ViewChild } from '@angular/core';
import { ToastController ,IonicPage, NavController, NavParams,AlertController,LoadingController, MenuController,Slides  } from 'ionic-angular';
import { ExamenServiceProvider } from '../../providers/examen-service/examen-service';
import { TimerPage } from '../timer/timer';
import { ExamenAlumnoPage } from '../examen-alumno/examen-alumno';
import { ResultadosExamenAlumnoPage } from '../resultados-examen-alumno/resultados-examen-alumno';

/**
 * Generated class for the RendirExamenAlumnoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rendir-examen-alumno',
  templateUrl: 'rendir-examen-alumno.html',
})
export class RendirExamenAlumnoPage {

	@ViewChild(TimerPage) timer: TimerPage;
	@ViewChild(Slides) slides: Slides;

	id:number; //id de examen rendido
	duracionExamen :number;//enviado de la pagina anterior
	NombreExamen: string;//enviado de la pagina anterior
	preguntas = [];//pedido desde el servicio --hecho

	endExamen=false;

	respuestas = [];
	attempt_current:number;
	show : boolean = false;
  	loading = this.loadingCtrl.create({
    	content: 'Por favor espere...'
  	});

  	num_diapo:number = 1;

  constructor(public navCtrl: NavController, 
		public navParams: NavParams,
		public examenServiceProvider: ExamenServiceProvider,
		public menuCtrl: MenuController,
		private alertCtrl: AlertController,
		public loadingCtrl: LoadingController,
		public toastCtrl: ToastController) {
  	this.show = false;
	this.menuCtrl.enable(false,'MenuStudent');
  	this.menuCtrl.enable(false,'MenuTeacher');		
		
	this.id = navParams.get('id');
  	this.duracionExamen = navParams.get('duration_time');
  	this.NombreExamen = navParams.get('name');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RendirExamenAlumnoPage');
  }
  	EnviarRespuestas(){

		let intento = this.attempt_current;
		let registroAnswer = [];

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
		});
		let contador = 0;
		for(let j=0;j<registroAnswer.length;j++){

			this.examenServiceProvider.setRespuestas(registroAnswer[j]["intento"], 
				registroAnswer[j]["answer"], 
				registroAnswer[j]["notaAnswer"]).subscribe(
				res => {
					if(res.success){
						contador = contador + 1;
						if(contador == registroAnswer.length){
							this.finalizarExamen(this.attempt_current);
							this.loading.dismiss();
							this.navCtrl.setRoot(ResultadosExamenAlumnoPage,{
						        												id: this.id
																			});	        	

						}
					}
					console.log(res);
				},
				err => {
					console.log(err);
				}
			);
		}


		return;
	}

  updateChoice(id, choice){
		this.respuestas.forEach(function (elemento, indice, array) {
    		if (elemento.id == id){
				switch(choice){
					case 'a':
						elemento.a = (elemento.a == 1 ? 0 : 1);
						console.log(elemento.a);
						break;
					case 'b':
						elemento.b = (elemento.b == 1 ? 0 : 1);
						console.log(elemento.b);
						break;
					case 'c':
						elemento.c = (elemento.c == 1 ? 0 : 1);
						console.log(elemento.c);
						break;
					case 'd':
						elemento.d = (elemento.d == 1 ? 0 : 1);
						console.log(elemento.d);
						break;
					case 'e':
						elemento.e = (elemento.e == 1 ? 0 : 1);
						console.log(elemento.e);
						break;
				}
				
    		};
		});
		
		return;
  }
  buildRespuestas(){
		//construimos el tipo de dato para calcular la nota
		let respuestasCurrent = []; 
		this.preguntas.forEach(function (elemento, indice, array) {
			let e = elemento.statement.alternatives[4].text;

			if( e != null ){
				respuestasCurrent.push({'id': elemento.id, 'answer':elemento.answer, 
				    			'a': 0, 
				    			'b': 0, 
				    			'c': 0,
				    			'd': 0,
				    			'e': 0,
				    			'correct': 0,
				    			'error':0,
				    			'res': 0
				    		});
			}else{
							respuestasCurrent.push({'id': elemento.id, 'answer':elemento.answer, 
				    			'a': 0, 
				    			'b': 0, 
				    			'c': 0,
				    			'd': 0,
				    			'correct': 0,
				    			'error':0,
				    			'res': 0
				    		});
			}

			return;
		});
		this.respuestas = respuestasCurrent;
  }
	finalizarExamen(attempt) {
    
    	this.examenServiceProvider.endExamen(attempt).subscribe(
    		data => {
        	console.log('fin:' + data);
      		},err => {
        	console.log(err);
      		}
    	);
    	console.log('end finalizar examen');
  	}

  iniciarExamen(id_examen){
	this.examenServiceProvider.startExamen(id_examen).subscribe(
		value => {
			console.log('inicia examen');
			console.log(value);

	        if(!value.success){
		        console.log("equivocado");
				const alertIntento = this.alertCtrl.create({
	    			title: 'No puedes rendir el examen',
	    			message: 'Ha superado el numero de intentos permitidos',
	    			buttons: [
	      				{
	        				text: 'OK',
	        				role: 'MaxIntentos',
	        				handler: () => {
	        					this.loading.dismiss();
	        					this.navCtrl.setRoot(ExamenAlumnoPage);
	        					console.log('Se cancelo el inicio de la prueba.');
	        				}
	      				}
	      				]
				});
				alertIntento.present();

			}else{
				this.loading.dismiss();
				this.attempt_current = value.data["id"];								
				this.show = true;
				setTimeout((result) => {
						//inicia el contador del examen
						console.log('en examen');
						this.timer.startTimer();
							this.finalizo();//vemos si acabo el timer
						},1000);

	        		}
	    },
	    err => {console.log('Error: ' + err)},//CONTROLAMOS LOS ERRORES
	    () => console.log('this is the end')
	);
  }
  finalizo(){
		setTimeout(() => {
			if (!this.timer.hasFinished() && !this.endExamen ) {
				this.finalizo();
			}
			else {
				console.log('fin examen');

				this.loading.present();
				if(!this.endExamen){
					const alert01 = this.alertCtrl.create({
				    	title: 'Termino el Examen!',
				    	subTitle: 'Puedes consultar tus notas!',
				    	buttons: ['OK']
				    });
					alert01.present();
				}
				this.endExamen = false;
				this.EnviarRespuestas();
			}
		}, 1000)
	}
  ionViewWillEnter(){
 		this.loading.present();
		let res = this.examenServiceProvider.getAlternative(this.id);
		
	    res.subscribe(
	      value => {
	        if(value.success){
	        	this.preguntas = value.data;
	        	console.log(value.data);
	        	this.buildRespuestas();
	        	this.iniciarExamen(this.id);
	        }else{
	        	let alert00 = this.alertCtrl.create({
	    			title: 'Error recuperando preguntas',
	    			subTitle:'Su conexion es muy lenta',
	    			buttons: [
	      				{
	        				text: 'OK',
	        				role: 'OK',
	        				handler: () => {
	        					this.navCtrl.setRoot(ExamenAlumnoPage);
	          					console.log('Se cancelo el inicio de la prueba.');
	        				}
	      				}
	      				]
	      			});
	  			alert00.present();
	  		}
	  	  },
	      err => {console.log('Error: ' + err)},//CONTROLAMOS LOS ERRORES
	      () => console.log('this is the end')
	    );

  }

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
					this.endExamen = true;
				}
	      	}
			]
	  	});
	  	alert.present();		
		
	}

	goPrev(){ this.slides.slidePrev() }
	goNext(){ this.slides.slideNext() }
	changePage(){
		let first =  this.slides.isBeginning();
		let last =  this.slides.isEnd();

		if(first){
			const toast = this.toastCtrl.create({
	      	message: 'Inicio de preguntas',
	      	duration: 3000,
	      	position: 'bottom'
	    	});
	    	toast.present();
		}else if(last){

			const toast = this.toastCtrl.create({
	      	message: 'Fin de preguntas',
	      	duration: 3000,
	      	position: 'bottom'
	    	});
	    	toast.present();
		}
	}
}
