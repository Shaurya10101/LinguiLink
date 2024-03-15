import React from 'react'

const page = ({ params }: { params: { level: string } }) => {
  return (
    <div>
      {params.level}
    </div>
  )
}

export default page
