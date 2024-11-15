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
          La respuesta debe estar en formato JSON como el siguiente ejemplo: {comentario_general:"tienes buena condicion fisica...",rutinas:[{id:1,nombre:"flexiones",descripcion:"Realizar 3 flexiones",temporalidad:"Martes y jueves",img:"/images/nombre_ejercicio.jpg"}]}
          En comentario general iria un breve analisis del estado del usuario y comentarios generales. Luego si no se puede crear una rutina la respuesta se debe devolver en blanco, en img debes sustituir "nombre_ejercicio" por el nombre correspondiente en minuscula`
        }
      ]
    })

    return NextResponse.json({ routine: completion.choices[0].message.content })
  } catch (error) {
    console.error('Error calling OpenAI:', error)
    return NextResponse.json({ error: 'Error generating routine' }, { status: 500 })
  }
}