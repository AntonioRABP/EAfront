import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http'; 

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { CrearExamenPage } from '../pages/crear-examen/crear-examen';
import { CrearPreguntaPage } from '../pages/crear-pregunta/crear-pregunta';
import { PerfilProfesorPage } from '../pages/perfil-profesor/perfil-profesor';
import { ExamenAlumnoPage } from '../pages/examen-alumno/examen-alumno';
import { PerfilEstudiantePage } from '../pages/perfil-estudiante/perfil-estudiante';
import { NewEvaluationPage } from '../pages/new-evaluation/new-evaluation';
import {RegisterPage} from '../pages/register/register';

import { ExamenProfesorPage } from '../pages/examen-profesor/examen-profesor';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { TimerPage } from '../pages/timer/timer';


import { LoginServiceProvider } from '../providers/login-service/login-service';
import { ExamenServiceProvider } from '../providers/examen-service/examen-service';
import { PreEvaluationServiceProvider } from '../providers/pre-evaluation-service/pre-evaluation-service';
import { RegisterServiceProvider } from '../providers/register-service/register-service';
import { LogOutServiceProvider } from '../providers/log-out-service/log-out-service';
import { ResetPasswordServiceProvider } from '../providers/reset-password-service/reset-password-service';
import { PreQuestionServiceProvider } from '../providers/pre-question-service/pre-question-service';
import { PastExamsProvider } from '../providers/past-exams/past-exams';

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
    PerfilEstudiantePage,
    ResetPasswordPage,
    NewEvaluationPage,
    RegisterPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
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
    PerfilEstudiantePage,
    ResetPasswordPage,
    NewEvaluationPage,
    RegisterPage
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoginServiceProvider,
    ExamenServiceProvider,
    PreEvaluationServiceProvider,
    RegisterServiceProvider,
    LogOutServiceProvider,
    ResetPasswordServiceProvider,
    PreQuestionServiceProvider,
    PastExamsProvider
  ]
})
export class AppModule {}
