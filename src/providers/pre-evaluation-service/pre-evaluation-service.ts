import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

const urlRest = "http://18.188.172.254:3000/";
/*
  Generated class for the PreEvaluationServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PreEvaluationServiceProvider {
  var = '';
  constructor(public http: Http) {
    console.log('Hello PreEvaluationServiceProvider Provider');
  }

  getListCourse(){
  	//AGREGAMOS LAS CABECERAS Y PARAMETROS PARA LA CONSULTA
  	let headers= new Headers();
  	headers.append('x-session', window.localStorage.getItem('x-session'));

  	console.log('pintar var', window.localStorage.getItem('x-session'));

  	//CREAMOS UNA VARIABLE OBSERVABLE QUE GENERA LAS NOTIFICACIONES CONSULTANDO EL BACK
  	var observable = Observable.create( observer => {
  		this.http.get(urlRest + 'admin/course',{ headers: headers })
  			.subscribe(dat=>{
  				let res = dat.json();
  				observer.next(res);
  				observer.complete();
  				observer.error('Algo esta mal!!');
  			})
  	});

  	return observable;
  };

  getListSubjects(id){
  	//AGREGAMOS LAS CABECERAS Y PARAMETROS PARA LA CONSULTA
  	let headers= new Headers();
  	headers.append('x-session', window.localStorage.getItem('x-session'));

  	//CREAMOS UNA VARIABLE OBSERVABLE QUE GENERARA LAS NOTIFICACIONES CONSULTANDO EL BACK
  	var observable = Observable.create( observer => {
  		this.http.get(urlRest + 'admin/course' +id+ '/topics',{ headers: headers})
  			.subscribe(dat => {
  				let res = dat.json();
  				observer.next(res);
  				observer.complete();
  				observer.error('Algo esta mal!!');
  			})
  	});

  	return observable;
  };

  setGeneratePreEvaluation(registerEvaluation){
    let headers = new Headers();
    headers.append('Content-Type','application/json');

    let data = {
      name: registerEvaluation.name,
      subject: registerEvaluation.subject,
      questions_count: registerEvaluation.questions_count,
      correct_points: registerEvaluation.correct_points,
      error_points: registerEvaluation.error_points,
      attempts_allowed: registerEvaluation.attempts_allowed,
      duration_time: registerEvaluation.duration_time,
      course_id: registerEvaluation.course_id,
      difficulty_level: registerEvaluation.difficulty_level,
      type: registerEvaluation.type,
      category: registerEvaluation.category,
      is_random: registerEvaluation.is_random,
      access_code: registerEvaluation.access_code,
      require_access_code: registerEvaluation.require_access_code
    };

    return Observable.create(observer => {
      this.http.post(urlRest + 'admin/pre-evaluation', JSON.stringify(data), { headers: headers })
        .subscribe(dat => {
          observer.next(dat.json());
          observer.complete();
          observer.error('Algo esta man con la creacion de la evaluacion!');
        });
    });
  }
}
