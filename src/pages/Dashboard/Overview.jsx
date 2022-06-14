import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { supabase } from "../../api/supabase";
import { currentUser, useProtectedRoute } from "../../utils/auth";

const Overview = () => {
  useProtectedRoute();

  return (
    <>
      <h1>Overview</h1>
      notification: Pending RSVP
      <h2>Your next session</h2>
      <Link to="sessions">See all sessions</Link> /
      <Link to="/new-session">Start new session</Link>
      <h2>Pending invites</h2>
      tabs: Sessions, Groups
      <h2>Invite someone</h2>
      form: email
    </>
  );
};

export default Overview;
