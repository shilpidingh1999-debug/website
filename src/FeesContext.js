import { createContext, useContext, useEffect, useState } from "react";

const FeesContext = createContext();


const defaultFees = [];

export function FeesProvider({ children }) {

  const [fees, setFees] = useState(() => {
    const saved = localStorage.getItem("fees");
    return saved ? JSON.parse(saved) : defaultFees;
  });

  
  useEffect(() => {
    localStorage.setItem("fees", JSON.stringify(fees));
  }, [fees]);


  const addFees = (data) => {
    const exists = fees.some(
      (f) => f.studentName === data.studentName
    );

    if (exists) {
      alert("⚠️ Fees already exist for this student");
      return;
    }

    setFees((prev) => [
      ...prev,
      {
        ...data,
        id: Date.now(),
      },
    ]);
  };

 
  const updateFees = (updated) => {
    setFees((prev) =>
      prev.map((f) =>
        f.id === updated.id ? updated : f
      )
    );
  };

  
  const deleteFees = (id) => {
    setFees((prev) => prev.filter((f) => f.id !== id));
  };

 
  const getFeeStatusByStudent = (studentName) => {
    const fee = fees.find((f) => f.studentName === studentName);
    if (!fee || fee.paid === 0) return "Unpaid";
    if (fee.paid < fee.total) return "Partial";
    return "Paid";
  };

  return (
    <FeesContext.Provider
      value={{
        fees,
        addFees,
        updateFees,
        deleteFees,
        getFeeStatusByStudent,
      }}
    >
      {children}
    </FeesContext.Provider>
  );
}

export const useFees = () => useContext(FeesContext);
