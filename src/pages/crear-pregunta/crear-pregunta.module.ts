import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CrearPreguntaPage } from './crear-pregunta';

@NgModule({
  declarations: [
    CrearPreguntaPage,
  ],
  imports: [
    IonicPageModule.forChild(CrearPreguntaPage),
  ],
})
export class CrearPreguntaPageModule {}
