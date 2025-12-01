import React from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'

const About = () => {
    const navigate = useNavigate()
  return (
    <div>
      <Navbar bgColor={false} />
      <div className="text-center py-20">
            <p className="text-[18px] text-gray-600 mb-4">Coming soon...</p>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-2 bg-black text-white"
            >
              Back to Home
            </button>
          </div>
    </div>
  )
}

export default About
