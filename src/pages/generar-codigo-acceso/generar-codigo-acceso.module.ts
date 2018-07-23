import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GenerarCodigoAccesoPage } from './generar-codigo-acceso';

@NgModule({
  declarations: [
    GenerarCodigoAccesoPage,
  ],
  imports: [
    IonicPageModule.forChild(GenerarCodigoAccesoPage),
  ],
})
export class GenerarCodigoAccesoPageModule {}
