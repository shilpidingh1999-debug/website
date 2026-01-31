import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "./Image/schoollogo2.PNG";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      
      <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-700  text-white px-8 h-22 shadow-md">
        <div className="flex items-center justify-between h-full">

         
          <div className="flex items-center">
            <img
              src={logo}
              alt="School Logo"
              className="h-20 w-auto brightness-110 contrast-125 "
            />
          </div>

        
          <div className="hidden md:flex gap-6 text-lg font-medium">
            <Link to="/" className="hover:text-yellow-300">Home</Link>
            <Link to="/About" className="hover:text-yellow-300">About</Link>
            
              <Link to="/admin/login" className="hover:text-yellow-300">Login</Link>
          </div>

         
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-3xl"
          >
            ☰
          </button>
        </div>

        
        <div
          className={`
            md:hidden overflow-hidden transition-all duration-500
            ${open ? "max-h-[300px] mt-4 opacity-100" : "max-h-0 opacity-0"}
          `}
        >
          <div className="flex flex-col gap-4 text-lg font-medium">
            <Link onClick={() => setOpen(false)} to="/">Home</Link>
            <Link onClick={() => setOpen(false)} to="/About">About</Link>
           
             <Link onClick={() => setOpen(false)} to="/admin/login">Login</Link>
          </div>
        </div>
      </nav>

     
      <div className="h-20"></div>
    </>
  );
}
