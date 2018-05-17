import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

const urlRest = "http://18.188.172.254:3000/";


@Injectable()
export class LoginServiceProvider {

  constructor(public http: Http) {
    console.log('Hello LoginServiceProvider Provider');
  }
  //data is credentials = {username: username,password: valor}
  getSession(datauser){

    let headers= new Headers();
    headers.append('Content-Type', 'application/json');
    let data = {
      username : datauser.username,
      password : datauser.password
    };
    
    var observable = Observable.create( observer =>{
			  this.http.post(urlRest + 'student/auth/sign-in',JSON.stringify(data),{ headers: headers })
          .subscribe(dat=>{
            let res = dat.json();
            observer.next(res);
            observer.complete();
            observer.error('Algo esta mal!!');
          })
        }); 
    
    return observable;
  }
}
