const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-5xl font-bold text-red-600">403</h1>

      <h2 className="text-2xl mt-4 font-semibold">
        Unauthorized Access
      </h2>

      <p className="mt-2 text-gray-600">
        You don't have permission to access this page.
      </p>
    </div>
  );
};

export default Unauthorized;