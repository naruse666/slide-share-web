'use client'

import { LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'

export default function SignOutButton() {
  return (
    <button
      className="text-xs flex gap-1 justify-start items-center mt-0.5 p-1.5 rounded transition-colors hover:text-foreground hover:bg-black/10 hover:dark:bg-white/10"
      onClick={() => {
        signOut()
      }}
    >
      <LogOut className="w-5 h-5" />
      サインアウト
    </button>
  )
}
