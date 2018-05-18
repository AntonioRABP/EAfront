import { Component } from '@angular/core';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {IonicPage, NavController, MenuController, Nav, Platform} from 'ionic-angular';

import { ExamenAlumnoPage } from '../examen-alumno/examen-alumno';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	public rootPage: any = ExamenAlumnoPage;
	pages: Array<{title: string, component: any}>;
  	constructor(public platform: Platform,
  				public statusBar: StatusBar,
    			public navCtrl: NavController,
    			public splashScreen: SplashScreen,
    			public menuCtrl: MenuController) {

  		this.pages = [
      		{ title: 'Perfil', component: '' },
      		{ title: 'Examenes', component: ExamenAlumnoPage },
      		{ title: 'Respuesta', component: '' },
      		{ title: 'Salir', component: '' }
    	];
	}

  ionViewDidLoad() {
     console.log('ionViewDidLoad HomePage');
  }

	openPage(page) {
    	// close the menu when clicking a link from the menu
    	this.menuCtrl.close();
    	// navigate to the new page if it is not the current page
    	this.navCtrl.setRoot(page.component);
  	}

}
