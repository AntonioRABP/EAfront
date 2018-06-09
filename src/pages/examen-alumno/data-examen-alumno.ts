export class DataExamenAlumno {//despues seras eliminado

/*
	        <p>Nombre del Examen: {{nombreExamen}}</p>
        <p>Cantidad de Preguntas: {{number_questions}}</p>
        <p> Peso de Preguntas correctas: {{correct_points}}</p>
        <p> Peso de Preguntas incorrectas: {{error_points}}</p>
        <p>Intentos Permitidos: {{attempts_allowed}}</p>
        <p>Inicio del examen: {{getFecha(start_datetime)}}</p>
        <p>Fin del examen: {{getFecha(end_datetime)}}</p>
        <p>Duracion: {{getTime(duration_time)}}</p>
*/

  	public exam_pendientes = [
		{
			id: 1,
			name: 'Examen Parcial KM',
			subject: '',
			correct_points: 1,
			error_points: 0.5,
			attempts_allowed: 3,
			start_datetime: '10/10/2018 10:00:00',
			end_datetime:'10/10/2018 10:30:00',
			duration_time: 180
		}
	];

	public exam_pasados = [
		{
			id: 5,
			nombre: 'Primera practica KM'
		},
		{
			id: 6,
			nombre: 'Segunda practica KM'
		}
	];
	
	public preguntas = [
		{
			id: 1, 
			texto: '1. Una vez firmado, un contrato es legalmente vinculante a menos que',
			alternativas:
				{
					a: 'A. Una parte sea incapaz de ejecutarlo',
					b: 'B. Una parte sea incapaz de financiar su parte del trabajo.',
					c: 'C. Esté violando una ley aplicable',
					d: 'D. Se declare nulo y sin efecto por el representante legal de cualquiera de las partes'
				}
			
		},
		{
			id: 2, 
			texto: '2. Con un enunciado del trabajo de las adquisiciones claro, un vendedor completa su trabajo según lo especificado, pero el comprador no está satisfecho con los resultados. El contrato se considera:',
			alternativas:{
					a: 'A. Nulo y sin efecto',
					b: 'B. Incompleto',
					c: 'C. Completo',
					d: 'D. Suspendido'
				}
		},
		{
			id: 3, 
			texto: '3. Todos los siguientes enunciados con respecto a los documentos de adquisición son incorrectos EXCEPTO',
			alternativas:{
					a: 'A. Los documentos de adquisición bien diseñados pueden simplificar la comparación de las respuestas.',
					b: 'B. Los documentos de adquisición deben ser rigurosos e inflexibles para no permitir consideraciones a las sugerencias del vendedor.',
					c: 'C. En general, los documentos de adquisición no deben incluir criterios de selección.',
					d: 'D. Los documentos de adquisición bien diseñados no incluyen un enunciado del trabajo de las adquisiciones'
				}
		},
		{
			id: 4, 
			texto: '4. Un director de proyectos por parte del vendedor es informado por medio de su gerencia que el proyecto debe hacer todo lo posible para que les sean otorgados incentivos monetarios. El objetivo principal de las cláusulas de incentivos en un contrato es:',
			alternativas:{
					a: 'A. Reducir los costos para el comprador',
					b: 'B. Ayudar al vendedor a controlar los costos',
					c: 'C. Sincronizar los objetivos.',
					d: 'D. Reducir los riesgos para el vendedor transfiriendo los riesgos al comprador'
				}	
		},
		{
			id: 5, 
			texto: '5. Todas las declaraciones siguientes sobre control de cambios son incorrectas EXCEPTO:',
			alternativas:{
					a: 'A. Un contrato de precio fijo va a minimizar la necesidad de control de cambios',
					b: 'B. Los cambios raras veces proporcionan beneficios reales al proyecto.',
					c: 'C. Los contratos deben incluir procedimientos para adaptar los cambios.',
					d: 'D. Las especificaciones más detalladas eliminan las causas de los cambios'
				}	
		}
	];

  constructor() {

  }

  getTime(inputSeconds: number) {
    var sec_num = parseInt(inputSeconds.toString(), 10);
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
    return this.addo(hours) + ":" + this.addo(minutes) + ":" + this.addo(seconds);
  }
  
  getFecha(horadia) {
    let format = new Date(horadia);
    return this.addo(format.getUTCFullYear()) + "-" + this.addo(format.getUTCMonth()) + "-" + this.addo(format.getUTCDate());
  }
  
  addo(comp) {
    return (((comp + "").length == 1) ? "0" + comp : comp);
  }
}

