import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import fetchGroups from "../../api/fetchGroups";
import { supabase } from "../../api/supabase";
import { currentUser, useProtectedRoute } from "../../utils/auth";

const Sessions = () => {
  useProtectedRoute();
  //   const user = currentUser();
  const { data: groups } = fetchGroups;

  return (
    <>
      <h1>Groups</h1>
      {groups &&
        groups.map((group) => (
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
  );
};

export default Sessions;
