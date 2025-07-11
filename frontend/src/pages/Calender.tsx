// src/pages/AdminCalendarPage.tsx
import CollegeCalendarTable from "../component/admin/CalenderTable";
import { useCalendarStore } from "@/store/useCalendarStore";

const AdminCalendarPage = () => {
  const userRole = "admin";
  const { events, setEvents } = useCalendarStore();

  const handleSave = (updatedEvents: typeof events) => {
    setEvents(updatedEvents); // Sync globally
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">College Academic Calendar</h1>
      <CollegeCalendarTable
        initialEvents={events}
        userRole={userRole}
        onSave={handleSave}
      />
    </div>
  );
};

export default AdminCalendarPage;
