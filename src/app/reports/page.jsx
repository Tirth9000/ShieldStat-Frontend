"use client";

import React from 'react'
import Navbar from '@/components/Navbar';

const page = () => {
  return (
    <div className="min-h-screen w-full bg-black text-white">
          <Navbar />
          <div className="pt-24 px-6">
            <h1 className="flex items-center justify-center">Reports Content</h1>
          </div>
        </div>
  )
}

export default page