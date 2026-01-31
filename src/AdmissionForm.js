import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function AdmissionForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    studentName: "",
    fatherName: "",
    motherName: "",
    classApply: "",
    dob: null,
    gender: "",
    mobile: "",
    email: "",
    address: "",
  });

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobile") {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 10) return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.fatherName) return alert("Father Name required");
    if (!form.email) return alert("Email required");
    if (!form.mobile || form.mobile.length !== 10)
      return alert("Mobile must be 10 digits");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email))
      return alert("Invalid email");

    const oldAdmissions =
      JSON.parse(localStorage.getItem("admissions")) || [];

    const exists = oldAdmissions.some(
      (a) =>
        a.mobile === form.mobile ||
        a.email?.toLowerCase() === form.email.toLowerCase()
    );

    if (exists) return alert("Admission already exists");

    const newAdmission = {
      id: Date.now(),
      ...form,
      dob: form.dob?.toLocaleDateString(),
      status: "Pending",
      createdAt: new Date().toLocaleDateString(),
    };

    localStorage.setItem(
      "admissions",
      JSON.stringify([...oldAdmissions, newAdmission])
    );

    navigate("/admission-success", {
      state: { id: newAdmission.id },
    });
  };

  return (
    <div className="min-h-screen flex justify-center items-start sm:items-center px-3 py-6 bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-3xl p-4 sm:p-6 rounded-2xl shadow-lg"
      >
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-6 text-blue-700">
          School Admission Form
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            name="studentName"
            value={form.studentName}
            onChange={handleChange}
            placeholder="Student Name"
            className="border p-3 rounded"
          />

          <input
            name="fatherName"
            value={form.fatherName}
            onChange={handleChange}
            placeholder="Father Name *"
            className="border p-3 rounded"
          />

          <input
            name="motherName"
            value={form.motherName}
            onChange={handleChange}
            placeholder="Mother Name"
            className="border p-3 rounded"
          />

          <input
            name="classApply"
            value={form.classApply}
            onChange={handleChange}
            placeholder="Class Applying For"
            className="border p-3 rounded"
          />

         
          <div className="w-full">
            <DatePicker
              selected={form.dob}
              onChange={(date) =>
                setForm((prev) => ({ ...prev, dob: date }))
              }
              placeholderText="Date of Birth"
              maxDate={new Date()}
              showYearDropdown
              showMonthDropdown
              dropdownMode="select"
              className="border p-3 rounded w-full"
              popperPlacement="auto"
              popperModifiers={[
                { name: "preventOverflow", options: { boundary: "viewport" } },
              ]}
              withPortal
            />
          </div>

         
          <Select
            options={genderOptions}
            value={
              genderOptions.find(
                (g) => g.value === form.gender
              ) || null
            }
            onChange={(val) =>
              setForm((prev) => ({
                ...prev,
                gender: val?.value || "",
              }))
            }
            placeholder="Select Gender"
            menuPortalTarget={document.body}
            styles={{
              menuPortal: (base) => ({
                ...base,
                zIndex: 999999,
              }),
            }}
          />

          <input
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            placeholder="Mobile *"
            className="border p-3 rounded"
          />

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Parent Email *"
            className="border p-3 rounded"
          />

          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Address"
            className="border p-3 rounded sm:col-span-2"
          />
        </div>

        <button
          type="submit"
          className="mt-6 w-full py-3 bg-blue-700 text-white rounded-xl font-bold"
        >
          Submit Admission
        </button>
      </form>
    </div>
  );
}

