'use client'

import { Monitor, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import type { FC } from 'react'

import { cn } from '@/lib/utils'

import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

interface ThemeToggleProps {
  className?: string
}

export const ThemeToggle: FC<ThemeToggleProps> = (props) => {
  const { setTheme, theme, systemTheme } = useTheme()
  const className =
    'hover:bg-primary/10 text-muted-foreground hover:text-foreground group flex h-8 flex-row items-center space-x-2 rounded-md px-2 text-sm'
  return (
    <Popover>
      <PopoverTrigger className="text-foreground">
        {systemTheme === 'light' && (
          <Sun aria-hidden="true" className="h-5 w-5" />
        )}
        {systemTheme === 'dark' && (
          <Moon aria-hidden="true" className="h-5 w-5" />
        )}
      </PopoverTrigger>
      <PopoverContent sideOffset={-78} className="mb-10 mr-20">
        <div className="flex flex-row space-x-1">
          <button
            onClick={() => {
              setTheme('light')
            }}
            className={cn(
              className,
              props.className,
              theme === 'light' && 'bg-primary/20 text-primary',
            )}
          >
            <Sun aria-hidden="true" className="h-5 w-5" />
          </button>
          <button
            onClick={() => {
              setTheme('dark')
            }}
            className={cn(
              className,
              props.className,
              theme === 'dark' && 'bg-primary/20 text-primary',
            )}
          >
            <Moon aria-hidden="true" className="h-5 w-5" />
          </button>
          <button
            onClick={() => {
              setTheme('system')
            }}
            className={cn(
              className,
              props.className,
              theme === 'system' && 'bg-primary/20 text-primary',
            )}
          >
            <Monitor aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
