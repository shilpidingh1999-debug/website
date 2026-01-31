import { useStudents } from "./StudentContext";
import { useEffect, useState } from "react";

export default function AdminAdmissions() {
  const { addStudent } = useStudents();
  const [admissions, setAdmissions] = useState([]);

  useEffect(() => {
    setAdmissions(JSON.parse(localStorage.getItem("admissions")) || []);
  }, []);

  const approve = (adm) => {
    if (adm.status === "Approved") {
      alert("Already approved");
      return;
    }

    const students =
      JSON.parse(localStorage.getItem("students")) || [];

    const exists = students.some(
      (s) => s.admissionId === adm.id
    );

    if (exists) {
      alert("Student already added");
      return;
    }

    addStudent({
      id: adm.id,               
      admissionId: adm.id,
      name: adm.studentName,
      className: adm.classApply,
      section: "A",
      roll: Math.floor(100 + Math.random() * 900),
      fees: "Unpaid",
      gender: adm.gender?.toLowerCase() || "male",
    });

    const updated = admissions.map((a) =>
      a.id === adm.id ? { ...a, status: "Approved" } : a
    );

    setAdmissions(updated);
    localStorage.setItem("admissions", JSON.stringify(updated));

    alert("✅ Student added");
  };

  const reject = (adm) => {
    const updated = admissions.map((a) =>
      a.id === adm.id ? { ...a, status: "Rejected" } : a
    );

    setAdmissions(updated);
    localStorage.setItem("admissions", JSON.stringify(updated));
  };

  const remove = (adm) => {
    if (!window.confirm("Delete admission?")) return;

    const updated = admissions.filter((a) => a.id !== adm.id);
    setAdmissions(updated);
    localStorage.setItem("admissions", JSON.stringify(updated));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Pending Admissions</h2>

      {admissions.filter((a) => a.status === "Pending").length === 0 && (
        <p className="font-bold">No pending admissions</p>
      )}

      {admissions
        .filter((a) => a.status === "Pending")
        .map((a) => (
          <div key={a.id} className="bg-white p-4 mb-3 rounded shadow">
            <p className="font-semibold">
              {a.studentName} – Class {a.classApply}
            </p>

            <div className="mt-3 space-x-2">
              <button onClick={() => approve(a)} className="bg-green-600 text-white px-4 py-1 rounded">Approve</button>
              <button onClick={() => reject(a)} className="bg-red-600 text-white px-4 py-1 rounded">Reject</button>
              <button onClick={() => remove(a)} className="bg-gray-500 text-white px-4 py-1 rounded">Delete</button>
            </div>
          </div>
        ))}
    </div>
  );
}
