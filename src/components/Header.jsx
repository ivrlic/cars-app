import React from "react"
import { Link } from "react-router-dom"

export default function Header() {
  return (
    <div>
        <Link to="/cars-app">          
            <header>
                <div className="cont-header">
                    <i className="ri-car-line"></i>
                    <i className="ri-car-fill"></i> 
                    <h2>CARS</h2>
                    <i className="ri-car-fill"></i>
                    <i className="ri-car-line"></i>
                </div>
            </header>
        </Link>
    </div>
  )
}
