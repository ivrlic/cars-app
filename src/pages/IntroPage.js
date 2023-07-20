import React from "react"
import { Link } from "react-router-dom"

export default function IntroPage() {
  return (
    <div className="intro-cont">
        <main>
          <h1 className="intro-title">Cars App</h1> 
          <p className="intro-desc">
              Welcome! Click the button and enter into a list of great cars.
              If you are a fan of cars, you will definitely love it. Enjoy!
          </p>
          <div className="flex-bottom-page">
            <Link to="/cars-app/brand">
              <button className="link-btn intro-link">Enter</button>
            </Link>
          </div>
        </main>
    </div>
  )
}


