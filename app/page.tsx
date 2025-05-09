"use client";

import { useUser } from "@/hooks/useUser";
import Dashboard from "./dashboard/page";
import Login from "./login/page";

export default function Home() {
  const { user, loading } = useUser();

  if (loading) return <div className="p-4">Loading...</div>;

  if (!user) return <Login />;

  return <Dashboard />;
}
