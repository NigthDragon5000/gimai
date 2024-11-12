import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Dumbbell, ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
        <div className="text-center space-y-6 p-8">
          <Dumbbell className="mx-auto h-24 w-24 text-white" />
          <h1 className="text-4xl font-bold text-white sm:text-6xl">Plan de Fitness Personalizado</h1>
          <p className="text-xl text-white sm:text-2xl">Crea tu rutina de ejercicios personalizada con IA</p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/form" className="flex items-center">
              Comenzar <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </main>
      <footer className="bg-gray-800 text-white text-center py-4">
        © 2024 Bad LLama AI. Todos los derechos reservados.
      </footer>
    </div>
  )
}