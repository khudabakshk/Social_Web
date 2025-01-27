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

      <input  className= 'bg-gray-100 border text-black border-gray-200 rounded-3xl text-sm w-full px-4 py-2'   type="text" value={input}  onChange={(e)=>{setinput(e.target.value)}} placeholder='Search'  />
      </form>     
      <News/> 
    </>
  )
}