import { useState, useEffect } from "react";
import { useTeachers } from "./TeacherContext";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function Teacher() {
  const { teachers, addTeacher, updateTeacher, deleteTeacher } = useTeachers();

  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [className, setClassName] = useState("");
  const [section, setSection] = useState("");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  const [subjectOpen, setSubjectOpen] = useState(false);
  const [sectionOpen, setSectionOpen] = useState(false);

  useEffect(() => {
    const closeAll = () => {
      setSubjectOpen(false);
      setSectionOpen(false);
    };
    window.addEventListener("click", closeAll);
    return () => window.removeEventListener("click", closeAll);
  }, []);

  const handleSubmit = () => {
    if (!name.trim()) {
      alert("Teacher Name is required");
      return;
    }

    const teacherData = {
      id: editId ? editId : Date.now(),
      name,
      subject,
      className,
      section,
    };

    editId ? updateTeacher(teacherData) : addTeacher(teacherData);

    setName("");
    setSubject("");
    setClassName("");
    setSection("");
    setEditId(null);
  };

  const handleEdit = (t) => {
    setEditId(t.id);
    setName(t.name);
    setSubject(t.subject);
    setClassName(t.className);
    setSection(t.section);
  };

  const filteredTeachers = teachers.filter(
    (t) =>
      t.name?.toLowerCase().includes(search.toLowerCase()) ||
      t.className?.toLowerCase().includes(search.toLowerCase()) ||
      t.section?.toLowerCase().includes(search.toLowerCase())
  );

  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredTeachers);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Teachers");
    XLSX.writeFile(wb, "Teachers.xlsx");
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Teachers Report", 14, 15);

    autoTable(doc, {
      startY: 25,
      head: [["Name", "Subject", "Class", "Section"]],
      body: filteredTeachers.map((t) => [
        t.name,
        t.subject || "-",
        t.className || "-",
        t.section || "-",
      ]),
    });

    doc.save("Teachers.pdf");
  };

  return (
    /* 🔥 overflow-visible is MOST IMPORTANT FIX */
    <div className="min-h-screen p-3 sm:p-4 text-white space-y-6 overflow-visible">

      {/* ===== FORM ===== */}
      <div className="relative z-50 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-4 sm:p-8">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-yellow-400">
          {editId ? "Edit Teacher" : "Add New Teacher"}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">

          <input
            className="bg-white/20 px-4 py-3 rounded-xl outline-none w-full"
            placeholder="Teacher Name *"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* SUBJECT */}
          <div className="relative w-full" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setSubjectOpen(!subjectOpen)}
              className="bg-white/20 px-4 py-3 rounded-xl w-full text-left"
            >
              {subject || "Select Subject"}
            </button>

            {subjectOpen && (
              <div className="absolute left-0 top-full mt-1 w-full bg-gray-800 rounded-xl shadow-lg z-[99999]">
                {["Math", "English", "Hindi", "Science", "Computer"].map(
                  (sub) => (
                    <div
                      key={sub}
                      onClick={() => {
                        setSubject(sub);
                        setSubjectOpen(false);
                      }}
                      className="px-4 py-3 hover:bg-gray-700 cursor-pointer"
                    >
                      {sub}
                    </div>
                  )
                )}
              </div>
            )}
          </div>

          <input
            className="bg-white/20 px-4 py-3 rounded-xl outline-none w-full"
            placeholder="Class"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
          />

          {/* SECTION */}
          <div className="relative w-full" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setSectionOpen(!sectionOpen)}
              className="bg-white/20 px-4 py-3 rounded-xl w-full text-left"
            >
              {section || "Select Section"}
            </button>

            {sectionOpen && (
              <div className="absolute left-0 top-full mt-1 w-full bg-gray-800 rounded-xl shadow-lg z-[99999]">
                {["A", "B", "C"].map((sec) => (
                  <div
                    key={sec}
                    onClick={() => {
                      setSection(sec);
                      setSectionOpen(false);
                    }}
                    className="px-4 py-3 hover:bg-gray-700 cursor-pointer"
                  >
                    {sec}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={handleSubmit}
            className={`rounded-xl font-bold py-3 w-full ${
              editId
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-yellow-600 hover:bg-yellow-700"
            }`}
          >
            {editId ? "Update" : "Add"}
          </button>
        </div>
      </div>

      {/* SEARCH */}
      <input
        className="w-full bg-white/20 px-4 py-3 rounded-xl outline-none"
        placeholder="Search by name / class / section"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* ===== TABLE ===== */}
      <div className="relative z-10 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl">

        <div className="flex flex-col sm:flex-row justify-end gap-3 p-4">
          <button
            onClick={exportExcel}
            className="bg-green-600 px-4 py-2 rounded-lg"
          >
            Excel
          </button>
          <button
            onClick={exportPDF}
            className="bg-red-600 px-4 py-2 rounded-lg"
          >
            PDF
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] text-center">
            <thead className="text-yellow-400 border-b border-white/20">
              <tr>
                <th className="p-2">Name</th>
                <th className="p-2">Subject</th>
                <th className="p-2">Class</th>
                <th className="p-2">Section</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredTeachers.map((t) => (
                <tr key={t.id} className="border-b border-white/10">
                  <td className="p-2">{t.name}</td>
                  <td className="p-2">{t.subject || "-"}</td>
                  <td className="p-2">{t.className || "-"}</td>
                  <td className="p-2">{t.section || "-"}</td>
                  <td className="p-2 flex gap-2 justify-center">
                    <button
                      onClick={() => handleEdit(t)}
                      className="bg-blue-600 px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTeacher(t.id)}
                      className="bg-red-600 px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
