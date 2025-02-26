"use client"

import { ReactNode } from 'react'
import { ColorModeScript, ColorModeProvider } from '@chakra-ui/react'

interface ProviderProps {
  children: ReactNode
}

export function Provider({ children }: ProviderProps) {
  return (
    <>
      <ColorModeScript />
      <ColorModeProvider>
        {children}
      </ColorModeProvider>
    </>
  )
}