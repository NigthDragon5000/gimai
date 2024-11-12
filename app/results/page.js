'use client'

import { useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { Dumbbell, ArrowLeft } from 'lucide-react'

export default function ResultsPage() {
  const searchParams = useSearchParams()
  const routine = searchParams.get('routine')

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-4 bg-white p-8 rounded-lg shadow-lg">
        <Dumbbell className="mx-auto h-16 w-16 text-blue-500" />
        <h1 className="text-2xl font-bold mb-4 text-center">Tu Rutina Personalizada</h1>
        <div className="text-gray-600 mb-4 whitespace-pre-wrap">
          {routine || 'Lo sentimos, no se pudo generar una rutina. Por favor, intenta de nuevo.'}
        </div>
        <Button asChild className="mt-4">
          <Link href="/" className="flex items-center justify-center">
            <ArrowLeft className="mr-2 h-4 w-4" /> Volver al inicio
          </Link>
        </Button>
      </div>
    </div>
  )
}