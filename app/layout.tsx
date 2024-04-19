import type { Metadata } from 'next'
import { Fira_Mono } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

/**
 * available fonts: https://fonts.google.com/
 * subsets: https://fonts.google.com/knowledge/glossary/subsetting
 */
const inter = Fira_Mono({
  subsets: ['latin'],
  weight: ['400'],
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={'light ' + `${inter.className}`}>
        <Providers>
          <header></header>
          {children}
          <footer></footer>
        </Providers>
      </body>
    </html>
  )
}
