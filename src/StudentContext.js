import { createContext, useContext, useState, useEffect } from "react";

const StudentContext = createContext();
const defaultStudents = [];

export function StudentProvider({ children }) {
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem("students");
    return saved ? JSON.parse(saved) : defaultStudents;
  });

 
  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  
  const addStudent = (student) => {
    if (!student.roll) {
      alert("⚠️ Roll number is required");
      return;
    }

    const exists = students.some(
      (s) =>
        s.roll === Number(student.roll) &&
        s.className?.trim().toLowerCase() ===
          student.className?.trim().toLowerCase() &&
        s.section?.trim().toLowerCase() ===
          student.section?.trim().toLowerCase()
    );

    if (exists) {
      alert("⚠️ Student already exists in same class & section");
      return;
    }

    setStudents((prev) => [
      ...prev,
      {
        ...student,
        id: Date.now(),
        roll: Number(student.roll),
      },
    ]);
  };

  
  const updateStudent = (updatedStudent) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === updatedStudent.id
          ? { ...updatedStudent, roll: Number(updatedStudent.roll) }
          : s
      )
    );
  };

  
  const deleteStudent = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <StudentContext.Provider
      value={{ students, addStudent, updateStudent, deleteStudent }}
    >
      {children}
    </StudentContext.Provider>
  );
}

export function useStudents() {
  return useContext(StudentContext);
}
