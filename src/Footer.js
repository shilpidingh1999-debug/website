import { Link } from "react-router-dom";
import logo from "./Image/schoollogo2.PNG";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-yellow-400 via-yellow-600 to-yellow-900 text-white mt-0">
      <div className="max-w-7xl mx-auto px-8 py-5 grid md:grid-cols-3 gap-15">

        <div>

  
          <img
            src={logo}
            alt="School Logo"
            className="h-16 mb-4 brightness-110 contrast-125"
          />
          <p className="text-sm  font-semibold text-yellow-900 px-5">
            Our school management system helps students, teachers, and parents
            stay connected with academics, attendance, and progress in one place.
          </p>
        </div>
       

       
        <div>
      <h3 className="text-lg font-semibold mb-4   ">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-yellow-800">
                Home
              </Link>
            </li>
            <li>
              <Link to="/About" className="hover:text-yellow-800">
                About
              </Link>
            </li>
            <li>
              <Link to="/admin/login" className="hover:text-yellow-800">
                Login
              </Link>
            </li>
          </ul>
        </div>


       
        <div>
          <h3 className="text-lg font-semibold mb-4  border-white/40 ">
            Contact Us
          </h3>
          <ul className=" text-sm text-white/90">
            <li>📍 Address: Your School Address</li>
            <li>📞 Phone: +91 98765 43210</li>
            <li>✉️ Email: school@gmail.com</li>
          </ul>
        </div>
      </div>

      
      <div className="border-t border-white/40 py-4 text-center text-sm text-white/90">
        © {new Date().getFullYear()} ShiksaSetu. All rights reserved.
      </div>
    </footer>
  );
}
