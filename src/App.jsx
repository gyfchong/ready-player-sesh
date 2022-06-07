import { Outlet, Link } from "react-router-dom";

export default () => {
  return (
    <>
      <nav>
        <Link to="/">Dashboard</Link>
      </nav>
      <Outlet />
    </>
  );
};
