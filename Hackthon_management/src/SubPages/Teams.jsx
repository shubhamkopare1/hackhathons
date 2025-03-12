import { useEffect, useState } from "react";
import axios from "axios";

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTeams() {
      try {
        const response = await axios.get("http://localhost:3000/api/team/getAllTeams");
        setTeams(response.data || []); // Ensure response is an array
      } catch (err) {
        setError("Failed to load teams");
      } finally {
        setLoading(false);
      }
    }
    fetchTeams();
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (teams.length === 0) return <p className="text-center">No teams available</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Hackathon Teams</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {teams.map((team) => (
          <div key={team._id} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
            {/* Team Name */}
            <h2 className="text-xl font-semibold">{team.teamName}</h2>

            {/* Leader Info */}
            <p className="text-gray-600">Leader: {team.leader?.name || "N/A"}</p>
            <p className="text-gray-600">Email: {team.leader?.email || "N/A"}</p>
            <p className="text-gray-600">Phone: {team.leader?.phone || "N/A"}</p>
            <p className="text-gray-600">Gender: {team.leader?.gender || "N/A"}</p>

            {/* Members List */}
            <p className="text-gray-600 font-medium mt-2">Members:</p>
            <ul className="text-gray-600 list-disc list-inside">
              {team.members?.map((member) => (
                <li key={member._id}>
                  {member.name} ({member.email}, {member.phone}, {member.gender})
                </li>
              ))}
            </ul>

            {/* Payment Screenshot */}
            {team.paymentScreenshot && (
              <div className="mt-4">
                <p className="text-gray-600 font-medium">Payment Screenshot:</p>
                <img
                  src={`http://localhost:3000${team.paymentScreenshot}`}
                  alt="Payment Screenshot"
                  className="w-full h-40 object-cover rounded-md border border-gray-300"
                />
              </div>
            )}

            {/* View Details Button */}
            <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
