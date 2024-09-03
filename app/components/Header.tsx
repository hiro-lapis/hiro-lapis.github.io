'use client'

import dynamic from 'next/dynamic'
import { ThemeSwitcher } from '../components/ThemeSwitcher'
import { usePathname } from 'next/navigation'

// lazy load on client side rendering
const HomeIcon = dynamic(() => import('@/app/components/HeaderHomeIcon'), {
  loading: () => <p>Loading...</p>,
})

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
} from '@nextui-org/react'

export default function Header() {
  const pathname = usePathname()
  return (
    <Navbar>
      <NavbarBrand>
        <HomeIcon />
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={pathname === '/writings'}>
          <Link
            color={pathname === '/writings' ? 'primary' : 'foreground'}
            href="/writings"
          >
            Writing
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === '/speakings'}>
          <Link
            color={pathname === '/speakings' ? 'primary' : 'foreground'}
            href="/speakings"
          >
            Speaking
          </Link>
        </NavbarItem>
        {/* <NavbarItem isActive={pathname === '/notes'}>
          <Link color={pathname === '/notes' ? 'primary' : 'foreground'} href="/writings">
            Note
          </Link>
        </NavbarItem> */}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          {/* <Link href="#">Login</Link> */}
        </NavbarItem>
        <NavbarItem>
          <ThemeSwitcher />
          {/* <Button as={Link} color="primary" href="#" variant="flat">
              Sign Up
            </Button> */}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
