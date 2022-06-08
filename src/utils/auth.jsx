import { Navigate, useOutlet } from "react-router-dom";
import { supabase } from "../api/supabase";

export const useProtectedRoute = () => {
  const session = supabase.auth.session();
  const outlet = useOutlet();

  if (!session) {
    return <Navigate to="/" replace />;
  }

  return outlet;
};

export const isLoggedIn = () => {
  const session = supabase.auth.session();

  return !!session;
};

export const currentUser = () => {
  const session = supabase.auth.session();

  return session.user;
};
