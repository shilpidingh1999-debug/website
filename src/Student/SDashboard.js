import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function SDashboard() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div>
      {/* ===== TOP FIXED NAVBAR ===== */}
      <div
        className="
          fixed top-0 left-0 right-0 z-50
          bg-orange-600 text-white shadow
        "
      >
        {/* ✅ FULL WIDTH + CENTER FIX */}
        <div
          className="
            w-full
            max-w-7xl
            mx-auto
            flex flex-col md:flex-row
            md:items-center
            justify-between
            px-4 md:px-6
            py-2 md:h-14
          "
        >
          {/* LEFT SIDE */}
          <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-8">
            <h2 className="font-bold text-base md:text-lg text-center md:text-left">
              Student Panel
            </h2>

            <div className="flex justify-center md:justify-start gap-4 text-sm md:text-base">
              <NavLink
                to=""
                end
                className={({ isActive }) =>
                  `hover:underline ${
                    isActive ? "font-bold underline" : ""
                  }`
                }
              >
                Profile
              </NavLink>

              <NavLink
                to="fees"
                className={({ isActive }) =>
                  `hover:underline ${
                    isActive ? "font-bold underline" : ""
                  }`
                }
              >
                Fees
              </NavLink>

              <NavLink
                to="attendance"
                className={({ isActive }) =>
                  `hover:underline ${
                    isActive ? "font-bold underline" : ""
                  }`
                }
              >
                Attendance
              </NavLink>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center justify-center md:justify-end gap-3 mt-2 md:mt-0">
            <span className="text-xs md:text-sm bg-white/20 px-3 py-1 rounded-full">
              {user?.name}
            </span>

            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-3 md:px-4 py-1 rounded-full text-xs md:text-sm font-semibold"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* ===== PAGE CONTENT ===== */}
      <div className="pt-32 md:pt-20 px-4 md:px-6">
        <Outlet />
      </div>
    </div>
  );
}
