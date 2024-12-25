'use client'

import { useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { Dumbbell, ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import BottomNavBar from "@/components/ui/BottomNavBar"
import Image from 'next/image'

export default function ResultsPage() {
  const searchParams = useSearchParams()
  const routine = searchParams.get('routine')

  const [showRoutines, setShowRoutines] = useState(true)
  const toggleRoutines = () => {
    setShowNutrition(false);
    setShowRoutines(true);
  }

  const [showNutrition, setShowNutrition] = useState(false)
  const toggleNutrition = () => {
    setShowNutrition(true);
    setShowRoutines(false);
  }


  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 flex flex-col 
    items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl space-y-4 bg-white p-8 rounded-lg shadow-lg">
        <Dumbbell className="mx-auto h-16 w-16 text-blue-500" />
        <h1 className="text-2xl font-bold mb-4 text-center">Tu Rutina Personalizada</h1>
        {showRoutines && (
        <>
        <div >
         <div className='p-5 bg-slate-300'>{JSON.parse(routine)['comentario_general']}</div> 
        </div>
        <div className="text-gray-600 mb-4 whitespace-pre-wrap grid grid-cols-1 gap-2">
       {/*  {routine || 'Lo sentimos, no se pudo generar una rutina. Por favor, intenta de nuevo.'}  */}
         {JSON.parse(routine)['rutinas'].map((event,index)=>(
            <div key={index} >
            <div href="#" className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <iframe className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={event.video} alt="" allowFullScreen></iframe>
                <div className="flex flex-col justify-between p-4 leading-normal">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{event.nombre}</h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{event.descripcion}</p>
                    <p className="mb-3 font-normal text-gray-400 dark:text-gray-400">{event.temporalidad}</p>
                </div>
            </div>
            </div>
            ))
            }

        </div>
        </>
        )}
        {
          showNutrition && (
            <div className="mt-4">
              <h2 className="text-xl font-bold mb-2">Nutrición</h2>
              <p className="text-gray-600">
                {JSON.parse(routine)['nutricion']}
              </p>
            </div>
          )
        }
        <Button asChild className="mt-4">
          <Link href="/" className="flex items-center justify-center">
            <ArrowLeft className="mr-2 h-4 w-4" /> Volver al inicio
          </Link>
        </Button>

        <div 
        className="mb-4 fixed bottom-0 left-0 right-0 p-4 bg-gray-200
        flex justify-around">

          <div onClick={toggleRoutines} className="boder-solid border-2
          border-gray-300 md:px-20 px-4 py-2 hover:bg-orange-100 
          bg-slate-500 text-white hover:text-black">
            Rutinas
          </div>

          <div onClick={toggleNutrition} className="boder-solid border-2
          border-gray-300 md:px-20 px-4 py-2 hover:bg-orange-100 
          bg-slate-500 text-white hover:text-black">
          Nutricion
          </div>

        </div>

      </div>
    </div>
  )
}