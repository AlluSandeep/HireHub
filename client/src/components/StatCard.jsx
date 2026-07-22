const StatCard = ({ title, value, icon: Icon, color }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex justify-between items-center">
      <div>
        <p className="text-gray-500">{title}</p>
        <h2 className="text-3xl font-bold mt-2">{value}</h2>
      </div>

      <div className={`p-4 rounded-full ${color}`}>
        <Icon className="text-white" size={28} />
      </div>
    </div>
  );
};

export default StatCard;