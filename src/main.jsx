import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Session from "./pages/Session";
import Dashboard from "./pages/Dashboard";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Dashboard />} />
        <Route path="login" element={<Login />} />
        <Route path="session" element={<Session />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
