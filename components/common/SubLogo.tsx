import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const SubLogo = ({className}:{className?:string}) => {
  return (
    <Link href={"/"} className="inline-block">
     <Image src="/subLogo.svg"  alt="logo" width={150} height={50}    className={cn("w-20", className)}  />
    </Link>
  )
}

export default SubLogo