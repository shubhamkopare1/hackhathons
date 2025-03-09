const Rules = () => {
    return (
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-3xl mx-auto mt-12 sm:mt-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-700 text-center mb-4 sm:mb-6">
          🏆 Hackathon Rules & Regulations 🚀
        </h2>
        <div className="bg-gray-100 p-3 sm:p-4 rounded-lg">
          <ul className="list-decimal list-inside text-gray-800 space-y-2 sm:space-y-3 text-sm sm:text-base">
            <li><strong>Team Formation:</strong> Each team must consist of exactly <span className="text-blue-600 font-semibold">2 members</span>.</li>
            <li><strong>Original Work:</strong> All projects must be developed during the hackathon. Pre-built projects will be disqualified.</li>
            <li><strong>No Plagiarism:</strong> Any form of plagiarism will lead to <span className="text-red-600 font-semibold">immediate disqualification</span>.</li>
            <li><strong>Submission Deadline:</strong> Projects must be submitted before the deadline. Late submissions will not be accepted.</li>
            <li><strong>Technology Stack:</strong> Participants are free to use any programming language or framework.</li>
            <li><strong>Code Sharing:</strong> Teams are responsible for maintaining the confidentiality of their code.</li>
            <li><strong>Judging Criteria:</strong> Projects will be evaluated based on <span className="font-semibold">innovation, execution, functionality, and impact</span>.</li>
            <li><strong>Fair Play:</strong> Any attempt to manipulate or hack the competition will lead to disqualification.</li>
            <li><strong>Communication:</strong> Teams must stay updated with announcements via email or the hackathon dashboard.</li>
            <li><strong>Final Decision:</strong> The decision of the judges will be final and binding.</li>
          </ul>
        </div>
        <p className="text-gray-600 text-center text-sm sm:text-base mt-3 sm:mt-4">
          🔥 Give your best and build something amazing! 🎯
        </p>
      </div>
    );
  };
  
  export default Rules;
  ;
  