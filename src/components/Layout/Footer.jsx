import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = () => {
    return (
        <>
            <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 px-5 f-small" style={{backgroundColor:"black",position:"absolute",width:"100%"}}>
                <p className="col-md-4 mb-0 text-light">© 2024 Ecommerce App</p>

                <ul className="nav justify-content-end text-light f-small">
                    <li className="nav-item"><NavLink to="/about" className="nav-link px-2 text-light">About</NavLink></li>  
                    <li className="nav-item"><NavLink to="/contact" className="nav-link px-2 text-light">Contact</NavLink></li> 
                    <li className="nav-item"><NavLink to="/privacy" className="nav-link px-2 text-light">Privacy Policy</NavLink></li>  
                   
                </ul>
            </footer>
        </>
    )
}

export default Footer
