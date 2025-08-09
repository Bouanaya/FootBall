'use client'
import React from 'react'
import Button from '../ui/button'
import Link from 'next/link'
import Image from 'next/image'

export default function HeroSection() {
  return (
    <div className='md:flex md:px-8  md:pt-12 pt-64 pb-10   '>

    <div className="md:w-1/2 relative z-10 space-y-4 flex flex-col justify-center bg-yellow-200 p-6  ">
    <div className="w-40   rounded-full h-40  bg-primary absolute -bottom-63 md:-bottom-20 md:-right-8 right-10 z-0">
    
    </div>
    <div className="absolute z-10 space-y-5">
        <h1 className='md:text-7xl text-5xl '>Hi dream football holla <br /> est un bon club</h1>
        <p className=''>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex aliquam sit mollitia. Rem excepturi minima libero, nihil, saepe ex incidunt animi deleniti voluptas maiores voluptate nostrum, sequi sint optio molestias.</p>
         <Link  href='/incription'><Button  >inscription</Button> </Link>
    </div>
    </div>
    <div className="mt-32">
        <Image  src='/Na__August_15.jpg' width={800} height={800} alt='img' />
    </div>
    </div>
  )
}
