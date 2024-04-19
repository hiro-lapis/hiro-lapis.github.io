import { Fira_Mono, Raleway_Dots } from 'next/font/google'

/**
 * available fonts: https://fonts.google.com/
 * subsets: https://fonts.google.com/knowledge/glossary/subsetting
 */
export const firaMono = Fira_Mono({
  subsets: ['latin'],
  weight: ['400'],
})

export const ralewayDots = Raleway_Dots({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-inter',
})
