import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStudents } from "./StudentContext";
import { useAuth } from "./AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { students } = useStudents();
  const { setUser } = useAuth();

  const [role, setRole] = useState("admin");
  const [identifier, setIdentifier] = useState(""); 
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const ADMIN_EMAIL = "admin@gmail.com";
    const ADMIN_PASSWORD = "admin123";
    const STUDENT_PASSWORD = "student123";

    if (!identifier || !password) {
      setError("All fields required hai");
      return;
    }


    if (role === "admin") {
      if (
        identifier !== ADMIN_EMAIL ||
        password !== ADMIN_PASSWORD
      ) {
        setError("Admin email ya password galat hai");
        return;
      }

      const adminData = { role: "admin", email: ADMIN_EMAIL };
      setUser(adminData);
      localStorage.setItem("user", JSON.stringify(adminData));

      navigate("/admin/dashboard", { replace: true });
      return;
    }

   
    const student = students.find(
      (s) =>
        s.name.toLowerCase() === identifier.toLowerCase()
    );

    if (!student) {
      setError("Student name nahi mila");
      return;
    }

    if (password !== STUDENT_PASSWORD) {
      setError("Student password galat hai");
      return;
    }

    const studentData = {
      id: student.id,
      role: "student",
      name: student.name,
    };

    setUser(studentData);
    localStorage.setItem("user", JSON.stringify(studentData));
    localStorage.setItem("studentId", student.id);

    navigate("/student", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-red-400 to-yellow-700 flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="
          bg-gradient-to-br from-amber-900 via-red-300 to-yellow-900
          w-[420px] h-[420px]
          rounded-full
          flex flex-col justify-center px-10
          shadow-[0_30px_60px_rgba(90,0,8,0.6)]
        "
      >
        <h2 className="text-2xl font-bold text-center text-white mb-3">
          Login
        </h2>

      
        <div className="flex justify-center gap-3 mb-4">
          <button
            type="button"
            onClick={() => setRole("admin")}
            className={`px-4 py-1 rounded-full text-sm font-semibold
              ${
                role === "admin"
                  ? "bg-amber-700 text-white"
                  : "bg-white/30 text-white"
              }`}
          >
            Admin
          </button>

          <button
            type="button"
            onClick={() => setRole("student")}
            className={`px-4 py-1 rounded-full text-sm font-semibold
              ${
                role === "student"
                  ? "bg-amber-700 text-white"
                  : "bg-white/30 text-white"
              }`}
          >
            Student
          </button>
        </div>

       
        <input
          type="text"
          placeholder={
            role === "admin"
              ? "Admin Email"
              : "Student Name"
          }
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          className="
            w-full mb-3 px-4 py-2 rounded-full
            bg-white/20 backdrop-blur-md
            border border-white/30
            text-white placeholder-white/70
            outline-none
          "
        />

     
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="
            w-full mb-3 px-4 py-2 rounded-full
            bg-white/20 backdrop-blur-md
            border border-white/30
            text-white placeholder-white/70
            outline-none
          "
        />

        {error && (
          <p className="text-yellow-100 text-sm text-center mb-2">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="
            bg-black/30 hover:bg-black/40
            py-2 rounded-full font-semibold text-white
            transition
          "
        >
          Login
        </button>
      </form>
    </div>
  );
}
