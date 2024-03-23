'use client'

import { ArrowRight, Loader } from 'lucide-react'
import Image from 'next/image'
import { signIn } from 'next-auth/react'
import { useState } from 'react'

export default function AuthButton({
  name,
  provider,
  image,
  pending,
  handleSignIn,
}: {
  name: string
  provider: string
  image: string
  pending: boolean
  handleSignIn: (provider: string) => void
}) {
  const [currentProvider, setCurrentProvider] = useState<string>('')

  const handleAuthButtonClick = () => {
    setCurrentProvider(provider)
    handleSignIn(provider)
    signIn(provider, { callbackUrl: '/' })
  }

  if (provider === 'github') {
    return (
      <button
        onClick={() => {
          handleAuthButtonClick()
        }}
        disabled={pending}
        className={`w-72 justify-between items-center px-2.5 py-2 border rounded-md shadow-black transition-all group disabled:opacity-40 ${pending ? 'cursor-not-allowed' : 'hover:bg-white/10 cursor-pointer'} ${image === 'github-light' ? 'hidden dark:flex' : 'flex dark:hidden'} ${currentProvider === provider ? 'disabled:opacity-60' : 'disabled:opacity-40'}`}
      >
        <Image src={`/${image}.webp`} width={25} height={25} alt={name} />
        <p className="font-semibold tracking-wide text-foreground ">{name}</p>
        {currentProvider === provider ? (
          <Loader className="w-6 h-6 animate-spin" />
        ) : (
          <ArrowRight
            className={`w-6 h-6 ${!pending && 'transition-transform duration-300 group-hover:translate-x-1'}`}
          />
        )}
      </button>
    )
  }

  return (
    <button
      onClick={() => {
        handleAuthButtonClick()
      }}
      disabled={pending}
      className={`flex w-72 justify-between items-center px-2.5 py-2 border rounded-md shadow-black transition-all group disabled:opacity-40 ${pending ? 'cursor-not-allowed' : 'hover:bg-white/10 cursor-pointer'} ${currentProvider === provider ? 'disabled:opacity-60' : 'disabled:opacity-40'}`}
    >
      <Image src={`/${image}.webp`} width={25} height={25} alt={name} />
      <p className="font-semibold tracking-wide text-foreground ">{name}</p>
      {currentProvider === provider ? (
        <Loader className="w-6 h-6 animate-spin" />
      ) : (
        <ArrowRight
          className={`w-6 h-6 ${!pending && 'transition-transform duration-300 group-hover:translate-x-1'}`}
        />
      )}
    </button>
  )
}
