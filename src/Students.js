import { useState, useEffect } from "react";
import { useStudents } from "./StudentContext";
import { useNavigate } from "react-router-dom";

export default function Students() {
  const { students, addStudent, updateStudent, deleteStudent } = useStudents();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [className, setClassName] = useState("");
  const [section, setSection] = useState("A");
  const [roll, setRoll] = useState("");
  const [gender, setGender] = useState("male");

  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [editId, setEditId] = useState(null);

 
  const [sectionOpen, setSectionOpen] = useState(false);
  const [genderOpen, setGenderOpen] = useState(false);

 
  useEffect(() => {
    const closeAll = () => {
      setSectionOpen(false);
      setGenderOpen(false);
    };
    window.addEventListener("click", closeAll);
    return () => window.removeEventListener("click", closeAll);
  }, []);

  const resetForm = () => {
    setEditId(null);
    setName("");
    setClassName("");
    setSection("A");
    setRoll("");
    setGender("male");
    setError("");
  };

  const handleAdd = async () => {
    if (!name || !className || !roll) {
      setError("⚠️ All fields required");
      return;
    }

    await addStudent({
      name,
      className,
      section,
      roll: Number(roll),
      gender,
    });

    resetForm();
  };

  const handleEdit = (student) => {
    setEditId(Number(student.id));
    setName(student.name);
    setClassName(student.className);
    setSection(student.section);
    setRoll(student.roll);
    setGender(student.gender);
  };

  const handleUpdate = async () => {
    if (!editId) return;

    await updateStudent({
      id: Number(editId),
      name,
      className,
      section,
      roll: Number(roll),
      gender,
    });

    resetForm();
  };

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.className.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen p-3 text-white space-y-4 overflow-x-hidden">
      <button
        onClick={() => navigate("/admin/admissionform")}
        className="px-4 py-2 rounded-lg font-semibold bg-indigo-600"
      >
        ➕ New Admission
      </button>

     
      <div className="bg-white/10 p-4 rounded-xl w-full">
        <h2 className="text-xl font-bold mb-2">
          {editId ? "Edit Student" : "Add Student"}
        </h2>

        {error && <p className="text-red-400">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 w-full">
         
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="bg-white/20 p-3 rounded w-full min-h-[44px]"
          />

         
          <input
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            placeholder="Class"
            className="bg-white/20 p-3 rounded w-full min-h-[44px]"
          />

          
          <div
            className="relative w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSectionOpen(!sectionOpen)}
              className="bg-white/20 p-3 rounded w-full min-h-[44px] text-left"
            >
              Section {section}
            </button>

            {sectionOpen && (
              <div className="absolute left-0 top-full w-full bg-gray-700 rounded shadow-lg z-50">
                {["A", "B", "C"].map((sec) => (
                  <div
                    key={sec}
                    onClick={() => {
                      setSection(sec);
                      setSectionOpen(false);
                    }}
                    className="p-3 hover:bg-gray-600 cursor-pointer"
                  >
                    {sec}
                  </div>
                ))}
              </div>
            )}
          </div>

         
          <input
            type="number"
            value={roll}
            onChange={(e) => setRoll(e.target.value)}
            placeholder="Roll No"
            className="bg-white/20 p-3 rounded w-full min-h-[44px]"
          />

         
          <div
            className="relative w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setGenderOpen(!genderOpen)}
              className="bg-white/20 p-3 rounded w-full min-h-[44px] text-left"
            >
              {gender === "male" ? "Male" : "Female"}
            </button>

            {genderOpen && (
              <div className="absolute left-0 top-full w-full bg-gray-700 rounded shadow-lg z-50">
                <div
                  onClick={() => {
                    setGender("male");
                    setGenderOpen(false);
                  }}
                  className="p-3 hover:bg-gray-600 cursor-pointer"
                >
                  Male
                </div>
                <div
                  onClick={() => {
                    setGender("female");
                    setGenderOpen(false);
                  }}
                  className="p-3 hover:bg-gray-600 cursor-pointer"
                >
                  Female
                </div>
              </div>
            )}
          </div>

        
          <button
            onClick={editId ? handleUpdate : handleAdd}
            className="bg-green-600 rounded w-full lg:w-auto px-4 min-h-[44px]"
          >
            {editId ? "Update" : "Add"}
          </button>
        </div>
      </div>

      
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
        className="bg-white/20 p-2 rounded w-full"
      />

      
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] bg-white/10 rounded">
          <thead>
            <tr>
              <th>Name</th>
              <th>Class</th>
              <th>Section</th>
              <th>Roll</th>
              <th>Gender</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredStudents.map((s) => (
              <tr key={s.id} className="text-center border-t">
                <td>{s.name}</td>
                <td>{s.className}</td>
                <td>{s.section}</td>
                <td>{s.roll}</td>
                <td>{s.gender}</td>
                <td>
                  <button
                    onClick={() => handleEdit(s)}
                    className="bg-blue-600 px-2 mr-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteStudent(s.id)}
                    className="bg-red-600 px-2"
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
  );
}
