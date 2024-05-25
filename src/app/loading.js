import React from 'react'
import { Spinner } from '@nextui-org/react'
const loading = () => {
  return (
      <div className='flex min-h-screen item-center justify-center'>
          <Spinner color='primary' size='lg'/>
    </div>
  )
}

export default loading