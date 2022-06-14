// @ts-nocheck
import { supabase } from "./supabase";
import { validate as uuidValidate } from "uuid";
import fetchUser from "./fetchUser";

export const sessionsByUser = async (user) => {
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

export const sessionsById = async (id) => {
  const { data, error } = await supabase
    .from("sessions")
    .select("id, date, invitees")
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("Session not found");
  }

  const session = data[0];

  session.invitees = session.invitees.reduce((list, invitee) => {
    list.push({ name: invitee, status: "undecided" });

    return list;
  }, []);

  return session;
};
