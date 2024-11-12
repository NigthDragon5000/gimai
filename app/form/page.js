'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Weight, Ruler, Calendar, User, FileText } from 'lucide-react'

export default function FormPage() {
  const [formData, setFormData] = useState({
    weight: '',
    height: '',
    age: '',
    gender: '',
    comments: ''
  })
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)



  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSelectChange = (value) => {
    setFormData(prevState => ({
      ...prevState,
      gender: value
    }))
  }

  /*
  const handleSubmit = async (e) => {
    e.preventDefault()
    // Aquí iría la lógica para llamar a la API de ChatGPT
    // Por ahora, solo redirigimos a la página de resultados
    router.push('/results')
  }
*/
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/generate_routine', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to generate routine')
      }

      const data = await response.json()
      router.push('/results?routine=' + encodeURIComponent(data.routine))
    } catch (error) {
      console.error('Error:', error)
      alert('Error generating routine. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500 flex flex-col items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Ingresa tus datos</h1>
        
        <div className="flex items-center space-x-2">
          <Weight className="text-gray-400" />
          <Input
            type="number"
            placeholder="Peso (kg)"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex items-center space-x-2">
          <Ruler className="text-gray-400" />
          <Input
            type="number"
            placeholder="Altura (cm)"
            name="height"
            value={formData.height}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex items-center space-x-2">
          <Calendar className="text-gray-400" />
          <Input
            type="number"
            placeholder="Edad"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex items-center space-x-2">
          <User className="text-gray-400" />
          <Select onValueChange={handleSelectChange} required>
            <SelectTrigger>
              <SelectValue placeholder="Género" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Masculino</SelectItem>
              <SelectItem value="female">Femenino</SelectItem>
              <SelectItem value="other">Otro</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-start space-x-2">
          <FileText className="text-gray-400 mt-2" />
          <Textarea
            placeholder="Comentarios sobre tu condición física"
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            className="min-h-[100px]"
          />
        </div>

        <Button type="submit" className="w-full">Generar Rutina</Button>
      </form>
    </div>
  )
}