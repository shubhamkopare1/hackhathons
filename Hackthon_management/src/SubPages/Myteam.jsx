import { useEffect, useState } from "react";

const MyTeam = () => {
  const [team, setTeam] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const token = sessionStorage.getItem("token"); // Get token from session storage

        if (!token) {
          setError("No token found. Please log in.");
          return;
        }

        const response = await fetch("http://localhost:3000/api/team/getTeam", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch team data");
        }

        setTeam(data.team);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchTeamData();
  }, []);

  return (
    <div className="bg-gray-100 p-4 sm:p-8 rounded-lg shadow-lg w-full max-w-5xl mx-auto min-h-screen flex flex-col justify-center items-center">
      <h2 className="text-xl sm:text-3xl font-bold text-purple-800">Team Details</h2>

      {error && <p className="text-red-500">{error}</p>}

      {team ? (
        <div className="w-full flex flex-col items-center">
          {/* Display Leader */}
          {team.members.filter(member => member.isLeader).map((leader, index) => (
            <div key={index} className="bg-yellow-200 p-6 rounded-lg shadow-lg text-center border border-yellow-400 mb-6 w-full sm:max-w-md">
              <h3 className="text-lg sm:text-xl font-bold text-orange-600">
                {leader.name} <span className="text-orange-500 font-semibold"> (Leader)</span>
              </h3>
              <p className="text-gray-600 mt-2 text-sm sm:text-base"><strong>Mobile:</strong> {leader.mobile}</p>
              <p className="text-gray-600 text-sm sm:text-base"><strong>Email:</strong> <a href={`mailto:${leader.email}`} className="text-blue-600 hover:underline">{leader.email}</a></p>
              <p className="text-gray-600 text-sm sm:text-base"><strong>Gender:</strong> {leader.gender}</p>
            </div>
          ))}

          {/* Display Other Members */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 w-full">
            {team.members.filter(member => !member.isLeader).map((member, index) => (
              <div key={index} className="bg-white p-4 sm:p-6 max-w-xs mx-auto rounded-lg shadow-md text-center border border-gray-300 transition-all duration-300 hover:shadow-lg">
                <h3 className="text-sm sm:text-lg font-bold text-purple-800">{member.name}</h3>
                <p className="text-gray-600 mt-2 text-xs sm:text-base"><strong>Mobile:</strong> {member.mobile}</p>
                <p className="text-gray-600 text-xs sm:text-base"><strong>Email:</strong> <a href={`mailto:${member.email}`} className="text-blue-600 hover:underline">{member.email}</a></p>
                <p className="text-gray-600 text-xs sm:text-base"><strong>Gender:</strong> {member.gender}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-gray-700 mt-4">Loading team data...</p>
      )}
    </div>
  );
};

export default MyTeam;
