import { supabase } from "./supabase";

export default async () => {
  const { data, error } = await supabase.from("group").select("members, name");

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("User not found");
  }

  return data;
};
