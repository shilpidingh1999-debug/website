import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "./AuthContext";
import { useAdmin } from "./AdminContext";

export default function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { admin } = useAdmin();
  const [open, setOpen] = useState(false);

  const linkClass = (path) =>
    `block px-4 py-2 rounded-lg text-sm transition
     ${
       location.pathname === path
         ? "bg-yellow-600 text-white"
         : "text-yellow-100 hover:bg-yellow-600"
     }`;

  return (
    <>
     
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-3 left-3 z-50 bg-yellow-800 text-white px-3 py-2 rounded-lg"
      >
        ☰
      </button>

    
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

     
      <aside
        className={`
          fixed top-0 left-0 z-50
          h-screen bg-yellow-900 text-white
          w-64
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
       
        <div
          onClick={() => {
            navigate("/admin/profile");
            setOpen(false);
          }}
          className="flex flex-col items-center pt-4 pb-3 border-b border-yellow-700 cursor-pointer hover:bg-yellow-800 transition"
        >
         {admin.image ? (
  <img
    src={admin.image}
    alt="Admin"
    className="w-14 h-14 rounded-full border-2 border-yellow-500 mb-1"
  />
) : (
 <div className="w-14 h-14 rounded-full border-2 border-yellow-500 mb-1 bg-gray-300 flex items-center justify-center text-lg font-bold text-gray-700">
  {admin.name?.charAt(0).toUpperCase()}
</div>

)}

          <h3 className="text-sm font-semibold">{admin.name}</h3>

          <Link
            to="/admin/profile"
            onClick={() => setOpen(false)}
            className={linkClass("/admin/profile")}
          >
            Update
          </Link>
        </div>

      
        <div className="flex-1 px-2 pt-3 overflow-y-auto">
          <nav className="flex flex-col gap-1">
            <Link to="/admin/dashboard" onClick={() => setOpen(false)} className={linkClass("/admin/dashboard")}>Dashboard</Link>
            <Link to="/admin/students" onClick={() => setOpen(false)} className={linkClass("/admin/students")}>Students</Link>
            <Link to="/admin/admissions" onClick={() => setOpen(false)} className={linkClass("/admin/admissions")}>Admissions</Link>
            <Link to="/admin/teacher" onClick={() => setOpen(false)} className={linkClass("/admin/teacher")}>Teachers</Link>
            <Link to="/admin/classes" onClick={() => setOpen(false)} className={linkClass("/admin/classes")}>Classes</Link>
            <Link to="/admin/subjects" onClick={() => setOpen(false)} className={linkClass("/admin/subjects")}>Subjects</Link>
            <Link to="/admin/attendances" onClick={() => setOpen(false)} className={linkClass("/admin/attendances")}>Attendance</Link>
            <Link to="/admin/fees" onClick={() => setOpen(false)} className={linkClass("/admin/fees")}>Fees</Link>
          </nav>
        </div>

      
        <div className="p-3 border-t border-yellow-700">
          <button
            onClick={() => {
              logout();
              navigate("/admin/login");
            }}
            className="w-full bg-red-600 hover:bg-red-700 py-2 rounded-lg text-sm"
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
