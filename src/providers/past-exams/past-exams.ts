import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';


const urlRest = "http://18.188.172.254:3000/";

/*
  Generated class for the PastExamsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PastExamsProvider {

  constructor(public http: Http) {
    console.log('Hello PastExamsProvider Provider');
  }

  getPastExams(){
    let headers= new Headers();
    headers.append('s-session', window.localStorage.getItem('s-session'));

    var observable = Observable.create( observer =>{
      this.http.get(urlRest + 'student/evaluation/results',{ headers: headers })
        .subscribe(dat=>{
          let res = dat.json();
          observer.next(res);
          observer.complete();
          observer.error('Algo esta mal!!');
        })
      }); 

    return observable

  }

}
