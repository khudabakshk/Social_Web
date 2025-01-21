"use client"
import React from 'react'
import { connectDB } from '../../lib/mongoose/connectDB'
export default function page() {
  connectDB()
  return (
    <div className='text-blue-500'>Home</div>

  )
}
