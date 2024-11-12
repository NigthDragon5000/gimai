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
          
          La rutina debe incluir ejercicios específicos, series, repeticiones y descanso entre series.`
        }
      ]
    })

    return NextResponse.json({ routine: completion.choices[0].message.content })
  } catch (error) {
    console.error('Error calling OpenAI:', error)
    return NextResponse.json({ error: 'Error generating routine' }, { status: 500 })
  }
}