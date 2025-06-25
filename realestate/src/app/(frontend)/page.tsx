import Image from 'next/image'

import config from '@/payload.config'
import './styles.css'
import { Button } from '@/components/ui/button'

export default async function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">Hello World!</h1>
      <Button>Get Started</Button>
    </div>
  )
}
