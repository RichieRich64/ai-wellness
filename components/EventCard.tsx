/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

interface EventProps {
  event: any;
  energyLevel: number;
  onReschedule: (event: EventProps["event"]) => void;
  onDelete: (id: string) => void;
}

const EventCard: React.FC<EventProps> = ({
  event,
  energyLevel,
  onReschedule,
  onDelete,
}) => {
  const getEnergyMessage = () => {
    if (energyLevel >= 80) {
      return (
        <div className="text-green-500">
          💪 Cool! Awesome match. Proceed with the event, meeting, or task.
        </div>
      );
    }
    if (energyLevel >= 50 && energyLevel < 80) {
      return (
        <div className="text-yellow-500">
          🙂 Moderate match. Proceed with the event, but take it easy and find
          time to rest.
        </div>
      );
    }
    return (
      <div>
        {/* <p className="text-red-500"> */}
        <p style={{ color: "red" }}>
          {event.description === "Low Energy"
            ? "😴 Take it easy and find time to rest."
            : "😴 Consider rescheduling for high energy."}
        </p>
      </div>
    );
  };

  return (
    <div className="bg-white p-[15px] mb-[15px] rounded-lg shadow-[0_2px_6px_rgba(0,0,0,0.1)]">
      <h3 className="text-xl font-semibold">{event.summary}</h3>
      <p>
        {new Date(event.start.dateTime).toLocaleString()} -{" "}
        {new Date(event.end.dateTime).toLocaleTimeString()}
      </p>
      <p>{event.location || "No location"}</p>
      <div className="mt-2">{getEnergyMessage()}</div>
      <div className="flex gap-4 items-center">
        <button
          onClick={() => onReschedule(event)}
          className={`py-2 px-4 mt-2 border-none rounded-md text-white cursor-pointer transition-colors duration-150 ease-in-out ${
            event.description === "High Energy" && energyLevel < 50
              ? " bg-[#dc8e86] hover:bg-[#8f5f58]"
              : " bg-blue-500 hover:bg-blue-600"
          }  `}
        >
          Reschedule
        </button>
        <button
          className="py-2 px-4 mt-2 border-none rounded-md bg-[#e3462d] text-white cursor-pointer transition-colors duration-150 ease-in-out hover:bg-[#f42b0b]"
          onClick={() => onDelete(event.id)}
        >
          Delete
        </button>
      </div>
      <p className="mt-3">{event.description || "No description"}</p>
    </div>
  );
};

export default EventCard;
