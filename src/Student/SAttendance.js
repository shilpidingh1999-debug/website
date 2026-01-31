import { useState, useEffect, useRef } from "react";
import { useAuth } from "../AuthContext";
import { useAttendance } from "../AttendanceContext";

export default function SAttendance() {
  const { user } = useAuth();
  const { attendance } = useAttendance();

  const [currentDate, setCurrentDate] = useState(new Date());
  const pieRef = useRef(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthString = `${year}-${String(month + 1).padStart(2, "0")}`;

  /* ✅ FIXED FILTER */
  const myMonthlyAttendance = attendance.filter(
    (a) =>
      String(a.studentId) === String(user?.id) &&
      a.date?.slice(0, 7) === monthString &&
      a.status === "Present"
  );

  const presentDays = myMonthlyAttendance.length;

  const getWorkingDaysInMonth = (y, m) => {
    let count = 0;
    const d = new Date(y, m, 1);
    while (d.getMonth() === m) {
      if (d.getDay() !== 0) count++;
      d.setDate(d.getDate() + 1);
    }
    return count;
  };

  const totalWorkingDays = getWorkingDaysInMonth(year, month);
  const absentDays = Math.max(totalWorkingDays - presentDays, 0);

  const attendancePercent =
    totalWorkingDays === 0
      ? 0
      : Math.round((presentDays / totalWorkingDays) * 100);

  const finalAngle = (attendancePercent / 100) * 360;

  useEffect(() => {
    let startTime = null;
    const duration = 2000;

    const animate = (time) => {
      if (!startTime) startTime = time;
      const progress = time - startTime;

      const value = Math.min(
        (progress / duration) * finalAngle,
        finalAngle
      );

      if (pieRef.current) {
        pieRef.current.style.setProperty("--angle", `${value}deg`);
      }

      if (progress < duration) {
        requestAnimationFrame(animate);
      }
    };

    if (pieRef.current) {
      pieRef.current.style.setProperty("--angle", "0deg");
    }

    requestAnimationFrame(animate);
  }, [finalAngle, monthString]);

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const presentDates = myMonthlyAttendance.map(
    (a) => new Date(a.date).getDate()
  );

  return (
    <div className="flex justify-center">
      <div className="bg-white w-full max-w-4xl p-6 rounded-2xl shadow-lg">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl p-4 mb-6">
          <div className="flex justify-between items-center">
            <button
              onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
              className="px-3 py-1 bg-white/20 rounded-full"
            >
              ◀
            </button>

            <h1 className="font-bold text-lg">
              {currentDate.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </h1>

            <button
              onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
              className="px-3 py-1 bg-white/20 rounded-full"
            >
              ▶
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">

          {/* PIE */}
          <div className="md:w-1/2 border rounded-xl p-6 text-center">
            <p className="text-gray-600 mb-2">Monthly Attendance</p>

            <div className="flex justify-center mb-4">
              <div
                ref={pieRef}
                className="relative w-36 h-36 rounded-full pie-smooth"
                style={{ "--angle": "0deg" }}
              >
                <div className="absolute inset-5 bg-white rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold">
                    {attendancePercent}%
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-green-100 text-green-700 rounded-xl p-4">
                <p className="text-sm">Present Days</p>
                <p className="text-2xl font-bold">{presentDays}</p>
              </div>
              <div className="bg-red-100 text-red-700 rounded-xl p-4">
                <p className="text-sm">Absent Days</p>
                <p className="text-2xl font-bold">{absentDays}</p>
              </div>
            </div>
          </div>

          {/* CALENDAR */}
          <div className="md:w-1/2 border rounded-xl p-6">
            <h3 className="text-center font-semibold text-orange-600 mb-4">
              Attendance Calendar
            </h3>

            <div className="grid grid-cols-7 gap-2 justify-items-center">
              {daysArray.map((day) => (
                <div
                  key={day}
                  className={`h-9 w-9 flex items-center justify-center rounded-full text-sm
                    ${
                      presentDates.includes(day)
                        ? "bg-green-500 text-white font-semibold"
                        : "bg-gray-200 text-gray-600"
                    }
                  `}
                >
                  {day}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .pie-smooth {
          background: conic-gradient(
            #22c55e var(--angle),
            #fecaca 0deg
          );
        }
      `}</style>
    </div>
  );
}
