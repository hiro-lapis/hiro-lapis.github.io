import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

// https://fonts.google.com/knowledge/glossary#a-d
// Available subsets: `cyrillic`, `cyrillic-ext`, `greek`, `greek-ext`, `latin`, `latin-ext`, `vietnamese`
const inter = Inter({ subsets: ['cyrillic'] })

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
      <body className={'light ' + inter.className}>
        <Providers>
          <header></header>
          {children}
          <footer></footer>
        </Providers>
      </body>
    </html>
  )
}
