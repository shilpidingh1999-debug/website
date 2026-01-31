import { motion } from "framer-motion";
import { useAuth } from "../AuthContext";
import { useStudents } from "../StudentContext";
import { useFees } from "../FeesContext";
import { useSubjects } from "../SubjectContext";
import { useTeachers } from "../TeacherContext";
import { useAttendance } from "../AttendanceContext";

import maleAvatar from "../Image/boy.png";
import femaleAvatar from "../Image/girl.png";

/* 🔑 SAFE NORMALIZE */
const normalize = (v) =>
  String(v || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "");

export default function SProfile() {
  const { user } = useAuth();
  const { students } = useStudents();
  const { fees } = useFees();
  const { subjects } = useSubjects();
  const { teachers } = useTeachers();
  const { attendance } = useAttendance();

  const student = students.find(
    (s) => String(s.id) === String(user?.id)
  );

  if (!student) return <p>Student data nahi mila</p>;

  /* ================= FEES ================= */
  const fee = fees.find(
    (f) =>
      String(f.studentId) === String(student.id) ||
      normalize(f.studentName) === normalize(student.name)
  );

  let feesStatus = "Unpaid";
  if (fee) {
    if (fee.paid === 0) feesStatus = "Unpaid";
    else if (fee.paid < fee.total) feesStatus = "Partial";
    else feesStatus = "Paid";
  }

  /* ================= IMAGE ================= */
  const profileImg =
    student.gender?.toLowerCase() === "female"
      ? femaleAvatar
      : maleAvatar;

  /* ================= CLASS TEACHER (FIXED) ================= */
  const classTeacher = teachers.find(
    (t) =>
      normalize(t.className) === normalize(student.className) &&
      normalize(t.section) === normalize(student.section)
  );

  /* ================= SUBJECTS (FIXED) ================= */
  const studentSubjects = subjects.filter(
    (s) =>
      normalize(s.className) === normalize(student.className) &&
      normalize(s.section) === normalize(student.section)
  );

  /* ================= ATTENDANCE ================= */
  const studentAttendance = attendance.filter(
    (a) => String(a.studentId) === String(student.id)
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6"
    >
      {/* 🔝 IMAGE TOP */}
      <div className="text-center mb-6">
        <img
          src={profileImg}
          alt="avatar"
          className="w-36 h-36 mx-auto rounded-full border-4 border-orange-400 shadow"
        />
        <h2 className="text-2xl font-bold mt-3 text-orange-600">
          {student.name}
        </h2>
        <p className="text-gray-600">Roll No: {student.roll}</p>
      </div>

      {/* 🔽 CONTENT SIDE BY SIDE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ⬅️ LEFT */}
        <div className="space-y-3">
          <p>
            <b>Class:</b> {student.className} - {student.section}
          </p>

          <p>
            <b>Class Teacher:</b>{" "}
            <span className="text-blue-600 font-semibold">
              {classTeacher ? classTeacher.name : "Not Assigned"}
            </span>
          </p>

          <p>
            <b>Fees Status:</b>{" "}
            <span
              className={
                feesStatus === "Paid"
                  ? "text-green-600 font-semibold"
                  : feesStatus === "Partial"
                  ? "text-yellow-600 font-semibold"
                  : "text-red-600 font-semibold"
              }
            >
              {feesStatus}
            </span>
          </p>
        </div>

        {/* ➡️ RIGHT */}
        <div>
          <h3 className="font-bold text-orange-500 mb-2">Subjects</h3>

          {studentSubjects.length ? (
            <ul className="list-disc ml-5 space-y-1">
              {studentSubjects.map((s) => (
                <li key={s.id}>
                  {s.subjectName}{" "}
                  <span className="text-gray-500">
                    ({s.teacher})
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No subjects assigned</p>
          )}

          <hr className="my-3" />

          <h3 className="font-bold text-orange-500">Attendance</h3>
          <p>
            Total Present:{" "}
            <span className="text-green-600 font-bold">
              {studentAttendance.length}
            </span>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
