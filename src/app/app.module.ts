import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';


import { CrearExamenPage } from '../pages/crear-examen/crear-examen';
import { CrearPreguntaPage } from '../pages/crear-pregunta/crear-pregunta';
import { PerfilProfesorPage } from '../pages/perfil-profesor/perfil-profesor';
import { ExamenAlumnoPage } from '../pages/examen-alumno/examen-alumno';
import { PerfilEstudiantePage } from '../pages/perfil-estudiante/perfil-estudiante';

import { ExamenProfesorPage } from '../pages/examen-profesor/examen-profesor';

import { TimerPage } from '../pages/timer/timer'


import { LoginServiceProvider } from '../providers/login-service/login-service';
import { ExamenServiceProvider } from '../providers/examen-service/examen-service';
import { PreEvaluationServiceProvider } from '../providers/pre-evaluation-service/pre-evaluation-service';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    ExamenAlumnoPage,
    TimerPage,
    CrearExamenPage,
    CrearPreguntaPage,
    PerfilProfesorPage,
    ExamenProfesorPage,
    PerfilEstudiantePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    ExamenAlumnoPage,
    TimerPage,
    CrearExamenPage,
    CrearPreguntaPage,
    PerfilProfesorPage,
    ExamenProfesorPage,
    PerfilEstudiantePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoginServiceProvider,
    ExamenServiceProvider,
    PreEvaluationServiceProvider
  ]
})
export class AppModule {}
