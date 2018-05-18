import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExamenAlumnoPage } from './examen-alumno';

@NgModule({
  declarations: [
    ExamenAlumnoPage,
  ],
  imports: [
    IonicPageModule.forChild(ExamenAlumnoPage),
  ],
})
export class ExamenAlumnoPageModule {}
