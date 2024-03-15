import React from 'react'

const page = ({ params }: { params: { language: string } }) => {
  return (
    <div>
        <div className='p-24 w-fit mx-auto text-5xl'>

      {params.language[0].toUpperCase()+params.language.slice(1)} Language Tutorials
        </div>
    </div>
  )
}

export default page
