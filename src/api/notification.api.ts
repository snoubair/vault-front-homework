import { Notif } from "../models/notification.model";

const API = "http://localhost:5000";

export const fetchNotifications = async (
  searchText: string
): Promise<Notif[]> => {
  const res = await fetch(`${API}/search?q=${searchText}`);
  const data = await res.json();
  return data;
};
