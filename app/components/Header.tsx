import dynamic from 'next/dynamic'
import { ThemeSwitcher } from '../components/ThemeSwitcher'

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
  return (
    <Navbar>
      <NavbarBrand>
        <HomeIcon />
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/writings">
            Writing
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
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
