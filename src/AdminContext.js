import { createContext, useContext, useState, useEffect } from "react";

const AdminContext = createContext();

const defaultAdmin = {
  name: "Shilpi Singh (Admin)",
  image: "",
};

export function AdminProvider({ children }) {
  const [admin, setAdmin] = useState(() => {
    const saved = localStorage.getItem("admin");
    return saved ? JSON.parse(saved) : defaultAdmin;
  });

 
  useEffect(() => {
    localStorage.setItem("admin", JSON.stringify(admin));
  }, [admin]);

  const updateAdmin = (data) => {
    setAdmin(data); 
  };

  return (
    <AdminContext.Provider value={{ admin, updateAdmin }}>
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => useContext(AdminContext);
