import { createContext, useContext, useEffect, useState } from "react";
import { useTeachers } from "./TeacherContext";

const SubjectContext = createContext();

const defaultSubjects = [];

export function SubjectProvider({ children }) {
  const { teachers } = useTeachers();

  const [subjects, setSubjects] = useState(() => {
    const saved = localStorage.getItem("subjects");
    return saved ? JSON.parse(saved) : defaultSubjects;
  });

  // 🔹 SAVE TO LOCALSTORAGE
  useEffect(() => {
    localStorage.setItem("subjects", JSON.stringify(subjects));
  }, [subjects]);

  // ✅ AUTO SYNC SUBJECTS FROM TEACHERS (REAL FIX)
  useEffect(() => {
    if (!teachers.length) return;

    setSubjects((prev) => {
      let updated = [...prev];

      teachers.forEach((t) => {
        if (!t.subject || !t.className || !t.section) return;

        const exists = updated.some(
          (s) =>
            s.subjectName.toLowerCase() === t.subject.toLowerCase() &&
            s.className === t.className &&
            s.section === t.section
        );

        if (!exists) {
          updated.push({
            id: Date.now() + Math.random(),
            subjectName: t.subject,
            className: t.className,
            section: t.section,
            teacher: t.name,
          });
        }
      });

      return updated;
    });
  }, [teachers]);

  // ✅ MANUAL ADD
  const addSubject = (subject) => {
    const exists = subjects.some(
      (s) =>
        s.subjectName.toLowerCase() === subject.subjectName.toLowerCase() &&
        s.className === subject.className &&
        s.section === subject.section
    );

    if (exists) {
      alert("⚠️ Subject already exists");
      return;
    }

    setSubjects((prev) => [
      ...prev,
      { ...subject, id: Date.now() },
    ]);
  };

  // ✅ EDIT
  const editSubject = (updated) => {
    setSubjects((prev) =>
      prev.map((s) =>
        s.id === updated.id ? updated : s
      )
    );
  };

  // ✅ DELETE
  const deleteSubject = (id) => {
    setSubjects((prev) =>
      prev.filter((s) => s.id !== id)
    );
  };

  return (
    <SubjectContext.Provider
      value={{ subjects, addSubject, editSubject, deleteSubject }}
    >
      {children}
    </SubjectContext.Provider>
  );
}

export const useSubjects = () => useContext(SubjectContext);
