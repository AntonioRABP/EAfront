import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CrearExamenPage } from './crear-examen';

@NgModule({
  declarations: [
    CrearExamenPage,
  ],
  imports: [
    IonicPageModule.forChild(CrearExamenPage),
  ],
})
export class CrearExamenPageModule {}
