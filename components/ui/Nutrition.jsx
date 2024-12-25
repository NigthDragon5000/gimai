import React from 'react'

function Nutrition({routine}) {

  return (
    <div className="mt-4">
        <h2 className="text-xl font-bold mb-2">Nutrición</h2>
        <p className="text-gray-600">
        {JSON.parse(routine)['nutricion']}
        </p>
  </div>
  )
}

export default Nutrition