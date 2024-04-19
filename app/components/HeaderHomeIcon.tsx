'use client'
import { useRouter } from 'next/navigation'

export default function HeaderHomeIcon() {
  const router = useRouter()
  const handleClick = () => {
    router.push('/')
  }
  return (
    <p onClick={handleClick} className={`font-bold`}>
      hiro-lapis
    </p>
  )
}
