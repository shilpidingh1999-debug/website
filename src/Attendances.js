import { useState } from "react";
import { useAttendance } from "./AttendanceContext";
import { useStudents } from "./StudentContext";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const getTodayDate = () => {
  const d = new Date();
  return d.toISOString().slice(0, 10);
};

const formatMonthYear = (monthValue) => {
  const [year, month] = monthValue.split("-");
  return new Date(year, month - 1).toLocaleString("default", {
    month: "long",
    year: "numeric",
  });
};

export default function Attendances() {
  const { attendance, addAttendance, deleteAttendance } = useAttendance();
  const { students } = useStudents();

  const [studentId, setStudentId] = useState("");
  const [date, setDate] = useState(getTodayDate());
  const [search, setSearch] = useState("");

  const [reportStudentId, setReportStudentId] = useState("");
  const [reportMonth, setReportMonth] = useState("");

  const [openStudent, setOpenStudent] = useState(false);
  const [openReportStudent, setOpenReportStudent] = useState(false);

  const handleAdd = () => {
    if (!studentId || !date) {
      alert("Student aur Date select karo");
      return;
    }

    addAttendance({
      studentId: Number(studentId),
      date,
    });

    setStudentId("");
    setDate(getTodayDate());
  };

  const monthlyAttendance =
    reportStudentId && reportMonth
      ? attendance.filter((a) => {
          const d = new Date(a.date);
          const ym = `${d.getFullYear()}-${String(
            d.getMonth() + 1
          ).padStart(2, "0")}`;
          return a.studentId === Number(reportStudentId) && ym === reportMonth;
        })
      : [];

  const presentCount = monthlyAttendance.filter(
    (a) => a.status === "Present"
  ).length;

  const exportMonthlyAttendancePDF = () => {
    if (!monthlyAttendance.length) return;

    const student = students.find(
      (s) => s.id === Number(reportStudentId)
    );

    const doc = new jsPDF();
    doc.text("Monthly Attendance Report", 14, 15);
    doc.text(`Student: ${student?.name}`, 14, 25);
    doc.text(`Month: ${formatMonthYear(reportMonth)}`, 14, 32);

    autoTable(doc, {
      startY: 40,
      head: [["Date", "Status"]],
      body: monthlyAttendance.map((a) => [a.date, a.status]),
    });

    doc.save("attendance.pdf");
  };

  return (
    <div className="min-h-screen p-4 md:p-10 text-white space-y-12">

      {/* ================= ADD ATTENDANCE ================= */}
      <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 md:p-8 relative overflow-visible z-50">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">
          Attendance Management
        </h1>

        <div className="flex flex-col md:flex-row gap-4 max-w-2xl">

          {/* STUDENT SELECT */}
          <div className="relative w-full z-50">
            <button
              type="button"
              onClick={() => setOpenStudent(!openStudent)}
              className="w-full bg-white/20 px-4 py-3 rounded-xl text-left"
            >
              {studentId
                ? students.find(s => s.id === Number(studentId))?.name
                : "Select Student"}
            </button>

            {openStudent && (
              <div className="absolute z-[9999] mt-1 w-full max-h-52 overflow-y-auto bg-gray-800 rounded-xl shadow-lg">
                {students.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => {
                      setStudentId(s.id);
                      setOpenStudent(false);
                    }}
                    className={`px-4 py-2 cursor-pointer
                      ${Number(studentId) === s.id
                        ? "bg-yellow-600 text-black font-semibold"
                        : "hover:bg-gray-700"
                      }`}
                  >
                    {s.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* DATE PICKER */}
          <DatePicker
            selected={new Date(date)}
            onChange={(d) => setDate(d.toISOString().slice(0, 10))}
            maxDate={new Date()}
            dateFormat="yyyy-MM-dd"
            className="w-full bg-white/20 px-4 py-3 rounded-xl text-white"
            calendarClassName="bg-gray-800 text-white rounded-xl"
            popperPlacement="bottom-start"
            popperContainer={({ children }) => (
              <div className="z-[9999]">{children}</div>
            )}
          />

          <button
            onClick={handleAdd}
            className="px-6 py-3 rounded-xl bg-yellow-600 hover:bg-yellow-700 font-bold"
          >
            Add
          </button>
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 md:p-8 relative z-10 overflow-visible">
        <input
          type="text"
          placeholder="Search student..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4 w-full md:w-1/2 bg-white/20 px-4 py-2 rounded-xl"
        />

        <div className="overflow-x-auto">
          <table className="min-w-[650px] w-full text-center">
            <thead className="text-yellow-400 border-b border-white/20">
              <tr>
                <th>Student</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {attendance
                .filter((a) => {
                  const student = students.find(s => s.id === a.studentId);
                  return student?.name
                    .toLowerCase()
                    .includes(search.toLowerCase());
                })
                .map((a) => {
                  const student = students.find(s => s.id === a.studentId);
                  return (
                    <tr key={a.id} className="border-b border-white/10">
                      <td>{student?.name}</td>
                      <td>{a.date}</td>
                      <td className={a.status === "Present"
                        ? "text-green-400 font-semibold"
                        : "text-red-400 font-semibold"}>
                        {a.status}
                      </td>
                      <td>
                        <button
                          onClick={() => deleteAttendance(a.id)}
                          className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-lg"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= MONTHLY REPORT ================= */}
      <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 md:p-8 relative z-50 overflow-visible">
        <h2 className="text-xl md:text-2xl font-bold mb-6 text-yellow-400">
          Monthly Attendance Report
        </h2>

        <div className="flex flex-col md:flex-row gap-4 max-w-2xl mb-6">

          {/* REPORT STUDENT */}
          <div className="relative w-full z-50">
            <button
              type="button"
              onClick={() => setOpenReportStudent(!openReportStudent)}
              className="w-full bg-white/20 px-4 py-3 rounded-xl text-left"
            >
              {reportStudentId
                ? students.find(s => s.id === Number(reportStudentId))?.name
                : "Select Student"}
            </button>

            {openReportStudent && (
              <div className="absolute z-[9999] mt-1 w-full max-h-52 overflow-y-auto bg-gray-800 rounded-xl shadow-lg">
                {students.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => {
                      setReportStudentId(s.id);
                      setOpenReportStudent(false);
                    }}
                    className={`px-4 py-2 cursor-pointer
                      ${Number(reportStudentId) === s.id
                        ? "bg-yellow-600 text-black font-semibold"
                        : "hover:bg-gray-700"
                      }`}
                  >
                    {s.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* MONTH PICKER */}
        <DatePicker
  selected={reportMonth ? new Date(reportMonth + "-01") : null}
  onChange={(date) => {
    const ym = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}`;
    setReportMonth(ym);
  }}
  dateFormat="MMMM yyyy"
  showMonthYearPicker
  maxDate={new Date()}
  placeholderText="Select Month"
  className="w-full bg-white/20 px-4 py-3 rounded-xl text-white"
  calendarClassName="bg-gray-800 text-white rounded-xl"
  popperPlacement="bottom-start"
  popperContainer={({ children }) => (
    <div className="z-[9999]">{children}</div>
  )}
/>

        </div>

        {reportStudentId && reportMonth && (
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="bg-green-500/20 px-6 py-3 rounded-xl">
              Present: <b>{presentCount}</b>
            </div>

            <div className="bg-blue-500/20 px-6 py-3 rounded-xl">
              Total Days: <b>{monthlyAttendance.length}</b>
            </div>

            <button
              onClick={exportMonthlyAttendancePDF}
              className="md:ml-auto bg-red-600 hover:bg-red-700 px-5 py-3 rounded-xl font-bold"
            >
              PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
