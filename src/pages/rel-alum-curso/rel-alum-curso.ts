import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { UserCourseProvider } from '../../providers/user-course/user-course';
/**
 * Generated class for the RelAlumCursoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rel-alum-curso',
  templateUrl: 'rel-alum-curso.html',
})
export class RelAlumCursoPage {
  inicioCurso = 'Inicio';
  cursos = [];
  curso_seccion = {id: 0, course_id:0, period:'',
                   teacher_id:0, start_date:'', end_date:'',
                   created_at: '', state: 0};
  alumnos = [];
  checkResp = [];
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public menuCtrl: MenuController,
              public relacion: UserCourseProvider) {
                this.menuCtrl.enable(false,'MenuStudent');
                this.menuCtrl.enable(true,'MenuTeacher');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RelAlumCursoPage');
  }

  ionViewWillEnter(){
    let res = this.relacion.getListCourses();
  	res.subscribe(
      value => {
        if (value.success){
          this.cursos = value.data;
          console.log(this.cursos);
          console.log('Si se llego a obtener los usuarios')
        }else{
          console.log('No se ha podido recuperar las pre-evaluaciones disponibles');
          console.log('No pude entrar');
        }
      },
      err => {console.log('Error: ' + err)},
      () => console.log('Este es el final')
      );
  }

  itemSelected(curso){
    this.curso_seccion = curso;
    console.log('----------------------');
    console.log(this.curso_seccion);
    console.log('----------------------');
    let res = this.relacion.getListAlumnos();
  	res.subscribe(
      value => {
        if (value.success){
          this.alumnos = value.data;
          console.log(this.alumnos);
          console.log('Si se llego a obtener los usuarios')
        }else{
          console.log('No se ha podido recuperar las pre-evaluaciones disponibles');
          console.log('No pude entrar');
        }
      },
      err => {console.log('Error: ' + err)},
      () => console.log('Este es el final')
      );
    this.inicioCurso = 'Fin';
  }

  regRelAlCu(){
    console.log(this.checkResp);
    
    var i = 0;
    var tamano = this.checkResp.length - 1;
    for(i; tamano >= i; i++){
      if (this.checkResp[i] == true){
        this.relacion.setRelAlumCurso(Number(this.curso_seccion.id), Number(this.alumnos[i].id)).subscribe(data => {
          if(data.success){
            console.log('Se ha registrado al alumno en la seccion');
          }else{
            console.log('No se ha registrado al alumno en la seccion');
          }
        });
      }
    }
    
  }
}