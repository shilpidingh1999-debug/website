import { createContext, useContext, useState, useEffect } from "react";

const TeacherContext = createContext();

const defaultTeachers = [];

export function TeacherProvider({ children }) {
  const [teachers, setTeachers] = useState(() => {
    const saved = localStorage.getItem("teachers");
    return saved ? JSON.parse(saved) : defaultTeachers;
  });

  useEffect(() => {
    localStorage.setItem("teachers", JSON.stringify(teachers));
  }, [teachers]);

  // ✅ ADD TEACHER
  const addTeacher = (teacher) => {
    if (!teacher.section) {
      alert("⚠️ Section is required");
      return;
    }

    const exists = teachers.some(
      (t) =>
        t.name?.trim().toLowerCase() ===
          teacher.name?.trim().toLowerCase() &&
        t.subject?.trim().toLowerCase() ===
          teacher.subject?.trim().toLowerCase() &&
        t.className?.trim().toLowerCase() ===
          teacher.className?.trim().toLowerCase() &&
        t.section?.trim().toLowerCase() ===
          teacher.section?.trim().toLowerCase()
    );

    if (exists) {
      alert("⚠️ Same teacher already exists in same class & section");
      return;
    }

    setTeachers((prev) => [
      ...prev,
      {
        ...teacher,
        id: Date.now(),

        // ⭐ MOST IMPORTANT
        isClassTeacher: teacher.isClassTeacher || false,
      },
    ]);
  };

  // ✅ UPDATE TEACHER
  const updateTeacher = (updatedTeacher) => {
    setTeachers((prev) =>
      prev.map((t) =>
        t.id === updatedTeacher.id
          ? {
              ...updatedTeacher,
              isClassTeacher: updatedTeacher.isClassTeacher || false,
            }
          : t
      )
    );
  };

  // ✅ DELETE TEACHER
  const deleteTeacher = (id) => {
    setTeachers((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <TeacherContext.Provider
      value={{ teachers, addTeacher, updateTeacher, deleteTeacher }}
    >
      {children}
    </TeacherContext.Provider>
  );
}

export function useTeachers() {
  return useContext(TeacherContext);
}
