import { motion } from "framer-motion";

import { useState } from "react";

import { useStudents } from "./StudentContext";
import { useTeachers } from "./TeacherContext";
import { useAttendance } from "./AttendanceContext";
import { useClasses } from "./ClassContext";
import { useSubjects } from "./SubjectContext";
import { useFees } from "./FeesContext";

import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaClipboardList,
  FaSchool,
  FaBook,
  FaMoneyBillWave,
} from "react-icons/fa";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";

export default function Dashboard() {
 
  const [search, setSearch] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  const { students } = useStudents();
  const { teachers } = useTeachers();
  const { attendance } = useAttendance();
  const { classes } = useClasses();
  const { subjects } = useSubjects();
  const { fees } = useFees();

  const selectedStudent = selectedStudentId
    ? students.find((s) => s.id === selectedStudentId)
    : null;

  const normalizeClass = (v) =>
    v?.toString().toLowerCase().replace("th", "").trim();

  const classTeacher = selectedStudent
    ? teachers.find(
        (t) =>
          normalizeClass(t.className) ===
            normalizeClass(selectedStudent.className) &&
          t.section === selectedStudent.section
      )
    : null;

  const studentSubjects = selectedStudent
    ? subjects.filter(
        (s) =>
          s.className === selectedStudent.className ||
          s.class === selectedStudent.className
      )
    : [];

  const chartData = [
    { name: "Students", value: students.length },
    { name: "Teachers", value: teachers.length },
    { name: "Attendance", value: attendance.length },
    { name: "Classes", value: classes.length },
    { name: "Subjects", value: subjects.length },
    { name: "Fees", value: fees.length },
  ];

  const COLORS = ["#8B5CF6", "#F97316", "#10B981", "#FACC15", "#6366F1"];

  const filteredStudents = students.filter((s) =>
    s.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
    <h1 className="text-3xl font-bold mb-4 text-white">
      Admin Dashboard</h1>
    <div className="w-full p-2 md:p-1 overflow-x-hidden">

     
      <div className="
        mb-6 rounded-xl shadow-md
        px-4 py-3 md:px-6
        bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600
        text-white
        flex flex-col sm:flex-row
        justify-between items-start sm:items-center
        gap-2
      ">
        <div>👨‍🎓 Students: <b>{students.length}</b></div>
        <div>👩‍🏫 Teachers: <b>{teachers.length}</b></div>
        <div>📊 Attendance: <b>{attendance.length}</b></div>
      </div>

      
      <div className="
        grid grid-cols-2
        sm:grid-cols-3
        lg:grid-cols-6
        gap-3
      ">
        <DashboardCard title="Students" count={students.length} icon={<FaUserGraduate />} bg="from-purple-500 via-pink-500 to-indigo-500" />
        <DashboardCard title="Teachers" count={teachers.length} icon={<FaChalkboardTeacher />} bg="from-orange-400 via-rose-400 to-pink-500" />
        <DashboardCard title="Attendance" count={attendance.length} icon={<FaClipboardList />} bg="from-green-400 via-emerald-400 to-teal-500" />
        <DashboardCard title="Classes" count={classes.length} icon={<FaSchool />} bg="from-yellow-400 via-orange-400 to-amber-500" />
        <DashboardCard title="Subjects" count={subjects.length} icon={<FaBook />} bg="from-blue-500 via-indigo-500 to-purple-600" />
        <DashboardCard title="Fees" count={fees.length} icon={<FaMoneyBillWave />} bg="from-green-500 via-emerald-500 to-teal-600" />
      </div>

     
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 h-[280px] sm:h-[320px] rounded-xl shadow-lg p-4 bg-gradient-to-br from-indigo-50 via-pink-50 to-purple-50">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {chartData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl shadow-lg p-4 bg-white">
          <input
            type="text"
            placeholder="Search student Activity..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full mb-3 px-3 py-2 text-sm border rounded-lg"
          />

          <ul className="space-y-2 text-sm max-h-[220px] overflow-y-auto">
            {filteredStudents.map((student) => (
              <li
                key={student.id}
                onClick={() => setSelectedStudentId(student.id)}
                className="cursor-pointer hover:text-indigo-600"
              >
                ✔ 👨‍🎓 {student.name}
              </li>
            ))}
          </ul>
        </div>
      </div>

     
      {selectedStudent && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-2">
          <div className="bg-white w-full max-w-md rounded-xl p-5 relative">
            <button onClick={() => setSelectedStudentId(null)} className="absolute top-2 right-3">✖</button>
            <h2 className="text-lg font-semibold mb-2">👨‍🎓 {selectedStudent.name}</h2>
            <p className="text-sm"><b>Class:</b> {selectedStudent.className}</p>
            <p className="text-sm"><b>Class Teacher:</b> {classTeacher ? classTeacher.name : "Not Assigned"}</p>
            <p className="text-sm"><b>Subjects:</b> {studentSubjects.map(s => s.subjectName || s.name).join(", ") || "Not Assigned"}</p>
            <p className="text-sm mt-2">💰 {selectedStudent.fees === "Paid" ? "Fees Paid" : "Fees Unpaid"}</p>
          </div>
        </div>
      )}
    </div>
    </>
  );
}

function DashboardCard({ title, count, icon, bg }) {
  return (
    <>
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`rounded-xl shadow-md cursor-pointer
      bg-gradient-to-br ${bg} text-white
      h-24 p-3 flex justify-between items-center`}
    >
      <div>
        <p className="text-xs">{title}</p>
        <p className="text-xl font-bold">{count}</p>
      </div>
      <div className="text-2xl opacity-80">{icon}</div>
    </motion.div>
    </>
  );
}
