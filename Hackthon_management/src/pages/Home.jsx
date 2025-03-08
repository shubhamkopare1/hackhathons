import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-100 text-center">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-600">
        Welcome to the Hackathon
      </h1>
      <p className="text-gray-700 mt-4 text-sm sm:text-base md:text-lg">
        Register your team and participate in an exciting event!
      </p>
      <div className="mt-6 w-full flex justify-center">
        <Link
          to="/register"
          className="bg-blue-600 text-white px-6 py-2 sm:px-8 sm:py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all w-full max-w-sm text-center"
        >
          Register Now
        </Link>
      </div>
    </div>
  );
};

export default Home;
