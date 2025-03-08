import Sidebar from "./Sidebar";

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar role="teamLeader" />

      {/* Main Content - Takes Full Width & Centers Content */}
      <div className="flex-1 flex items-center justify-center">
        <h1 className="text-3xl font-bold">Welcome to the Dashboard</h1>
      </div>
    </div>
  );
};

export default Dashboard;

