// @ts-nocheck

import styled from "@emotion/styled";
import { Link, Outlet } from "react-router-dom";
import { useProtectedRoute } from "../../utils/auth";

const Container = styled.div`
  display: grid;
  grid-template-columns: sidebar main;
`;

const Dashboard = () => {
  useProtectedRoute();

  return (
    <Container>
      <aside>
        <nav>
          <ul>
            <li>
              <Link to="/dashboard">Overview</Link>
            </li>
            <li>
              <Link to="sessions">Sessions</Link>
            </li>
            <li>
              <Link to="groups">Groups</Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main>
        <Outlet />
      </main>
    </Container>
  );
};

export default Dashboard;
