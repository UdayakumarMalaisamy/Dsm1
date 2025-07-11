
import React from "react";
import TimeTable from "../component/Student/TimeTable";

// Define allowed user roles (must match App.tsx and TimeTable.tsx)
type UserRole = "admin" | "teacher" | "student" | "parent";

// Define props interface for Timetable
interface TimetableProps {
  userRole?: UserRole; // Optional, matching TimeTableProps
}

const Timetable: React.FC<TimetableProps> = ({ userRole }) => {
  return <TimeTable userRole={userRole} />;
};

export default Timetable;
