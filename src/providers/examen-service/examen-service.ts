import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

const urlRest = "http://18.188.172.254:3000/";
/*
  Generated class for the ExamenServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ExamenServiceProvider {
	var = '';
  constructor(public http: Http) {
    console.log('Hello ExamenServiceProvider Provider');
  }

 getListExam(){
    //AGREGAMOS LOS CABECERAS Y PARAMETROS PARA LA CONSULTA
    let headers= new Headers();
    headers.append('s-session', window.localStorage.getItem('s-session'));

    //CREAMOS UNA VARIABLE OBSERVABLE QUE GENERARA LAS NOTIFICACIONES CONSULTANDO EL BACK
    var observable = Observable.create( observer =>{
			  this.http.get(urlRest + 'student/evaluation',{ headers: headers })
          .subscribe(dat=>{
            let res = dat.json();
            //AQUI SE PUEDE CAMBIAR POR DATOS FAKE HASTA ASOCIARLO CON SU SERVICIO
            observer.next(res);//ENVIAMOS LA RESPUESTA DEL SERVIDOR AL OBSERVER
            observer.complete();
            observer.error('Algo esta mal!!');
          })
        }); 

    return observable;
  };

 getAlternative(id){
    //AGREGAMOS LOS CABECERAS Y PARAMETROS PARA LA CONSULTA
    let headers= new Headers();
    headers.append('s-session', window.localStorage.getItem('s-session'));

    //CREAMOS UNA VARIABLE OBSERVABLE QUE GENERARA LAS NOTIFICACIONES CONSULTANDO EL BACK
    var observable = Observable.create( observer =>{
        this.http.get(urlRest + 'student/evaluation/'+id+'/solutions',{ headers: headers })
          .subscribe(dat=>{
            let res = dat.json();
            //AQUI SE PUEDE CAMBIAR POR DATOS FAKE HASTA ASOCIARLO CON SU SERVICIO
            observer.next(res);//ENVIAMOS LA RESPUESTA DEL SERVIDOR AL OBSERVER
            observer.complete();
            observer.error('Algo esta mal!!');
          })
        }); 

    return observable;
  };

 
 startExamen(id_evaluation){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('s-session', window.localStorage.getItem('s-session'));

    let data = {
      evaluation_id: id_evaluation * 1
    };

    return Observable.create(observer => {
      this.http.post(urlRest + 'student/attempt/start', JSON.stringify(data), { headers: headers })
        .subscribe(dat => {
          observer.next(dat.json());
          observer.complete();
          observer.error('Algo esta mal en el registro!');
        });
    });

 }

 endExamen(id_attempt){
    let headers = new Headers();
    headers.append('s-session', window.localStorage.getItem('s-session'));

    let data = {
      attempt_id: id_attempt * 1
    };

    console.log(id_attempt);
    return Observable.create(observer => {
      this.http.post(urlRest + 'student/attempt/' + id_attempt + '/end', JSON.stringify(data), { headers: headers })
        .subscribe(dat => {
          observer.next(dat.json());
          observer.complete();
          observer.error('Algo esta mal en el registro!');
        });
    });

 }

 getAttempts(id_evaluation){
    let headers = new Headers();
    headers.append('s-session', window.localStorage.getItem('s-session'));
    
    let data = {
      evaluation_id: id_evaluation * 1
    };

    return Observable.create(observer => {
      this.http.post(urlRest + 'student/evaluation/' + id_evaluation + '/attempts',  JSON.stringify(data), { headers: headers })
        .subscribe(dat => {
          observer.next(dat.json());
          observer.complete();
          observer.error('Algo esta mal en el registro!');
        });
    
    });

 }

 setRespuestas(attempt_id,question_id,answer){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('s-session', window.localStorage.getItem('s-session'));
    
    let data = {
      attempt_id : attempt_id,
      question_id : question_id,
      answer : answer
    };

    return Observable.create(observer => {
      this.http.post(urlRest + 'student/attempt/' + attempt_id + '/send-answer',  JSON.stringify(data), { headers: headers })
        .subscribe(dat => {
          observer.next(dat.json());
          observer.complete();
          observer.error('Algo esta mal en el registro!');
        });
    
    });


 }

}


