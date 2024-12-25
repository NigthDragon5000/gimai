import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(req) {
  const body = await req.json()
  const { weight, height, age, gender, comments } = body

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Eres un entrenador personal experto en crear rutinas de ejercicios personalizadas."
        },
        {
          role: "user",
          content: `Crea una rutina de ejercicios personalizada para una persona con las siguientes características:
          - Peso: ${weight} kg
          - Altura: ${height} cm
          - Edad: ${age} años
          - Género: ${gender}
          - Comentarios adicionales: ${comments}
          
          La rutina debe incluir ejercicios específicos, series, repeticiones y descanso entre series.
          La respuesta debe estar en formato JSON como el siguiente ejemplo: {"comentario_general":"tienes buena condicion fisica...","nutricion":"Se sugiere que comas comidas bajas en grasa...","rutinas":[{"nombre":"flexiones","descripcion":"Realizar 3 flexiones","temporalidad":"Martes y jueves","video":"https://www.youtube.com/embed/..."}]}
          En comentario general iria un breve analisis del estado del usuario y comentarios generales. Luego si no se puede crear una rutina la respuesta se debe devolver en blanco.
          En nutricion debes sugerir una dieta en funcion de la informacion proporcionada.
          En video debes sustituir lo que este entre comillas por una url de you tube funcional 
          de la siguiente lista. Es extremadamente importante entonces que solo sugieras ejercicios de esta lista. Para asegurar que cada recomendacion tenga un video
[
  {
    "ejercicio": "Correr",
    "descripcion": "Actividad cardiovascular básica que mejora la resistencia y salud general.",
    "url_youtube": "https://www.youtube.com/embed/yBdMIy2WXRw&t=1s"
  },
  {
    "ejercicio": "Trotar",
    "descripcion": "Variante más suave del correr, ideal para principiantes o calentamientos.",
    "url_youtube": "https://www.youtube.com/embed/OzzPZ9_1hnE"
  },
  {
    "ejercicio": "Sentadillas",
    "descripcion": "Ejercicio fundamental para fortalecer piernas y glúteos.",
    "url_youtube": "https://www.youtube.com/embed/U3HlEF_E9fo"
  },
  {
    "ejercicio": "Flexiones de pecho",
    "descripcion": "Trabaja el pecho, tríceps y hombros, mejorando la fuerza de la parte superior.",
    "url_youtube": "https://www.youtube.com/embed/_l3ySVKYVJ8"
  },
  {
    "ejercicio": "Plancha abdominal",
    "descripcion": "Fortalece el core y mejora la estabilidad corporal.",
    "url_youtube": "https://www.youtube.com/embed/pSHjTRCQxIw"
  },
  {
    "ejercicio": "Burpees",
    "descripcion": "Ejercicio de cuerpo completo que combina sentadilla, flexión y salto.",
    "url_youtube": "https://www.youtube.com/embed/TU8QYVW0gDU"
  },
  {
    "ejercicio": "Zancadas (Lunges)",
    "descripcion": "Fortalece piernas y glúteos, mejorando el equilibrio.",
    "url_youtube": "https://www.youtube.com/embed/QOVaHwm-Q6U"
  },
  {
    "ejercicio": "Dominadas (Pull-ups)",
    "descripcion": "Ejercicio para espalda y bíceps, utilizando una barra fija.",
    "url_youtube": "https://www.youtube.com/embed/eGo4IYlbE5g"
  },
  {
    "ejercicio": "Remo con mancuernas",
    "descripcion": "Fortalece la espalda media y los bíceps.",
    "url_youtube": "https://www.youtube.com/embed/l4n26ss5oe0"
  },
  {
    "ejercicio": "Press de banca",
    "descripcion": "Ejercicio principal para desarrollar el pecho, hombros y tríceps.",
    "url_youtube": "https://www.youtube.com/embed/rT7DgCr-3pg"
  },
  {
    "ejercicio": "Peso muerto",
    "descripcion": "Trabaja la cadena posterior: espalda baja, glúteos y piernas.",
    "url_youtube": "https://www.youtube.com/embed/ytGaGIn3SjE"
  },
  {
    "ejercicio": "Elevaciones laterales",
    "descripcion": "Aísla y fortalece los músculos del hombro.",
    "url_youtube": "https://www.youtube.com/embed/kDqklk1ZESo"
  },
  {
    "ejercicio": "Curl de bíceps con mancuernas",
    "descripcion": "Ejercicio aislado para fortalecer los bíceps.",
    "url_youtube": "https://www.youtube.com/embed/in7PaeYlhrM"
  },
  {
    "ejercicio": "Extensiones de tríceps",
    "descripcion": "Fortalece los músculos del tríceps en la parte posterior del brazo.",
    "url_youtube": "https://www.youtube.com/embed/nRiJVZDpdL0"
  },
  {
    "ejercicio": "Abdominales (Crunches)",
    "descripcion": "Ejercicio clásico para fortalecer la zona abdominal.",
    "url_youtube": "https://www.youtube.com/embed/MKmrqcoCZ-M"
  },
  {
    "ejercicio": "Mountain Climbers",
    "descripcion": "Ejercicio cardiovascular que también trabaja el core y las piernas.",
    "url_youtube": "https://www.youtube.com/embed/nmwgirgXLYM"
  },
  {
    "ejercicio": "Salto a la cuerda",
    "descripcion": "Mejora la coordinación y es excelente para el acondicionamiento cardiovascular.",
    "url_youtube": "https://www.youtube.com/embed/jJkVueml0Ik"
  },
  {
    "ejercicio": "Bicicleta estática",
    "descripcion": "Ejercicio cardiovascular de bajo impacto que fortalece las piernas.",
    "url_youtube": "https://www.youtube.com/embed/0-RnCa7KJ5Q"
  },
  {
    "ejercicio": "Elíptica",
    "descripcion": "Máquina que proporciona un entrenamiento cardiovascular completo sin impacto.",
    "url_youtube": "https://www.youtube.com/embed/ag6fEqjrlCI"
  },
  {
    "ejercicio": "Remo en máquina",
    "descripcion": "Ejercicio que simula el remo, trabajando tanto la parte superior como inferior del cuerpo.",
    "url_youtube": "https://www.youtube.com/embed/5D6j7C8ZXg4"
  },
  {
    "ejercicio": "Press militar",
    "descripcion": "Fortalece los hombros y tríceps, se realiza de pie o sentado con barra o mancuernas.",
    "url_youtube": "https://www.youtube.com/embed/2yjwXTZQDDI"
  },
  {
    "ejercicio": "Elevaciones de talones (Calf Raises)",
    "descripcion": "Ejercicio para fortalecer los músculos de la pantorrilla.",
    "url_youtube": "https://www.youtube.com/embed/-M4-G8p8fmc"
  },
  {
    "ejercicio": "Press de pierna en máquina",
    "descripcion": "Trabaja los músculos de las piernas, especialmente cuádriceps y glúteos.",
    "url_youtube": "https://www.youtube.com/embed/IZxyjW7MPJQ"
  },
  {
    "ejercicio": "Crunch abdominal en máquina",
    "descripcion": "Aísla y fortalece los músculos abdominales utilizando una máquina específica.",
    "url_youtube": "https://www.youtube.com/embed/1fOZXgD1Mbc"
  },
  {
    "ejercicio": "Jalón al pecho en polea",
    "descripcion": "Ejercicio para fortalecer la espalda, especialmente el dorsal ancho.",
    "url_youtube": "https://www.youtube.com/embed/CAwf7n6Luuc"
  },
  {
    "ejercicio": "Face Pull en polea",
    "descripcion": "Fortalece los músculos de la parte posterior del hombro y la parte superior de la espalda.",
    "url_youtube": "https://www.youtube.com/embed/ii9zHNQSz8s"
  },
  {
    "ejercicio": "Step-ups con mancuernas",
    "descripcion": "Fortalece piernas y glúteos subiendo y bajando de una superficie elevada.",
    "url_youtube": "https://www.youtube.com/embed/6cPOcDuQW9I"
  },
  {
    "ejercicio": "Spinning",
    "descripcion": "Entrenamiento cardiovascular intenso en bicicleta fija.",
    "url_youtube": "https://www.youtube.com/embed/1cSRzNVbN0k"
  },
    {
        "ejercicio": "Sprints en cuestas",
        "descripcion": "Correr rápidamente cuesta arriba para desarrollar fuerza y resistencia.",
        "url_youtube": "https://www.youtube.com/embed/MbYgf-xt2j8"
    },
    {
        "ejercicio": "Bear Crawls",
        "descripcion": "Movimiento en cuatro apoyos para fortalecer el core y mejorar la coordinación.",
        "url_youtube": "https://www.youtube.com/embed/aM02pNTDBts"
    },
    {
        "ejercicio": "Salto de caja (Box Jump)",
        "descripcion": "Salto explosivo hacia una plataforma elevada para mejorar la potencia.",
        "url_youtube": "https://www.youtube.com/embed/Ocb9rzMXPIU"
    },
    {
        "ejercicio": "Farmers Walk",
        "descripcion": "Caminar sosteniendo pesas pesadas para trabajar la fuerza de agarre y el core.",
        "url_youtube": "https://www.youtube.com/embed/Uxe4rLhcWNs"
    },
    {
        "ejercicio": "Golpes con balón medicinal",
        "descripcion": "Lanzar un balón medicinal contra el suelo con fuerza.",
        "url_youtube": "https://www.youtube.com/embed/N2z3gkY4E6c"
    },
    {
        "ejercicio": "Press Arnold",
        "descripcion": "Variación del press militar que trabaja los hombros con un rango más amplio.",
        "url_youtube": "https://www.youtube.com/embed/6Z15_WdXmVw"
    },
    {
        "ejercicio": "Pullover con mancuernas",
        "descripcion": "Ejercicio que trabaja el dorsal ancho y el pecho.",
        "url_youtube": "https://www.youtube.com/embed/MKmpWRoVJkc"
    },
    {
        "ejercicio": "Flexiones diamante",
        "descripcion": "Flexión con las manos juntas para enfocar el trabajo en los tríceps.",
        "url_youtube": "https://www.youtube.com/embed/jJlO-7lzoA4"
    },
    {
        "ejercicio": "Elevación de piernas colgado",
        "descripcion": "Ejercicio para fortalecer el core colgándose de una barra.",
        "url_youtube": "https://www.youtube.com/embed/46OfTI8fdKg"
    },
    {
        "ejercicio": "Hip Thrust",
        "descripcion": "Ejercicio que aísla y fortalece los glúteos.",
        "url_youtube": "https://www.youtube.com/embed/1zBPBCBnlmY"
    },
    {
        "ejercicio": "Snatch con mancuerna",
        "descripcion": "Movimiento explosivo que trabaja todo el cuerpo con una mancuerna.",
        "url_youtube": "https://www.youtube.com/embed/Vih8niapA9E"
    },
    {
        "ejercicio": "Battle Ropes",
        "descripcion": "Agitar cuerdas pesadas para un entrenamiento cardiovascular y de fuerza.",
        "url_youtube": "https://www.youtube.com/embed/ix_KgLTsEsg"
    },
    {
        "ejercicio": "Kettlebell Swings",
        "descripcion": "Ejercicio dinámico para trabajar la cadena posterior y el core.",
        "url_youtube": "https://www.youtube.com/embed/YSxHifyI0hE"
    },
    {
        "ejercicio": "Russian Twists",
        "descripcion": "Rotaciones para fortalecer los oblicuos utilizando peso adicional.",
        "url_youtube": "https://www.youtube.com/embed/wkD8rjkodUI"
    },
    {
        "ejercicio": "Estocadas caminando (Walking Lunges)",
        "descripcion": "Variante de zancadas que incluye desplazamiento para mayor desafío.",
        "url_youtube": "https://www.youtube.com/embed/D7KaRcUTQeE"
    },
    {
        "ejercicio": "Clean and Press",
        "descripcion": "Movimiento compuesto que combina levantar y empujar peso sobre la cabeza.",
        "url_youtube": "https://www.youtube.com/embed/5yWaNOvgFCM"
    },
    {
        "ejercicio": "Plancha lateral",
        "descripcion": "Fortalece los oblicuos y mejora la estabilidad lateral del core.",
        "url_youtube": "https://www.youtube.com/embed/wqzrb67Dwf8"
    },
    {
        "ejercicio": "Step en banco",
        "descripcion": "Subir y bajar de un banco o plataforma para trabajar piernas y glúteos.",
        "url_youtube": "https://www.youtube.com/embed/6cPOcDuQW9I"
    },
    {
        "ejercicio": "Remo con barra",
        "descripcion": "Trabaja la espalda y los bíceps utilizando una barra con peso.",
        "url_youtube": "https://www.youtube.com/embed/kBWAon7ItDw"
    },
    {
        "ejercicio": "Skater Jumps",
        "descripcion": "Saltos laterales para mejorar la estabilidad y potencia de las piernas.",
        "url_youtube": "https://www.youtube.com/embed/AI8i0hQMUQ8"
    }
]
          Por favor es muy importante que toda la informacion que generes debe estar entre {} no incluyes ninguna palabra o string adicional fuera de estos simbolos {} . Y revisa que el JSON este correctamente hecho
          `
        }
      ]
    })

    return NextResponse.json({ routine: completion.choices[0].message.content })
  } catch (error) {
    console.error('Error calling OpenAI:', error)
    return NextResponse.json({ error: 'Error generating routine' }, { status: 500 })
  }
}