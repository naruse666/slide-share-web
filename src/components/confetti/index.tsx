'use client'

import { useWindowSize } from '@uidotdev/usehooks'
import { useEffect, useState } from 'react'
import Confetti from 'react-confetti'

export default function SlideConfetti() {
  const size = useWindowSize()
  const [recycle, setRecycle] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setRecycle(false)
    }, 5000)
  })

  return (
    <Confetti
      width={size.width || 0}
      height={size.height || 0}
      recycle={recycle}
    />
  )
}
