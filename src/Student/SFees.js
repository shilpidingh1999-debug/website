import { motion } from "framer-motion";
import { useState } from "react";
import { useAuth } from "../AuthContext";
import { useFees } from "../FeesContext";

export default function SFees() {
  const { user } = useAuth();
  const { fees, updateFees } = useFees();

  const [showScanner, setShowScanner] = useState(false);

 
  const fee = fees.find((f) => f.studentName === user?.name);

  if (!fee) return <p className="text-center text-red-600">Fees data nahi mila</p>;

  const balance = fee.total - fee.paid;
  const progress = Math.round((fee.paid / fee.total) * 100);

 
  const handlePaymentSuccess = () => {
    updateFees({
      ...fee,
      paid: fee.total, 
    });

    setShowScanner(false);
    alert("✅ Payment Successful!");
  };

  return (
    <>
     
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="
          max-w-xl mx-auto
          bg-white/20 backdrop-blur-xl
          border border-white/30
          rounded-3xl
          p-8
          shadow-2xl
        "
      >
       
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-orange-700">
            Fees Details
          </h2>

          <span
            className={`px-4 py-1 rounded-full text-sm font-semibold
              ${balance === 0 ? "bg-green-600 text-white" : "bg-red-600 text-white"}
            `}
          >
            {balance === 0 ? "Paid" : "Pending"}
          </span>
        </div>

       
        <div className="space-y-2 text-sm mb-6">
          <p><b>Student:</b> {fee.studentName}</p>
          <p><b>Total Fees:</b> ₹{fee.total}</p>
          <p><b>Paid:</b> ₹{fee.paid}</p>
          <p><b>Balance:</b> ₹{balance}</p>
        </div>

       
        <div className="mb-6">
          <p className="text-sm font-semibold mb-2">
            Payment Progress ({progress}%)
          </p>

          <div className="w-full bg-white/40 rounded-full h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8 }}
              className={`h-full ${
                balance === 0 ? "bg-green-500" : "bg-orange-500"
              }`}
            />
          </div>
        </div>

       
        {balance > 0 ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowScanner(true)}
            className="
              w-full bg-green-600 hover:bg-green-700
              text-white py-3 rounded-xl
              font-semibold shadow-lg
            "
          >
            Pay Full Fees
          </motion.button>
        ) : (
          <p className="text-center text-green-700 font-semibold">
            🎉 Fees already paid. Thank you!
          </p>
        )}
      </motion.div>

     
      {showScanner && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-6 w-80 text-center space-y-4"
          >
            <h3 className="text-lg font-bold text-gray-800">
              Scan & Pay
            </h3>

           
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=SchoolFeesPayment"
              alt="QR Code"
              className="mx-auto"
            />

            <p className="font-semibold text-gray-700">
              Amount to Pay: ₹{balance}
            </p>

            <button
              onClick={handlePaymentSuccess}
              className="w-full bg-green-600 text-white py-2 rounded-xl font-semibold"
            >
              Payment Done
            </button>

            <button
              onClick={() => setShowScanner(false)}
              className="w-full bg-gray-300 text-gray-800 py-2 rounded-xl"
            >
              Cancel
            </button>
          </motion.div>
        </div>
      )}
    </>
  );
}
