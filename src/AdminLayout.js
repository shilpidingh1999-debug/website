import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import bgImage from "./Image/concept-learning.PNG";

export default function AdminLayout() {
  return (
    <div className="flex">
     
      <AdminSidebar />

    
      <main
        className="
          w-full min-h-screen
          ml-0 md:ml-64
          relative overflow-hidden
          transition-all
        "
      >
        
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            opacity: 0.7,
          }}
        />

       
        <div className="relative z-10 pt-20 px-4 md:px-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
