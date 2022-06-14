import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./pages/Dashboard/DashboardLayout";
import Sessions from "./pages/Dashboard/Sessions";
import Groups from "./pages/Dashboard/Groups";
import Home from "./pages/Home";
import Session from "./pages/Session";
import Overview from "./pages/Dashboard/Overview";
import CreateSession from "./pages/CreateSession";

export default () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Overview />} />
          <Route path="sessions" element={<Sessions />} />
          <Route path="groups" element={<Groups />} />
        </Route>
        <Route path="session/:id" element={<Session />} />
        <Route path="new-session" element={<CreateSession />} />
      </Routes>
    </BrowserRouter>
  );
};
