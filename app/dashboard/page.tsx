/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/config/axios";
import EnergyInput from "@/components/EnergyInput";
import EnergyStatus from "@/components/EnergyStatus";
import EventCard from "@/components/EventCard";
import RescheduleModal from "@/components/RescheduleModal";

export type User = {
  name: string;
  email: string;
};

interface DashboardProps {
  user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [rescheduling, setRescheduling] = useState(false);
  const [events, setEvents] = useState<any[]>([]);
  const [error, setError] = useState<string>("");
  const [energyLevel, setEnergyLevel] = useState<number>(75);
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  const router = useRouter();

  const handleSyncCalendar = async () => {
    try {
      setLoading(true);
      const res = await api.get("/calendar/sync");
      setEvents(res.data);
    } catch (error) {
      setError("Failed to sync calendar.");
      console.error("Error syncing calendar:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRescheduleSubmit = async (updatedEvent: any) => {
    try {
      setRescheduling(true);
      await api.put("/calendar/update-event", updatedEvent);

      setEvents((prev) =>
        prev.map((e) => (e.id === updatedEvent.id ? updatedEvent : e))
      );
      setSelectedEvent(null);

      alert("Event updated successfully on Google Calendar!");
    } catch (err) {
      console.error("Failed to update event:", err);
      alert("Failed to update event. Please try again.");
    } finally {
      setSelectedEvent(null);
      setRescheduling(false);
    }
  };

  const handleDelete = async (eventId: string) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      await api.delete(`/calendar/event/${eventId}`);
      setEvents((prev) => prev.filter((event) => event.id !== eventId));

      alert("Event deleted successfully on Google Calendar!");
    } catch (err) {
      console.error("Failed to delete event:", err);
      alert("Failed to delete event.");
    }
  };

  const handleLogout = () => {
    // window.location.href = "http://localhost:5001/auth/logout"; // Trigger logout
    window.location.href =
      "https://ai-wellness-backend-pbxw.onrender.com/auth/logout"; // Trigger logout
  };

  useEffect(() => {
    handleSyncCalendar();
  }, []);

  return (
    <div className="max-w-[600px] my-5 mx-auto p-5 bg-[#f9f9f9] rounded-lg shadow-[0_4px_10px_rgba(0,0,0,0.1)]">
      <h1 className="text-4xl font-semibold text-blue-900 mb-4">
        Welcome, {user.name}!
      </h1>
      <p className="text-2xl text-slate-700 mb-8">Your email: {user.email}</p>

      <EnergyInput energyLevel={energyLevel} setEnergyLevel={setEnergyLevel} />
      <EnergyStatus energyLevel={energyLevel} />

      <div className="my-8">
        <button
          onClick={() => router.push("/create-event")}
          className="py-2 px-4 mt-2 border-none rounded-md bg-blue-500 text-white cursor-pointer transition-colors duration-150 ease-in-out hover:bg-blue-600"
        >
          + Create New Event
        </button>
      </div>

      <div className="my-4">
        <h2>Your Upcoming Events:</h2>
        {loading ? (
          <p>Loading events...</p>
        ) : (
          <>
            {events.length > 0 ? (
              <div className="mt-5">
                {events.map((event: any) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    energyLevel={energyLevel}
                    onReschedule={setSelectedEvent}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            ) : (
              <p>No upcoming events to show.</p>
            )}
          </>
        )}
      </div>

      {selectedEvent && (
        <RescheduleModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onSubmit={handleRescheduleSubmit}
          isLoading={rescheduling}
        />
      )}

      <div className="flex gap-4 flex-wrap">
        <button
          className="bg-[#4caf50] text-white py-[10px] px-5 border-none rounded-[5px] cursor-pointer text-base transition-colors duration-150 ease-in-out hover:bg-[#45a049]"
          onClick={handleSyncCalendar}
          disabled={loading}
        >
          {loading ? "Syncing..." : "Sync Google Calendar"}
        </button>
        <button
          className="py-3 px-6 text-white border-none rounded-[10px] cursor-pointer font-semibold text-base transition-colors duration-150 ease-in-out bg-[#d9534f] hover:bg-[#c9302c]"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
};

export default Dashboard;
