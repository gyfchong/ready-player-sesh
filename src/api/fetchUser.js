import { supabase } from "./supabase";

export default async (id) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, name")
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("User not found");
  }

  return data[0];
};
