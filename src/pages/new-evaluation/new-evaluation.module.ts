import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewEvaluationPage } from './new-evaluation';

@NgModule({
  declarations: [
    NewEvaluationPage,
  ],
  imports: [
    IonicPageModule.forChild(NewEvaluationPage),
  ],
})
export class NewEvaluationPageModule {}
