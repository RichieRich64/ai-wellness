/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";

interface Props {
  event: any;
  onClose: () => void;
  onSubmit: (updatedEvent: any) => void;
  isLoading: boolean;
}

const RescheduleModal: React.FC<Props> = ({
  event,
  onClose,
  onSubmit,
  isLoading,
}) => {
  const [summary, setSummary] = useState(event.summary || "");
  const [start, setStart] = useState(event.start.dateTime.slice(0, 16)); // datetime-local input
  const [end, setEnd] = useState(event.end.dateTime.slice(0, 16));

  const handleSubmit = () => {
    onSubmit({
      ...event,
      summary,
      start: { dateTime: new Date(start).toISOString() },
      end: { dateTime: new Date(end).toISOString() },
    });
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <h2 className="modal-title">Reschedule Event</h2>

        <div className="modal-form-group">
          <label>Title</label>
          <input
            type="text"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="modal-input"
          />
        </div>

        <div className="modal-form-group">
          <label>Start Time</label>
          <input
            type="datetime-local"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="modal-input"
          />
        </div>

        <div className="modal-form-group">
          <label>End Time</label>
          <input
            type="datetime-local"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            className="modal-input"
          />
        </div>

        <div className="modal-actions">
          <button className="modal-btn cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="modal-btn save" onClick={handleSubmit}>
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RescheduleModal;
