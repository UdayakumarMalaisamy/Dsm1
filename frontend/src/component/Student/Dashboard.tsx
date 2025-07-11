import { useEffect, useState } from "react";
import Overview from "../component/admin/overview"; // Reusing overview
import TimeTable from "../component/admin/TimeTable"; // Reusing timetable
import { useCalendarStore } from "@/store/useCalendarStore";

// Types
type UserRole = "student";
type DayOrder = "day1" | "day2" | "day3" | "day4" | "day5";

// Get current day order
const getTodayDayOrder = (): DayOrder => {
  const day = new Date().getDay();
  const map: Record<number, DayOrder> = {
    1: "day1",
    2: "day2",
    3: "day3",
    4: "day4",
    5: "day5",
  };
  return map[day] || "day1";
};

const dayOrderLabels: Record<DayOrder, string> = {
  day1: "Day 1",
  day2: "Day 2",
  day3: "Day 3",
  day4: "Day 4",
  day5: "Day 5",
};

const StudentDashboard = () => {
  const [todayOrder, setTodayOrder] = useState<DayOrder>("day1");
  const { events } = useCalendarStore();

  useEffect(() => {
    setTodayOrder(getTodayDayOrder());
  }, []);

  const now = new Date();
  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);

  const todayEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.toDateString() === now.toDateString() &&
      eventDate <= endOfToday
    );
  });

  return (
    <div className="p-4 pt-2 md:p-6 bg-gray-50 min-h-screen space-y-6">
      <Overview userRole="student" todayEvents={todayEvents} />

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 max-w-4xl mx-auto">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
          📅 {dayOrderLabels[todayOrder]}'s Timetable
        </h2>
        <TimeTable userRole="student" onlyDay={todayOrder} />
      </div>
    </div>
  );
};

export default StudentDashboard;
