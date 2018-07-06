import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

const urlRest = "http://18.188.172.254:3000/";
/*
  Generated class for the PreQuestionServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PreQuestionServiceProvider {

  constructor(public http: Http) {
    console.log('Hello PreQuestionServiceProvider Provider');
  }

  getListEvaluation(){
  	//AGREGAMOS LAS CABECERAS Y PARAMETROS PARA LA CONSULTA
  	let headers = new Headers();
  	headers.append('x-session', window.localStorage.getItem('x-session'));

  	console.log('pintar var', window.localStorage.getItem('x-session'));

  	//CREAMOS UNA VARIABLE OBSERVABLE QUE GENERA LAS NOTIFICACIONES CONSULTANDO EL BACK
  	var observable = Observable.create( observer => {
  		this.http.get(urlRest + 'admin/pre-evaluation', { headers: headers})
  		.subscribe(dat=>{
  			let res = dat.json();
  			observer.next(res);
  			observer.complete();
  			observer.error('Algo esta mal!!');
  		})
  	});
  	return observable;
  };

  setGeneratePreQuestion(preQuestion){
  	let headers = new Headers();
  	headers.append('Content-Type','application/json');

  	let data={
  		name: preQuestion.name,
  		header: preQuestion.header,
  		statement: preQuestion.statement,
  		answer: preQuestion.answer,
  		solution: preQuestion.solution,
  		source: preQuestion.source,
  		pre_evaluation_id: preQuestion.pre_evaluation_id,
  		topic_id: preQuestion.topic_id,
  		difficulty_level: preQuestion.difficulty_level
  	};

  	return Observable.create(observer => {
  		this.http.post(urlRest + 'admin/question', JSON.stringify(data), { headers: headers })
  			.subscribe(dat => {
	          observer.next(dat.json());
	          observer.complete();
	          observer.error('Algo esta mal en la creacion de pregunta!');
  			});
  	});
  }	
}
