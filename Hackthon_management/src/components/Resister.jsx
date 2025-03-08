import { useState } from "react";
import { registerUser } from "../api/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    teamName: "",
    collegeName: "",
    leaderName: "",
    leaderEmail: "",
    leaderPhone: "",
    leaderGender: "",
    members: [{ name: "", email: "", phone: "", gender: "" }],
    paymentScreenshot: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("member")) {
      const index = parseInt(name.split(".")[1]);
      const field = name.split(".")[2];

      setForm((prev) => {
        const updatedMembers = [...prev.members];
        updatedMembers[index][field] = value;
        return { ...prev, members: updatedMembers };
      });
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    setForm({ ...form, paymentScreenshot: e.target.files[0] });
  };

  const addMember = () => {
    if (form.members.length < 3) {
      setForm((prev) => ({
        ...prev,
        members: [...prev.members, { name: "", email: "", phone: "", gender: "" }],
      }));
    }
  };

  const removeMember = (index) => {
    if (form.members.length > 1) {
      setForm((prev) => {
        const updatedMembers = prev.members.filter((_, i) => i !== index);
        return { ...prev, members: updatedMembers };
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.paymentScreenshot) {
      alert("Please upload a payment screenshot.");
      return;
    }

    try {
      await registerUser(form);
      navigate("/dashboard");
    } catch (err) {
      alert("Registration Failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 pt-18">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">Team Registration</h2>

        {/* Team Name & College Name */}
        <input
          name="teamName"
          placeholder="Team Name"
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3 text-base"
          required
        />
        <input
          name="collegeName"
          placeholder="College Name"
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3 text-base"
          required
        />

        {/* Leader Info */}
        <h3 className="text-lg font-semibold mt-2 text-gray-700">Team Leader</h3>
        <div className="grid grid-cols-1 gap-2">
          <input name="leaderName" placeholder="Leader Name" onChange={handleChange} className="p-2 border rounded" required />
          <input name="leaderEmail" type="email" placeholder="Leader Email" onChange={handleChange} className="p-2 border rounded" required />
          <input name="leaderPhone" type="tel" placeholder="Leader Phone" onChange={handleChange} className="p-2 border rounded" required />
          <select name="leaderGender" onChange={handleChange} className="p-2 border rounded" required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Team Members */}
        <h3 className="text-lg font-semibold mt-4 text-gray-700">Team Members</h3>
        {form.members.map((_, index) => (
          <div key={index} className="bg-gray-50 p-3 rounded-md mb-2 relative">
            <input
              name={`member.${index}.name`}
              placeholder={`Member ${index + 1} Name`}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-2"
              required={index < 1} // Minimum 1 member required
            />
            <input
              name={`member.${index}.email`}
              type="email"
              placeholder={`Member ${index + 1} Email`}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-2"
            />
            <input
              name={`member.${index}.phone`}
              type="tel"
              placeholder={`Member ${index + 1} Phone`}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-2"
            />
            <select name={`member.${index}.gender`} onChange={handleChange} className="w-full p-2 border rounded mb-2">
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {index > 0 && (
              <button
                type="button"
                onClick={() => removeMember(index)}
                className="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 rounded text-xs"
              >
                ✕
              </button>
            )}
          </div>
        ))}

        {/* Add Member Button */}
        {form.members.length < 3 && (
          <button
            type="button"
            onClick={addMember}
            className="w-full bg-green-500 text-white p-2 rounded mt-2 text-sm font-bold"
          >
            + Add Member
          </button>
        )}

        {/* Permanent Barcode Display */}
        <h3 className="text-lg font-semibold mt-4 text-gray-700">Scan & Pay - 80RS per head</h3>
        <div className="flex justify-center mt-2">
          <img src="/payment2.jpg" alt="Payment Barcode" className="h-32 w-auto border rounded shadow-sm" />
        </div>

        {/* Payment Screenshot Upload */}
        <h3 className="text-lg font-semibold mt-4 text-gray-700">Upload Payment Screenshot</h3>
        <input type="file" accept="image/*" onChange={handleFileChange} className="w-full p-2 border rounded mb-3" required />

        {/* Submit Button */}
        <button type="submit" className="bg-blue-600 text-white p-3 rounded w-full font-bold mt-2">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
