import {
  Fira_Mono,
  Raleway,
  EB_Garamond,
  Arsenal,
  Roboto,
  Roboto_Mono,
} from 'next/font/google'

/**
 * available fonts: https://fonts.google.com/
 * subsets: https://fonts.google.com/knowledge/glossary/subsetting
 */
export const firaMono = Fira_Mono({
  subsets: ['latin'],
  weight: ['400'],
})

export const raleway = Raleway({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-inter',
})
export const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400'],
})
export const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['400'],
})
