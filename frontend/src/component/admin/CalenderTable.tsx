// src/components/admin/CollegeCalendarTable.tsx


import { useState } from "react";

// Types
export type EventType = "Holiday" | "Exam" | "Seminar" | "Class" | "Event";

export interface CalendarEvent {
  id: number;
  date: string; // ISO format, e.g., "2025-04-05"
  title: string;
  description: string;
  type: EventType;
}

interface CollegeCalendarTableProps {
  initialEvents: CalendarEvent[];
  userRole: "admin" | "teacher" | "student" | "parent";
  onSave?: (updatedEvents: CalendarEvent[]) => void;
}

const CollegeCalendarTable: React.FC<CollegeCalendarTableProps> = ({
  initialEvents,
  userRole,
  onSave,
}) => {
  const isEditable = userRole === "admin";
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [] = useState<Date | undefined>(new Date())

  const handleInputChange = (
    id: number,
    field: keyof CalendarEvent,
    value: string
  ) => {
    setEvents((prev) =>
      prev.map((event) => (event.id === id ? { ...event, [field]: value } : event))
    );
  };

  const handleAddEvent = () => {
    const newEvent: CalendarEvent = {
      id: Date.now(),
      date: "",
      title: "",
      description: "",
      type: "Event",
    };
    setEvents([newEvent, ...events]);
  };

  const handleDeleteEvent = (id: number) => {
    if (!isEditable) return;
    if (window.confirm("Are you sure you want to delete this event?")) {
      setEvents(events.filter((event) => event.id !== id));
    }
  };

  const handleSave = () => {
    onSave?.(events);
    alert("Calendar updated successfully!");
  };

  return (
    <>
    <div className="p-4">
      <h2 className="text-xl font-bold text-gray-800 mb-4">College Academic Calendar</h2>

      {isEditable && (
        <div className="mb-4 flex justify-end">
          <button
            onClick={handleAddEvent}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded shadow"
          >
            + Add Event
          </button>
        </div>
      )}

      <div className="overflow-x-auto bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              {isEditable && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {events.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  No events found.
                </td>
              </tr>
            ) : (
              events.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {isEditable ? (
                      <input
                        type="date"
                        value={event.date}
                        onChange={(e) => handleInputChange(event.id, "date", e.target.value)}
                        className="block w-full px-2 py-1 border border-gray-300 rounded"
                      />
                    ) : (
                      event.date
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {isEditable ? (
                      <input
                        type="text"
                        value={event.title}
                        onChange={(e) => handleInputChange(event.id, "title", e.target.value)}
                        placeholder="Event title"
                        className="block w-full px-2 py-1 border border-gray-300 rounded"
                      />
                    ) : (
                      event.title
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {isEditable ? (
                      <input
                        type="text"
                        value={event.description}
                        onChange={(e) => handleInputChange(event.id, "description", e.target.value)}
                        placeholder="Description"
                        className="block w-full px-2 py-1 border border-gray-300 rounded"
                      />
                    ) : (
                      event.description
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {isEditable ? (
                      <select
                        value={event.type}
                        onChange={(e) => handleInputChange(event.id, "type", e.target.value as EventType)}
                        className="block w-full px-2 py-1 border border-gray-300 rounded"
                      >
                        <option>Holiday</option>
                        <option>Exam</option>
                        <option>Seminar</option>
                        <option>Class</option>
                        <option>Event</option>
                      </select>
                    ) : (
                      event.type
                    )}
                  </td>
                  {isEditable && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                      <button
                        onClick={() => handleDeleteEvent(event.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isEditable && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleSave}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Save Calendar
          </button>
        </div>
      )}
    </div>

    <div>
      

    </div>
    </>
  );
};

export default CollegeCalendarTable;