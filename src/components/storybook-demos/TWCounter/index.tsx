import { useState } from 'react'

/* ========================================================================
                                TWCounter
======================================================================== */

export const TWCounter = ({ onClick }: any) => {
  const [count, setCount] = useState(0)
  return (
    <button
      className='btn-blue btn-sm mx-auto block'
      onClick={() => {
        onClick?.()
        setCount((v) => v + 1)
      }}
    >
      Count: {count}
    </button>
  )
}
