import { useState } from "react";
import Select from "react-select";
import { useFees } from "./FeesContext";
import { useStudents } from "./StudentContext";

export default function Fees() {
  const { students } = useStudents();
  const { fees, addFees, updateFees, deleteFees } = useFees();

  const [student, setStudent] = useState(null);
  const [className, setClassName] = useState("");
  const [total, setTotal] = useState("");
  const [paid, setPaid] = useState("");
  const [editId, setEditId] = useState(null);

  const studentOptions = students.map((s) => ({
    value: s.id,
    label: s.name,
    data: s,
  }));

  const getStatus = (total, paid) => {
    if (paid === 0) return "Unpaid";
    if (paid < total) return "Partial";
    return "Paid";
  };

  const handleSubmit = () => {
    if (!student || !total) {
      alert("Student & total fees required");
      return;
    }

    const data = {
      studentId: student.data.id,
      studentName: student.data.name,
      className: student.data.className,
      total: Number(total),
      paid: Number(paid),
    };

    editId ? updateFees({ ...data, id: editId }) : addFees(data);

    setStudent(null);
    setClassName("");
    setTotal("");
    setPaid("");
    setEditId(null);
  };

  const handleEdit = (f) => {
    setEditId(f.id);
    setStudent({
      value: f.studentId,
      label: f.studentName,
      data: { className: f.className },
    });
    setClassName(f.className);
    setTotal(f.total);
    setPaid(f.paid);
  };

  return (
    <div className="min-h-screen p-3 sm:p-5 lg:p-10 text-white space-y-6 overflow-x-hidden">

     
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold text-yellow-400 mb-4">
          {editId ? "Edit Fees" : "Add Student Fees"}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">

         
          <Select
            value={student}
            onChange={(val) => {
              setStudent(val);
              setClassName(val?.data.className || "");
            }}
            options={studentOptions}
            placeholder="Select Student"
            className="text-black"
            menuPortalTarget={document.body}
            styles={{
              menuPortal: (base) => ({ ...base, zIndex: 9999 }),
            }}
          />

         
          <input
            className="bg-white/20 px-4 py-3 rounded-xl w-full opacity-70"
            placeholder="Class"
            value={className}
            readOnly
          />

         
          <input
            type="number"
            className="bg-white/20 px-4 py-3 rounded-xl w-full"
            placeholder="Total Fees"
            value={total}
            onChange={(e) => setTotal(e.target.value)}
          />

         
          <input
            type="number"
            className="bg-white/20 px-4 py-3 rounded-xl w-full"
            placeholder="Paid Fees"
            value={paid}
            onChange={(e) => setPaid(e.target.value)}
          />

         
          <button
            onClick={handleSubmit}
            className={`w-full rounded-xl font-bold py-3 ${
              editId ? "bg-blue-600" : "bg-green-600"
            }`}
          >
            {editId ? "Update" : "Add"}
          </button>
        </div>
      </div>

     
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-[720px] w-full text-center text-xs sm:text-sm md:text-base">
            <thead className="text-yellow-300 border-b border-white/20">
              <tr>
                <th className="p-3">Student</th>
                <th className="p-3">Class</th>
                <th className="p-3">Total</th>
                <th className="p-3">Paid</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {fees.map((f) => (
                <tr key={f.id} className="border-b border-white/10">
                  <td className="p-3">{f.studentName}</td>
                  <td className="p-3">{f.className}</td>
                  <td className="p-3">₹{f.total}</td>
                  <td className="p-3">₹{f.paid}</td>
                  <td
                    className={`p-3 font-bold ${
                      getStatus(f.total, f.paid) === "Paid"
                        ? "text-green-400"
                        : getStatus(f.total, f.paid) === "Partial"
                        ? "text-yellow-400"
                        : "text-red-400"
                    }`}
                  >
                    {getStatus(f.total, f.paid)}
                  </td>
                  <td className="p-3">
                    <div className="flex flex-col sm:flex-row gap-2 justify-center">
                      <button
                        onClick={() => handleEdit(f)}
                        className="bg-blue-600 px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteFees(f.id)}
                        className="bg-red-600 px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {!fees.length && (
                <tr>
                  <td colSpan="6" className="p-4 text-gray-300">
                    No fees records
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
