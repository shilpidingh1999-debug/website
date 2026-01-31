import { useState } from "react";
import { useSubjects } from "./SubjectContext";
import { useStudents } from "./StudentContext";

export default function Subjects() {
  const { subjects, addSubject, editSubject, deleteSubject } = useSubjects();
  const { students } = useStudents();

  const [subjectName, setSubjectName] = useState("");
  const [className, setClassName] = useState("");
  const [section, setSection] = useState("A");
  const [studentId, setStudentId] = useState("");
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  const [openSection, setOpenSection] = useState(false);
  const [openStudent, setOpenStudent] = useState(false);

  const resetForm = () => {
    setSubjectName("");
    setClassName("");
    setSection("A");
    setStudentId("");
    setEditId(null);
    setOpenSection(false);
    setOpenStudent(false);
  };

  const handleAdd = () => {
    if (!subjectName || !className || !studentId) {
      alert("Please fill all fields");
      return;
    }

    const selectedStudent = students.find(
      (s) => s.id === Number(studentId)
    );

    addSubject({
      subjectName,
      className,
      section,
      studentId: selectedStudent.id,
      studentName: selectedStudent.name,
      roll: selectedStudent.roll,
    });

    resetForm();
  };

  const handleEdit = (s) => {
    setEditId(s.id);
    setSubjectName(s.subjectName);
    setClassName(s.className);
    setSection(s.section);
    setStudentId(s.studentId);
  };

  const handleUpdate = () => {
    const selectedStudent = students.find(
      (s) => s.id === Number(studentId)
    );

    editSubject({
      id: editId,
      subjectName,
      className,
      section,
      studentId: selectedStudent.id,
      studentName: selectedStudent.name,
      roll: selectedStudent.roll,
    });

    resetForm();
  };

  const filteredSubjects = subjects.filter(
    (s) =>
      s.subjectName.toLowerCase().includes(search.toLowerCase()) ||
      s.className.toLowerCase().includes(search.toLowerCase()) ||
      s.studentName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen p-3 sm:p-4 text-white space-y-6 overflow-x-hidden">

      {/* ===== FORM ===== */}
      <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-4 sm:p-6 relative z-50 overflow-visible">
        <h2 className="text-lg sm:text-xl font-bold mb-4 text-cyan-400">
          {editId ? "Edit Subject" : "Add Subject"}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">

          <input
            className="bg-white/20 p-3 rounded"
            placeholder="Subject Name"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
          />

          <input
            className="bg-white/20 p-3 rounded"
            placeholder="Class"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
          />

          {/* SECTION */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenSection(!openSection)}
              className="w-full bg-white/20 p-3 rounded text-left"
            >
              Section: {section}
            </button>

            {openSection && (
              <div className="absolute z-[9999] mt-1 w-full bg-gray-800 rounded-xl shadow-lg">
                {["A", "B", "C"].map((sec) => (
                  <div
                    key={sec}
                    onClick={() => {
                      setSection(sec);
                      setOpenSection(false);
                    }}
                    className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                  >
                    {sec}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* STUDENT */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenStudent(!openStudent)}
              className="w-full bg-white/20 p-3 rounded text-left truncate"
            >
              {studentId
                ? students.find((s) => s.id === Number(studentId))?.name
                : "Select Student"}
            </button>

            {openStudent && (
              <div className="absolute z-[9999] mt-1 w-full max-h-60 overflow-y-auto bg-gray-800 rounded-xl shadow-lg">
                {students.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => {
                      setStudentId(s.id);
                      setOpenStudent(false);
                    }}
                    className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                  >
                    {s.name} (Roll {s.roll})
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={editId ? handleUpdate : handleAdd}
            className={`rounded font-semibold py-3 ${
              editId ? "bg-blue-600" : "bg-cyan-600"
            }`}
          >
            {editId ? "Update" : "Add"}
          </button>
        </div>
      </div>

      {/* SEARCH */}
      <input
        className="w-full bg-white/20 p-3 rounded"
        placeholder="Search subject / class / student"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* ===== TABLE (NO HORIZONTAL SCROLL) ===== */}
      <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-3 overflow-x-hidden">
        <table className="w-full text-sm sm:text-base text-center">
          <thead className="text-cyan-400 border-b border-white/20">
            <tr>
              <th className="p-2">Subject</th>
              <th className="p-2">Class</th>
              <th className="p-2">Section</th>
              <th className="p-2">Student</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredSubjects.map((s) => (
              <tr key={s.id} className="border-b border-white/10">
                <td className="p-2">{s.subjectName}</td>
                <td className="p-2">{s.className}</td>
                <td className="p-2">{s.section}</td>
                <td className="p-2 break-words">
                  {s.studentName} (Roll {s.roll})
                </td>
                <td className="p-2">
                  <div className="flex flex-col sm:flex-row justify-center gap-2">
                    <button
                      onClick={() => handleEdit(s)}
                      className="bg-indigo-600 px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteSubject(s.id)}
                      className="bg-red-600 px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
