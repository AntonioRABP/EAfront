import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotasProfesorPage } from './notas-profesor';

@NgModule({
  declarations: [
    NotasProfesorPage,
  ],
  imports: [
    IonicPageModule.forChild(NotasProfesorPage),
  ],
})
export class NotasProfesorPageModule {}
