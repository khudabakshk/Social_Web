'use client'
import  {React, useState } from 'react'
import { useRouter } from 'next/navigation'
import News from './News'
import "../../src/app/globals.css"

export default function RightSidebar() {

  const [input , setinput] = useState("")
  const router = useRouter ()

  const sumbitHandel = (e) =>{ 
    e.preventDefault()
    if (!input.trim()) return
    router.push(`/search/${input}`)
  }
  return (
    <>
      <form onSubmit={sumbitHandel}>

      <input  className=' text-black bg-white rounded-md mar p-2 w-64 m-auto  flex mb-5'   type="text" value={input}  onChange={(e)=>{setinput(e.target.value)}} placeholder='Search'  />
      </form>     
      <News/> 
    </>
  )
}