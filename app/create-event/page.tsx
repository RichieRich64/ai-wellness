"use client";

import api from "@/config/axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const CreateEvent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [attendees, setAttendees] = useState("");
  const [message, setMessage] = useState("");
  const [creating, setCreating] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setCreating(true);
      await api.post(
        "/calendar/event",
        {
          title,
          description,
          location,
          start,
          end,
          attendees: attendees.split(",").map((email) => email.trim()),
        },
        { withCredentials: true }
      );
      setMessage("Event created successfully!");
      // Redirect back to dashboard after a delay
      setTimeout(() => router.push("/"), 1500);
    } catch (err) {
      console.error(err);
      setMessage("Failed to create event.");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Create New Event</h2>
      {message && (
        <div
          className={
            message.includes("success") ? "message-success" : "message-error"
          }
        >
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <label>Start Time:</label>
        <input
          type="datetime-local"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          required
        />
        <label>End Time:</label>
        <input
          type="datetime-local"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Attendees (comma separated emails)"
          value={attendees}
          onChange={(e) => setAttendees(e.target.value)}
        />
        <button type="submit">
          {creating ? "Creating..." : "Create Event"}
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
