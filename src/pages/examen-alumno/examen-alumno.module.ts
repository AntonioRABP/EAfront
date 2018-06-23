import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExamenAlumnoPage } from './examen-alumno';
import { MenuController } from 'ionic-angular';

@NgModule({
  declarations: [

  ],
  imports: [

  ],
})
export class ExamenAlumnoPageModule {
  constructor(
    public menuCtrl: MenuController) {
this.menuCtrl.enable(true,'MenuStudent');
this.menuCtrl.enable(false,'MenuTeacher');
    }
}
