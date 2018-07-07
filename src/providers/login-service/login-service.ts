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
  
  //Inicio de sesión para el estudiante
  getSessionStudent(datauser){
    console.log('Obtenemos la sesion');
    //Agregamos cabecera y parámetros para la consulta
    let headers= new Headers();
    headers.append('Content-Type', 'application/json');
    let data = {
      username : datauser.username,
      password : datauser.password
    };
    //Creamos un observable que genera notificaciones consultando al back
    var observable = Observable.create( observer =>{
			  this.http.post(urlRest + 'student/auth/sign-in',JSON.stringify(data),{ headers: headers })
          .subscribe(dat=>{
            let res = dat.json();
            observer.next(res);//Enviamos respuesta al servidor
            observer.complete();
            observer.error('Algo esta mal!!');
          })
        });  
    return observable;
  }



}
