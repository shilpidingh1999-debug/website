import { useState } from "react";
import { useClasses } from "./ClassContext";

export default function Classes() {
  const { classes, addClass } = useClasses();

  const [search, setSearch] = useState("");
  const [className, setClassName] = useState("");
  const [sections, setSections] = useState("");

  const safe = (v) => (v ?? "").toString().toLowerCase();

  const filteredClasses = classes.filter(
    (c) =>
      safe(c.className).includes(safe(search)) ||
      safe(c.sections).includes(safe(search))
  );

  const handleAdd = () => {
    if (!className || !sections) {
      alert("⚠️ Class ya Section blank nahi ho sakta");
      return;
    }

    addClass({ className, sections });

    setClassName("");
    setSections("");
  };

  return (
    <div className="min-h-screen p-10 text-white space-y-10">

     
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 shadow-2xl">
        <h2 className="text-2xl font-bold text-green-300 mb-4">
          Add Class
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            className="bg-white/20 px-4 py-3 rounded-xl outline-none"
            placeholder="Class Name (eg: 10th)"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
          />

          <input
            className="bg-white/20 px-4 py-3 rounded-xl outline-none"
            placeholder="Sections (eg: A, B)"
            value={sections}
            onChange={(e) => setSections(e.target.value)}
          />

          <button
            onClick={handleAdd}
            className="bg-green-600 font-bold rounded-xl"
          >
            Add
          </button>
        </div>
      </div>


      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 shadow-2xl">
        <h1 className="text-3xl font-bold mb-4 text-pink-300">
          Classes
        </h1>

        <input
          className="w-full bg-white/20 px-4 py-3 rounded-xl outline-none"
          placeholder="Search by class or section"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

     
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl">
        <table className="w-full text-center">
          <thead className="text-pink-300 border-b border-white/20">
            <tr>
              <th className="py-4">Class</th>
              <th>Sections</th>
            </tr>
          </thead>

          <tbody>
            {filteredClasses.length === 0 ? (
              <tr>
                <td colSpan="2" className="py-8 text-gray-300">
                  No class found
                </td>
              </tr>
            ) : (
              filteredClasses.map((c) => (
                <tr key={c.id} className="border-b border-white/10">
                  <td className="py-4">{c.className}</td>
                  <td>{c.sections}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
