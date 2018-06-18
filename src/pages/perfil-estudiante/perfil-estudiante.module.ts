import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PerfilEstudiantePage } from './perfil-estudiante';

@NgModule({
  declarations: [
    PerfilEstudiantePage,
  ],
  imports: [
    IonicPageModule.forChild(PerfilEstudiantePage),
  ],
})
export class PerfilEstudiantePageModule {}
