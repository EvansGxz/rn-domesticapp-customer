interface ArrayFaqs {
  id: number;
  pregunta: string;
  respuesta: string;
}
interface Faqs {
  [index: number]: {
    id: number;
    title: string;
    legend: string;
    preguntas: Array<ArrayFaqs>;
  }
}

export const FAQS: Faqs = {
    '1': {
        id: 1,
        title: "PQR Servicios",
        legend: "1.1 FAQS RELACIONADO CON MIS SERVICIOS",
        preguntas: [
            {
                id: 1,
                pregunta:
                    "1.1.1 ¿Cómo puedo programar/cancelar o reagendar un servicio en Domesticapp?",
                respuesta:
                    "Descarga el aplicativo móvil de Domesticapp para Colombia, España y Canadá y accede al manejo de tus servicios en tiempo real. Conoce a tus asistentes, califícalos y goza de múltiples beneficios.",
            },
            {
                id: 2,
                pregunta:
                    "1.1.2 ¿Qué garantías tengo cuando contrato un servicio con Domesticapp?",
                respuesta:
                    "TODOS tus servicios están protegidos por daños a terceros con el fin de evitar cualquier altercado, además, todos nuestros asistentes cuentan con certificaciones especializadas para sus labores.",
            },
        ],
    },
    '2': {
        id: 2,
        title: "PQR Cuentas",
        legend: "1.2 FAQS RELACIONADO CON MI CUENTA",
        preguntas: [
            {
                id: 1,
                pregunta: "1.2.1 ¿Cómo se maneja mi información personal?",
                respuesta:
                    "En Domesticapp tu información es muy importante para nosotros, nunca divulgaremos tus datos con terceros de acuerdo con las políticas internacionales de protección de la información del usuario",
            },
            {
                id: 2,
                pregunta:
                    "1.2.2 ¿Cuáles son los beneficios de contar con una cuenta en Domesticapp?",
                respuesta:
                    "Cuando te registras en Domesticapp accedes a descuentos, sorteos con tus servicios, además, puedes compartir estos regalos al referir a tus amigos y familiares.",
            },
        ],
    },
    '3': {
        id: 3,
        title: "PQR Empleados",
        legend: "1.3 FAQS RELACIONADO CON ASISTENTES Y EMPLEADOS",
        preguntas: [
            {
                id: 1,
                pregunta:
                    "1.3.1 ¿Con que experiencia cuentan los empleados y asistentes?",
                respuesta: `TODOS nuestros asistentes y empleados han pasado por un filtro exhaustivo bilateral, realizamos un seguimiento del perfil laboral mediante nuestra inteligencia artificial "Mile" y posteriormente una evaluación psicológica donde verificamos uno a uno todos los datos suministrados, antecedentes y por supuesto su experticia y experiencia en el oficio. Recuerda que puedes estar al tanto de esta información en tiempo real en el perfil del empleado o asistente de tu interés.`,
            },
            {
                id: 2,
                pregunta:
                    "1.3.2 ¿Con que experiencia cuentan los empleados y asistentes?",
                respuesta: `Acogidos con un compromiso social global, Domesticapp garantiza todas las prestaciones de ley, el salario justo y los beneficios laborales vigentes en cada país donde realiza operaciones comerciales a cada uno de los miembros de su personal.`,
            },
        ],
    },
    '4': {
        id: 4,
        title: "PQR Pagos",
        legend: "1.4 FAQS RELACIONADO CON MIS PAGOS",
        preguntas: [
            {
                id: 1,
                pregunta:
                    "1.4.1 ¿Qué ocurre si noto una inconsistencia en alguno de mis pagos?",
                respuesta: `Nuestro sistema de pagos cuenta con tecnología avanzada en seguridad informática y encriptado bilateral, sin embargo en caso de presentarse alguna inconsistencia con tus pagos o facturación puedes realizar tu reclamo en el chat de soporte 24/7 o en cualquiera de nuestras líneas de atención presentes en www.domesticapp.com.co, nuestro equipo de atención al cliente le dará la mayor celeridad a tu requerimiento.`,
            },
            {
                id: 2,
                pregunta:
                    "1.4.2 ¿Existen costos ocultos al programar un servicio con Domesticapp?",
                respuesta: `En Domesticapp no existe NINGUN costo oculto, evite caer en manos de personas inescrupulosas y no suministre nunca pagos a terceros, asistentes o empleados. Realice todos sus pagos UNICA y EXCLUSIVAMENTE por nuestros aplicativos o ChatBots Autorizados.`,
            },
        ],
    },
    '5': {
        id: 5,
        title: "PQR Covid-19",
        legend: "1.5 FAQS RELACIONADO CON LA COVID-19",
        preguntas: [
            {
                id: 1,
                pregunta:
                    "1.5.1 ¿Cuáles son las políticas de Domesticapp con respecto a la Covid-19?",
                respuesta: `Tenemos un compromiso inmodificable con la salud y el bienestar tanto de nuestros asistentes y colaboradores como también con el de nuestros clientes, por eso Domesticapp se acoge a todas las decisiones e instrucciones de sanidad suministradas por los entes reguladores de cada país. Usted NO DEBE TRABAJAR si se considera sospechoso a Covid-19 u otros virus, rinovirus o infecciones, esto es por su salud y bienestar. Siempre contará con todos los protocolos de bioseguridad suministrados por nuestra compañía`,
            },
        ],
    },
    '6': {
        id: 6,
        title: "PQR Dotación",
        legend: "1.6 FAQS RELACIONADO CON MI DOTACIÓN",
        preguntas: [
            {
                id: 1,
                pregunta:
                    "1.6.1 ¿Cuál es la dotación para la prestación de mis servicios y cada cuanto debe ser renovada?",
                respuesta: `Debe radicar la solicitud por escrito, pidiendo el respectivo formato por cualquiera de los canales de atención (Como el chat de soporte 24/7) y especificar de forma detallada los motivos de su petición y estar de acuerdo con su posterior descuento de nomina. Domesticapp únicamente realiza este tipo de procedimientos atendiendo a necesidades de forma urgente que puedan presentarse para sus asistentes y empleados.`,
            },
        ],
    },
    '7': {
        id: 7,
        title: "PQR Beneficios",
        legend: "1.7 FAQS RELACIONADO CON MIS BENEFICIOS",
        preguntas: [
            {
                id: 1,
                pregunta: `1.7.1 ¿Cuáles son mis beneficios por estar
            registrado en Domesticapp?`,
                respuesta: `En Domesticapp encuentras pilares no negociables: Cuidamos tu bolsillo, Protegemos tus espacios y garantizamos la máxima satisfacción. Además accedes a beneficios de nuestros aliados solo por usar nuestros servicios, restaurantes, teatros, cinemas y demás.`,
            },
            {
                id: 2,
                pregunta: "1.7.2 ¿Cómo accedo a mis beneficios en Domesticapp?",
                respuesta: `Desde que realizas el registro en Domesticapp accedes a descuentos y beneficios, sistema de referidos gana a gana. En nuestras redes sociales encontrarás información actualizada de nuestros regalos y beneficios de temporada.`,
            },
        ],
    },
    '8': {
        id: 8,
        title: "PQR Devoluiones",
        legend: "1.8 FAQS RELACIONADO CON MIS DEVOLUCIONES",
        preguntas: [
            {
                id: 1,
                pregunta: `1.8.1 ¿En que casos puedo acceder a una devolución?`,
                respuesta: `Cuando por eventualidades en nuestros sistemas, incumplimiento de labores u otras variables en el servicio, no se cumple a cabalidad con lo establecido dentro de nuestras políticas de calidad.`,
            },
            {
                id: 2,
                pregunta: "1.8.2 ¿Cómo realizo una petición de devolución?",
                respuesta: `En todas nuestras plataformas cuentas con servicio de atención al cliente 24/7, ChatBot de respuestas automatizadas y atención vía email.`,
            },
        ],
    },
};
