import { createContext, useContext, useState, useEffect } from "react";

const AttendanceContext = createContext();


const getInitialAttendance = () => {
  const saved = localStorage.getItem("attendance");
  return saved ? JSON.parse(saved) : [];
};

export const AttendanceProvider = ({ children }) => {
  const [attendance, setAttendance] = useState(getInitialAttendance);

 
  useEffect(() => {
    localStorage.setItem("attendance", JSON.stringify(attendance));
  }, [attendance]);


  const addAttendance = ({ studentId, date }) => {
    setAttendance((prev) => {
      const exists = prev.some(
        (a) => a.studentId === studentId && a.date === date
      );

      if (exists) {
        alert("⚠️ Attendance already added");
        return prev;
      }

      return [
        ...prev,
        {
          id: `${studentId}-${date}`,
          studentId,
          date,
          status: "Present",
        },
      ];
    });
  };

  
  const deleteAttendance = (id) => {
    setAttendance((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <AttendanceContext.Provider
      value={{ attendance, addAttendance, deleteAttendance }}
    >
      {children}
    </AttendanceContext.Provider>
  );
};

export const useAttendance = () => useContext(AttendanceContext);
