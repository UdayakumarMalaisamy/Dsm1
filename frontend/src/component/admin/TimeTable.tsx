import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, UserCheck, User } from "lucide-react";

export interface Course {
  id: number;
  time: string;
  class: string;
  day1: string;
  day2: string;
  day3: string;
  day4: string;
  day5: string;
}

type UserRole = "admin" | "teacher" | "student" | "parent";

export interface TimeTableProps {
  userRole?: UserRole;
  onlyDay?: keyof Omit<Course, "id" | "time" | "class">;
}

const predefinedClasses = [
  "I-CS", "II-CS", "III-CS",
  "I-BCA", "II-BCA", "III-BCA",
  "I-IT", "II-IT", "III-IT",
];

const getUserRole = (): UserRole => {
  const role = localStorage.getItem("role");
  if (role === "admin" || role === "teacher" || role === "student" || role === "parent") {
    return role;
  }
  return "student"; // Default to student for safety
};

const TimeTable: React.FC<TimeTableProps> = ({ userRole, onlyDay }) => {
  const currentUserRole = userRole || getUserRole();
  const [selectedClass, setSelectedClass] = useState<string>("I-CS");
  const [timetable, setTimetable] = useState<Course[]>([
    {
      id: 1,
      class: "I-CS",
      time: "9:00–10:00 AM",
      day1: "Mathematics",
      day2: "Physics",
      day3: "Chemistry",
      day4: "English",
      day5: "Computer Science",
    },
    {
      id: 2,
      class: "I-CS",
      time: "10:00–11:00 AM",
      day1: "Programming Lab",
      day2: "Mathematics",
      day3: "Physics",
      day4: "Chemistry",
      day5: "English",
    },
    {
      id: 3,
      class: "II-CS",
      time: "9:00–10:00 AM",
      day1: "Database Systems",
      day2: "Computer Networks",
      day3: "Operating Systems",
      day4: "Artificial Intelligence",
      day5: "Machine Learning",
    },
  ]);
  const [editing, setEditing] = useState<{
    id: number;
    day: keyof Omit<Course, "id" | "time" | "class">;
  } | null>(null);
  const [editValue, setEditValue] = useState<string>("");
  const [newTime, setNewTime] = useState<string>("");

  const isEditable = currentUserRole === "admin"; // Only admin can edit
  const isStudent = currentUserRole === "student" || currentUserRole === "parent";

  const days: Array<keyof Omit<Course, "id" | "time" | "class">> = [
    "day1", "day2", "day3", "day4", "day5",
  ];

  const visibleDays = onlyDay ? [onlyDay] : days;

  const dayLabels: Record<string, string> = {
    day1: "Monday",
    day2: "Tuesday",
    day3: "Wednesday",
    day4: "Thursday",
    day5: "Friday",
  };

  const dayColors: Record<string, string> = {
    day1: "bg-red-100 text-red-800 border-red-200",
    day2: "bg-yellow-100 text-yellow-800 border-yellow-200",
    day3: "bg-green-100 text-green-800 border-green-200",
    day4: "bg-blue-100 text-blue-800 border-blue-200",
    day5: "bg-purple-100 text-purple-800 border-purple-200",
  };

  const handleEdit = (
    id: number,
    day: keyof Omit<Course, "id" | "time" | "class">,
    value: string
  ) => {
    if (!isEditable) return;
    setEditing({ id, day });
    setEditValue(value);
  };

  const handleSave = (
    id: number,
    day: keyof Omit<Course, "id" | "time" | "class">
  ) => {
    setTimetable((prev) =>
      prev.map((row) =>
        row.id === id ? { ...row, [day]: editValue } : row
      )
    );
    setEditing(null);
    setEditValue("");
  };

  const handleAddTimeSlot = () => {
    if (!newTime.trim()) return;
    const newId = Math.max(...timetable.map((c) => c.id), 0) + 1;
    setTimetable([
      ...timetable,
      {
        id: newId,
        time: newTime,
        class: selectedClass,
        day1: "",
        day2: "",
        day3: "",
        day4: "",
        day5: "",
      },
    ]);
    setNewTime("");
  };

  const filteredTimetable = timetable.filter(
    (row) => row.class === selectedClass
  );

  const getRoleIcon = () => {
    switch (currentUserRole) {
      case "admin":
        return <UserCheck className="w-5 h-5 text-green-600" />;
      case "student":
      case "parent":
        return <User className="w-5 h-5 text-purple-600" />;
      default:
        return <Eye className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-800">📅 Timetable</h1>
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${
            currentUserRole === "admin" ? "bg-green-100 text-green-800 border-green-300" : "bg-purple-100 text-purple-800 border-purple-300"
          }`}>
            {getRoleIcon()}
            <span className="text-sm font-medium capitalize">{currentUserRole}</span>
          </div>
        </div>
        <div className="text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
          {currentUserRole === "admin" ? "Full Access - Can edit timetable" : "View Only"}
        </div>
      </div>

      {/* Class Selector */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-semibold text-gray-700">🎓 Select Class</label>
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {predefinedClasses.map((cls) => (
            <option key={cls} value={cls}>
              {cls}
            </option>
          ))}
        </select>
      </div>

      {/* Timetable */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>
            📅 {onlyDay
              ? `${dayLabels[onlyDay]} Timetable`
              : `Weekly Timetable - ${selectedClass}`}
          </CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto p-0">
          <table className="min-w-full table-auto text-sm">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Time</th>
                {visibleDays.map((day) => (
                  <th key={day} className="px-6 py-3 text-left font-semibold text-gray-700">
                    {dayLabels[day]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredTimetable.map((row, index) => (
                <tr key={row.id} className={`border-b ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                  <td className="px-6 py-3 font-medium text-gray-800">{row.time}</td>
                  {visibleDays.map((day) => (
                    <td key={day} className="px-6 py-3">
                      {editing?.id === row.id && editing.day === day ? (
                        <div className="flex gap-2">
                          <Input
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="w-40"
                          />
                          <Button size="sm" onClick={() => handleSave(row.id, day)}>
                            Save
                          </Button>
                        </div>
                      ) : (
                        <div
                          onClick={() => handleEdit(row.id, day, row[day])}
                          className={`rounded px-3 py-1 border ${
                            row[day] ? dayColors[day] : "bg-gray-50 text-gray-400 border-gray-200"
                          } ${isEditable ? "cursor-pointer hover:bg-opacity-80" : "cursor-default"}`}
                        >
                          {row[day] || "Free"}
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Add Time Slot (Admin Only) */}
      {isEditable && !onlyDay && (
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>➕ Add Time Slot</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-3 items-center">
            <Input
              placeholder="e.g., 2:00–3:00 PM"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              className="w-60"
            />
            <Button onClick={handleAddTimeSlot}>Add</Button>
          </CardContent>
        </Card>
      )}

      {/* Student/Parent Info */}
      {isStudent && (
        <Card className="shadow-md border-purple-200">
          <CardContent className="p-4 flex items-center gap-3 text-purple-700">
            <User className="w-5 h-5" />
            <div>
              <p className="font-semibold">Student View</p>
              <p className="text-sm">You can view the timetable but cannot edit it. Contact an admin for changes.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TimeTable;