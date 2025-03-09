const teamMembers = [
    {
      name: "CHHAGAN RAKHADE",
      role: "Leader",
      mobile: "9158396794",
      email: "chhaganrakhade7@gmail.com",
      gender: "Male",
      isLeader: true,
    },
    {
      name: "Shubham Kopare",
      mobile: "8485029672",
      email: "shubhamkopare2004@gmail.com",
      gender: "Male",
    },
    {
      name: "Himanshu Dhenge",
      mobile: "9322913858",
      email: "himanshudhenge4@gmail.com",
      gender: "Male",
    },
    {
      name: "Suhani Patle",
      mobile: "7299808055",
      email: "suhanipatel1903@gmail.com",
      gender: "Female",
    },
    {
      name: "Yamini Kale",
      mobile: "9156177538",
      email: "yaminikale04@gmail.com",
      gender: "Female",
    },
  ];
  
  const MyTeam = () => {
    return (
      <div className="bg-gray-100 p-4 sm:p-8 rounded-lg shadow-lg w-full max-w-5xl mx-auto min-h-screen flex flex-col justify-center items-center">
        {/* Header Section */}
        <div className="w-full text-center mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-3xl font-bold text-purple-800">Team Details</h2>
          <p className="text-sm sm:text-lg text-gray-700 mt-2">
            <strong>Team Name:</strong> <span className="font-semibold">TEAM ALPHA</span> <br />
            <strong>Problem Statement ID:</strong>{" "}
            <a href="#" className="text-blue-600 font-semibold hover:underline">
              RTH02
            </a>
          </p>
        </div>
  
        {/* Team Members Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white p-4 sm:p-6 max-w-xs mx-auto rounded-lg shadow-md text-center border border-gray-300 transition-all duration-300 hover:shadow-lg"
            >
              <h3
                className={`text-sm sm:text-lg font-bold ${
                  member.isLeader ? "text-orange-600" : "text-purple-800"
                }`}
              >
                {member.name}
                {member.isLeader && (
                  <span className="text-orange-500 font-semibold"> (Leader)</span>
                )}
              </h3>
              <p className="text-gray-600 mt-2 text-xs sm:text-base">
                <strong>Mobile:</strong> {member.mobile}
              </p>
              <p className="text-gray-600 text-xs sm:text-base">
                <strong>Email:</strong>{" "}
                <a href={`mailto:${member.email}`} className="text-blue-600 hover:underline">
                  {member.email}
                </a>
              </p>
              <p className="text-gray-600 text-xs sm:text-base">
                <strong>Gender:</strong> {member.gender}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default MyTeam;
  
  