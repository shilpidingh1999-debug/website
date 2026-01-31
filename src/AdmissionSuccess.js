import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function AdmissionSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;

  const [msg, setMsg] = useState("");

  const sendMessage = () => {
    setMsg("✅ Email sent successfully!");

    setTimeout(() => {
      setMsg("");
    }, 3000);
  };

  return (
    <div className="
      min-h-screen
      flex
      items-center
      justify-center
      px-4
      bg-green-50
    ">
      {/* CARD */}
      <div className="
        w-full
        max-w-md
        bg-white
        rounded-2xl
        shadow-lg
        p-6
        text-center
      ">
        <h2 className="text-xl sm:text-2xl font-bold text-green-700 mb-2">
          ✅ Admission Successful
        </h2>

        <p className="text-gray-700 mb-4 break-all">
          Admission ID: <b>{state?.id}</b>
        </p>

        
        {msg && (
          <div className="mb-4 px-4 py-2 bg-green-100 text-green-800 rounded-lg text-sm">
            {msg}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={sendMessage}
            className="
              w-full
              py-3
              bg-blue-600
              hover:bg-blue-700
              text-white
              rounded-xl
              font-semibold
            "
          >
            Send Email
          </button>

          <button
            onClick={() => navigate("/admin/dashboard")}
            className="
              w-full
              py-3
              bg-green-600
              hover:bg-green-700
              text-white
              rounded-xl
              font-semibold
            "
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
