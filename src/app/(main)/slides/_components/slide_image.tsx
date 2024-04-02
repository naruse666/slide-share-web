'use client'

import Image from 'next/image'
import { useState } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import SlideDummyImage from './assets/slide-dummy.jpg'

export default function SlideImage({
  src,
  alt,
  speaker_name,
  speaker_image,
}: {
  src: string
  alt: string
  speaker_name: string
  speaker_image: string
}) {
  const [error, setError] = useState(false)

  return (
    <div>
      {error ? (
        <div className="relative transition-all duration-300 group-hover:scale-105">
          <Image
            src={SlideDummyImage}
            className="object-fit object-center block w-full h-full"
            alt={alt}
          />
          <div className="absolute text-black bg-primary/30 top-0 right-0 w-full h-full -translate-y-6 flex flex-col justify-center items-center gap-1">
            <p className="font-bold text-2xl text-balance">{alt}</p>
            <Avatar className="w-5 h-5">
              <AvatarImage src={speaker_image} alt={speaker_name[0]} />
              <AvatarFallback>{speaker_name[0]}</AvatarFallback>
            </Avatar>
            <p className="text-sm font-semibold text-black/70">
              {speaker_name}
            </p>
          </div>
        </div>
      ) : (
        <Image
          src={src}
          className="object-contain transition-all duration-300 group-hover:scale-105"
          alt={alt}
          onError={() => setError(true)}
          fill
        />
      )}
    </div>
  )
}
