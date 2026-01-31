import { useState, useEffect } from "react";
import { useAdmin } from "./AdminContext";

export default function AdminProfile() {
  const { admin, updateAdmin } = useAdmin();

 
  const [tempName, setTempName] = useState(admin.name);
  const [tempImage, setTempImage] = useState(admin.image);

  
  const [preview, setPreview] = useState(admin.image);

  
  useEffect(() => {
    setTempName(admin.name);
    setTempImage(admin.image);
    setPreview(admin.image);
  }, [admin]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);  
      setTempImage(reader.result); 
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updateAdmin({
      name: tempName,
      image: tempImage,
    });

    alert("Admin profile updated ✅");
  };

  return (
    <div className="p-6 max-w-md bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Update Admin Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col items-center">
          {preview ? (
            <img
              src={preview}
              className="w-24 h-24 rounded-full border mb-2 object-cover"
              alt="Admin"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
              No Image
            </div>
          )}

          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        <input
          value={tempName}
          onChange={(e) => setTempName(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          placeholder="Admin Name"
          required
        />

        <button className="w-full bg-yellow-600 text-white py-2 rounded">
          Update
        </button>
      </form>
    </div>
  );
}
