import { Injectable } from '@angular/core';
import { Headers, Http} from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

const urlRest = "http://18.188.172.254:3000/";


@Injectable()
export class LoginServiceProvider {

  constructor(public http: Http) {
    console.log('Constructor LoginServiceProvider');
  }
  
  //OBTENEMOS LOS VALORES DE INICIACION DE SESION
  getSession(datauser){
    console.log('Obtenemos la sesion');
    //AGREGAMOS LOS CABECERAS Y PARAMETROS PARA LA CONSULTA
    let headers= new Headers();
    headers.append('Content-Type', 'application/json');
    let data = {
      username : datauser.username,
      password : datauser.password
    };
    //CREAMOS UNA VARIABLE OBSERVABLE QUE GENERARA LAS NOTIFICACIONES CONSULTANDO EL BACK
    var observable = Observable.create( observer =>{
			  this.http.post(urlRest + 'student/auth/sign-in',JSON.stringify(data),{ headers: headers })
          .subscribe(dat=>{
            let res = dat.json();
            //AQUI SE PUEDE CAMBIAR POR DATOS FAKE HASTA ASOCIARLO CON SU SERVICIO
            observer.next(res);//ENVIAMOS LA RESPUESTA DEL SERVIDOR AL OBSERVER
            observer.complete();
            observer.error('Algo esta mal!!');
          })
        }); 
    
    return observable;
  }

}
