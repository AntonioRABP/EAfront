import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Storage } from '@ionic/storage';

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
  constructor(public http: Http,
  	private storage: Storage) {
    console.log('Hello ExamenServiceProvider Provider');
  }

 getListExam(){
    //AGREGAMOS LOS CABECERAS Y PARAMETROS PARA LA CONSULTA
    let headers= new Headers();
    headers.append('s-session', window.localStorage.getItem('s-session'));

    console.log('pintar var: ',window.localStorage.getItem('s-session'));

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

}


