import Dropdown from '@/components/Dropdown/Dropdown'
import MainPage from '@/components/Dropdown/mainPage/MainPage'
import React from 'react'

export default function HomePage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-cover bg-center bg-no-repeat overflow-hidden" style={{ backgroundImage: "url('/f1bg.jpg')" }}>
      <MainPage />
    </div>
  )
}