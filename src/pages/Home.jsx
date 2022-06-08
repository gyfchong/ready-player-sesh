import { Link } from "react-router-dom";
import Login from "../components/Login";
import { isLoggedIn } from "../utils/auth";

export default () => {
  return (
    <>
      <h1>Home</h1>
      {isLoggedIn ? <Link to="/Dashboard">Go to Dashboard</Link> : <Login />}
    </>
  );
};
