import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { supabase } from "../../api/supabase";
import { currentUser, useProtectedRoute } from "../../utils/auth";

const fetchSessions = async (user) => {
  const { data, error } = await supabase
    .from("sessions")
    .select("id,date")
    .eq("owner", user);

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("User not found");
  }

  return data;
};

const Sessions = () => {
  useProtectedRoute();
  const user = currentUser();
  const { data: sessions } = useQuery("sessions", () => fetchSessions(user.id));

  return (
    <>
      <h1>Sessions</h1>
      {sessions && (
        <ul>
          {sessions.map((session) => (
            <li key={session.id}>
              <Link to={`/session/${session.id}`}>{session.date}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Sessions;
