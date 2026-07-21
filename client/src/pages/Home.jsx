import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1>Home Page</h1>

      {user ? (
        <h2>Welcome {user.name}</h2>
      ) : (
        <h2>Please Login</h2>
      )}
    </div>
  );
};

export default Home;