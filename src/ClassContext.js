import { createContext, useContext, useState, useEffect } from "react";

const ClassContext = createContext();
const defaultClasses = [];

export function ClassProvider({ children }) {
  const [classes, setClasses] = useState(() => {
    const saved = localStorage.getItem("classes");
    return saved ? JSON.parse(saved) : defaultClasses;
  });

  
  useEffect(() => {
    localStorage.setItem("classes", JSON.stringify(classes));
  }, [classes]);

  
  const addClass = (newClass) => {
    if (!newClass.className || !newClass.sections) {
      alert("⚠️ Class aur Section required");
      return;
    }

    const exists = classes.some(
      (c) =>
        c.className.trim().toLowerCase() ===
        newClass.className.trim().toLowerCase()
    );

    if (exists) {
      alert("⚠️ Ye class already exist karti hai");
      return;
    }

    setClasses((prev) => [
      ...prev,
      {
        ...newClass,
        id: Date.now(),
      },
    ]);
  };

 
  const deleteClass = (id) => {
    setClasses((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <ClassContext.Provider value={{ classes, addClass, deleteClass }}>
      {children}
    </ClassContext.Provider>
  );
}

export function useClasses() {
  return useContext(ClassContext);
}
