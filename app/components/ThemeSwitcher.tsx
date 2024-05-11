'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Switch } from '@nextui-org/react'
import { MoonIcon } from './icons/MoonIcon'
import { SunIcon } from './icons/SunIcon'

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div>
      <Switch
        defaultSelected
        size="lg"
        color="primary"
        onValueChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        startContent={<SunIcon />}
        endContent={<MoonIcon />}
      ></Switch>
    </div>
  )
}
