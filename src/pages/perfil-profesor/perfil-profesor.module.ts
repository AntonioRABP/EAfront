import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PerfilProfesorPage } from './perfil-profesor';

@NgModule({
  declarations: [
    PerfilProfesorPage,
  ],
  imports: [
    IonicPageModule.forChild(PerfilProfesorPage),
  ],
})
export class PerfilProfesorPageModule {}
