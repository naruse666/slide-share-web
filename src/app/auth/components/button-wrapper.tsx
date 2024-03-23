'use client'

import { useState } from 'react'

import { CardContent } from '@/components/ui/card'

import AuthButton from './auth-button-item'

const authProviders = [
  {
    name: 'Google',
    provider: 'google',
    image: 'google',
  },
  {
    name: 'Discord',
    provider: 'discord',
    image: 'discord',
  },
  {
    name: 'GitHub',
    provider: 'github',
    image: 'github-dark',
  },
  {
    name: 'GitHub',
    provider: 'github',
    image: 'github-light',
  },
]

export default function ButtonWrapper() {
  const [pending, setPending] = useState(false)

  const handleSignIn = (provider: string) => {
    // signIn(provider)
    setPending(true)
  }

  return (
    <CardContent className="flex flex-col gap-3">
      {authProviders.map((provider, index) => (
        <AuthButton
          key={index}
          name={provider.name}
          provider={provider.provider}
          image={provider.image}
          pending={pending}
          handleSignIn={handleSignIn}
        />
      ))}
    </CardContent>
  )
}
