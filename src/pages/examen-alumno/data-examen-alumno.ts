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
			nombre: 'Examen Parcial KM',
			cantidad_preguntas: 20,
			peso_preguntas_correctas: 1,
			peso_preguntas_incorrectas: 0.5,
			intentosPermitidos: 3,
			inicioExamen: '10/10/2018 10:00:00',
			finExamen:'10/10/2018 10:30:00',
			duracion: 30
		},
		{
			id: 2,
			nombre: 'Tercera practica KM',
			cantidad_preguntas: 20,
			peso_preguntas_correctas: 1,
			peso_preguntas_incorrectas: 0.5,
			intentosPermitidos: 3,
			inicioExamen: '10/10/2018 10:00:00',
			finExamen:'10/10/2018 10:30:00',
			duracion: 30
		},
		{
			id: 3,
			nombre: 'Cuarta practica KM',
			cantidad_preguntas: 20,
			peso_preguntas_correctas: 1,
			peso_preguntas_incorrectas: 0.5,
			intentosPermitidos: 3,
			inicioExamen: '10/10/2018 10:00:00',
			finExamen:'10/10/2018 10:30:00',
			duracion: 30
		},
		{
			id: 4,
			nombre: 'Examen Final KM',
			cantidad_preguntas: 20,
			peso_preguntas_correctas: 1,
			peso_preguntas_incorrectas: 0.5,
			intentosPermitidos: 3,
			inicioExamen: '10/10/2018 10:00:00',
			finExamen:'10/10/2018 10:30:00',
			duracion: 30
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
			alternativas:[
				{
					id: 1,
					texto: 'A. Una parte sea incapaz de ejecutarlo'
				},
				{
					id: 2,
					texto: 'B. Una parte sea incapaz de financiar su parte del trabajo.'
				},
				{
					id: 3,
					texto: 'C. Esté violando una ley aplicable'
				},
				{
					id: 3,
					texto: 'D. Se declare nulo y sin efecto por el representante legal de cualquiera de las partes'
				}
			]	
		},
		{
			id: 2, 
			texto: '2. Con un enunciado del trabajo de las adquisiciones claro, un vendedor completa su trabajo según lo especificado, pero el comprador no está satisfecho con los resultados. El contrato se considera:',
			alternativas:[
				{
					id: 1,
					texto: 'A. Nulo y sin efecto'
				},
				{
					id: 2,
					texto: 'B. Incompleto'
				},
				{
					id: 3,
					texto: 'C. Completo,.'
				},
				{
					id: 4,
					texto: 'D. Suspendido'
				}
			]	
		},
		{
			id: 3, 
			texto: '3. Todos los siguientes enunciados con respecto a los documentos de adquisición son incorrectos EXCEPTO',
			alternativas:[
				{
					id: 1,
					texto: 'A. Los documentos de adquisición bien diseñados pueden simplificar la comparación de las respuestas.'
				},
				{
					id: 2,
					texto: 'B. Los documentos de adquisición deben ser rigurosos e inflexibles para no permitir consideraciones a las sugerencias del vendedor.'
				},
				{
					id: 3,
					texto: 'C. En general, los documentos de adquisición no deben incluir criterios de selección.'
				},
				{
					id: 4,
					texto: 'D. Los documentos de adquisición bien diseñados no incluyen un enunciado del trabajo de las adquisiciones'
				}
			]	
		},
		{
			id: 4, 
			texto: '4. Un director de proyectos por parte del vendedor es informado por medio de su gerencia que el proyecto debe hacer todo lo posible para que les sean otorgados incentivos monetarios. El objetivo principal de las cláusulas de incentivos en un contrato es:',
			alternativas:[
				{
					id: 1,
					texto: 'A. Reducir los costos para el comprador'
				},
				{
					id: 2,
					texto: 'B. Ayudar al vendedor a controlar los costos'
				},
				{
					id: 3,
					texto: 'C. Sincronizar los objetivos.'
				},
				{
					id: 4,
					texto: 'D. Reducir los riesgos para el vendedor transfiriendo los riesgos al comprador'
				}
			]	
		},
		{
			id: 5, 
			texto: '5. Todas las declaraciones siguientes sobre control de cambios son incorrectas EXCEPTO:',
			alternativas:[
				{
					id: 1,
					texto: 'A. Un contrato de precio fijo va a minimizar la necesidad de control de cambios'
				},
				{
					id: 2,
					texto: 'B. Los cambios raras veces proporcionan beneficios reales al proyecto.'
				},
				{
					id: 3,
					texto: 'C. Los contratos deben incluir procedimientos para adaptar los cambios.'
				},
				{
					id: 4,
					texto: 'D. Las especificaciones más detalladas eliminan las causas de los cambios'
				}
			]	
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

