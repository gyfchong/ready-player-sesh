// @ts-nocheck

import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link, Outlet } from "react-router-dom";
import { supabase } from "../api/supabase";
import { currentUser, useProtectedRoute } from "../utils/auth";

const fetchGroups = async () => {
  const { data, error } = await supabase.from("group").select("members, name");

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("User not found");
  }

  return data;
};

const fetchSessions = async (user) => {
  const { data, error } = await supabase
    .from("sessions")
    .select("date")
    .eq("owner", user);

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("User not found");
  }

  return data;
};

const Dashboard = () => {
  useProtectedRoute();
  const user = currentUser();
  const { data: groups } = useQuery("group", () => fetchGroups());
  const { data: sessions } = useQuery("sessions", () => fetchSessions(user.id));

  return (
    <>
      <h1>Dashboard</h1>
      {/* <Link to="sessions">Sessions</Link>
      <Link to="groups">Groups</Link>
      <Outlet /> */}
      {sessions && (
        <>
          <h2>Sessions</h2>
          <ul>
            {sessions.map((session) => (
              <li>
                <Link to={`/session/${session.date}`}>{session.date}</Link>
              </li>
            ))}
          </ul>
        </>
      )}
      {groups && (
        <>
          <h2>Groups</h2>
          {groups.map((group) => (
            <>
              {group.name}
              <ul>
                {group.members.map((member) => (
                  <li>{member}</li>
                ))}
              </ul>
            </>
          ))}
        </>
      )}
    </>
  );
};

export default Dashboard;
