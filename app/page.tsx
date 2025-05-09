"use client";

import { useUser } from "@/hooks/useUser";
import Dashboard, { User } from "./dashboard/page";
import Login from "./login/page";

export default function Home() {
  const { user, loading } = useUser();

  const currentUser: User = {
    name: user?.displayName ?? "",
    email: user?.emails?.[0]?.value ?? "",
  };

  if (loading) return <div className="p-4">Loading...</div>;

  if (!user) return <Login />;

  return (
    <div className="">
      <Dashboard user={currentUser} />
    </div>
  );
}
