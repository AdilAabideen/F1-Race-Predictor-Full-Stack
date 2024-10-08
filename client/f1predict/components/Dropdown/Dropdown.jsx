"use client"
import React, { useState } from 'react'

export default function Dropdown({getRaceId}) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedGP, setSelectedGP] = useState(null)
  const [error, setError] = useState("")

  const grandPrix = [
    { name: "Bahrain GP", code: "bh" },
    { name: "Saudi Arabian GP", code: "sa" },
    { name: "Australian GP", code: "au" },
    { name: "Azerbaijan GP", code: "az" },
    { name: "Miami GP", code: "us" },
    { name: "Monaco GP", code: "mc" },
    { name: "Spanish GP", code: "es" },
    { name: "Canadian GP", code: "ca" },
    { name: "Austrian GP", code: "at" },
    { name: "British GP", code: "gb" },
    { name: "Hungarian GP", code: "hu" },
    { name: "Belgian GP", code: "be" },
    { name: "Dutch GP", code: "nl" },
    { name: "Italian GP", code: "it" },
    { name: "Singapore GP", code: "sg" },
    { name: "Japanese GP", code: "jp" },
    { name: "Qatar GP", code: "qa" },
    { name: "United States GP", code: "us" },
    { name: "Mexican GP", code: "mx" },
    { name: "Brazilian GP", code: "br" },
    { name: "Las Vegas GP", code: "us" },
    { name: "Abu Dhabi GP", code: "ae" }
  ]

  const handleSelect = (gp) => {
    setSelectedGP(gp)
    setIsOpen(false)
    
  }

  const getFlag = (code) => {
    const codePoints = code
      .toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
  }
  const onPredict = () => {
    if (!selectedGP) {
      setError("Please select a Grand Prix")
      return
    }
    else {
      const index = grandPrix.findIndex(gp => gp.name === selectedGP.name)
      getRaceId(index + 1, selectedGP)
      setError("")
    }
  }

  return (
    <div className="inline-block">
      <div className="relative  text-left w-64 mb-4 flex flex-col gap-4">
        <div>
          <button
            type="button"
            className="inline-flex justify-between items-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-f1-regular text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="flex-grow text-left">
              {selectedGP ? (
                <>
                  <span className="mr-2">{getFlag(selectedGP.code)}</span>
                  {selectedGP.name}
                </>
              ) : (
                'Select Grand Prix'
              )}
            </span>
            <svg className="h-5 w-5 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="origin-top-right absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden">
            <div className="py-1 max-h-60 overflow-y-auto" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              {grandPrix.map((gp, index) => (
                <button
                  key={index}
                  className="block w-full text-left px-4 py-2 text-sm font-f1-regular text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                  onClick={() => handleSelect(gp)}
                >
                  <span className="mr-2">{getFlag(gp.code)}</span>
                  {gp.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <button
        onClick={onPredict}
        className="w-64 bg-red-600 hover:bg-red-700 text-white font-f1-regular py-2 px-4 rounded"
      >
        Predict!
      </button>
      <p className="text-lg font-f1-regular text-black mt-3 text-red-600">{error}</p>
    </div>
  )
}
