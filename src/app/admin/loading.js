import { Spinner } from '@nextui-org/react'
import React from 'react'

const loading = () => {
  return (
    <div className='min-h-screen flex w-full items-center justify-center'><Spinner size="xl" color="primary" /></div>
  )
}

export default loading