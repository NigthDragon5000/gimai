import React from 'react'
import { useEffect, useState } from 'react';

function ToDo({routine}) {
    const [exercises, setExercises] = useState([]);

    const toggleCompletion = (index) => {
        const updatedExercises = exercises.map((exercise, i) =>
            i === index ? { ...exercise, completed: !exercise.completed } : exercise
          );
          setExercises(updatedExercises);
      
          // Guardar el estado actualizado en localStorage
          localStorage.setItem('exercises', JSON.stringify(updatedExercises));
        };

    useEffect(() => {
        const savedExercises = localStorage.getItem('exercises');
        if (savedExercises) {
          setExercises(JSON.parse(savedExercises));
        } else {
            const processedData =JSON.parse(routine)['rutinas'].map((exercise, index) => 
                ({
                ...exercise,
                completed: false, // Inicializa como no completado
            }));
            setExercises(processedData)

    }}, []);

    const totalExercises = exercises.length;
    const completedExercises = exercises.filter((exercise) => exercise.completed).length;
    const progress = Math.round((completedExercises / totalExercises) * 100);
  

  return (
    <>
    <div className="mb-6">
      <div className="h-6 w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-500 text-xs text-white flex items-center justify-center"
          style={{ width: `${progress}%` }}
        >
          {progress}%
        </div>
      </div>
    </div>
      <ul className="space-y-4">
      {exercises.map((exercise,index)=>  (
        <li key={index} className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow">
          <div>
            <h3 className="text-lg font-bold">{exercise.nombre}</h3>
            <p className="text-sm text-gray-700">{exercise.descripcion}</p>
            <p className="text-sm text-gray-500">{exercise.temporalidad}</p>
          </div>
          <div>
            <input
              type="checkbox"
              className="h-5 w-5"
              checked={exercise.completed}
              onChange={() => toggleCompletion(index)}
            />
          </div>
        </li>
      ))}
    </ul>
  </>
  )
}

export default ToDo