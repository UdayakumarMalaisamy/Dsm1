import { useEffect, useState } from "react";
import Overview from "../component/admin/overview";
import TimeTable from "../component/admin/TimeTable";
import { useCalendarStore } from "@/store/useCalendarStore";

// Define user roles and day order types
type UserRole = "admin" | "teacher" | "student" | "parent";
type DayOrder = "day1" | "day2" | "day3" | "day4" | "day5";

// Function to get today’s day order (Mon = Day 1, ..., Fri = Day 5)
const getTodayDayOrder = (): DayOrder => {
  const day = new Date().getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6
  const map: Record<number, DayOrder> = {
    1: "day1",
    2: "day2",
    3: "day3",
    4: "day4",
    5: "day5",
  };
  return map[day] || "day1"; // Default to "day1" on weekends
};

// Labels for UI display
const dayOrderLabels: Record<DayOrder, string> = {
  day1: "Day 1",
  day2: "Day 2",
  day3: "Day 3",
  day4: "Day 4",
  day5: "Day 5",
};

const Dashboard = () => {
  const [userRole, setUserRole] = useState<UserRole>("teacher");
  const [todayOrder, setTodayOrder] = useState<DayOrder>("day1");
  const { events } = useCalendarStore();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === "admin" || role === "teacher" || role === "student" || role === "parent") {
      setUserRole(role);
    }

    const today = getTodayDayOrder();
    setTodayOrder(today);
  }, []);

  // Get today’s events based on actual date (not day order)
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
      {/* Overview with today's events */}
      <Overview userRole={userRole} todayEvents={todayEvents} />

      {/* Day Order Timetable */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 max-w-4xl mx-auto">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
          📅 {dayOrderLabels[todayOrder]}'s Timetable
        </h2>
        <TimeTable userRole={userRole} onlyDay={todayOrder} />
      </div>
    </div>
  );
};

export default Dashboard;
