'use client'
import React from 'react';
import Link from 'next/link'

const BottomNavBar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-200 text-black flex justify-around p-4">
      <Link href="/results">
        <button className="focus:outline-none border-solid border-2
        border-gray-300 md:px-20 px-4 py-2  ">
            Rutinas
        </button>
     </Link>

    {/*<button className="focus:outline-none border-solid border-2
       border-gray-300 md:px-20 px-4 py-2  ">
        <Link href="/nutricion">Nutricion</Link>
     </button>

      <button className="focus:outline-none border-solid border-2
       border-gray-300 md:px-20 px-4 py-2">Actividades</button> */}
    </div>
  );
};

export default BottomNavBar;