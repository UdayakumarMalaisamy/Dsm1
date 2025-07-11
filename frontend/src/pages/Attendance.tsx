// src/pages/AttendancePage.tsx
import { useState, useEffect } from "react";
import StudentAttendance, {
  type AttendanceRecord,
  type StudentData,
} from "../component/Teacher/Attendance";

const predefinedClasses = [
  "I-CS", "II-CS", "III-CS",
  "I-BCA", "II-BCA", "III-BCA",
  "I-IT", "II-IT", "III-IT",
];

export default function AttendancePage() {
  const [students, setStudents] = useState<StudentData[]>([]);
  const [, setAttendanceHistory] = useState<AttendanceRecord[]>([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    // Sample data (replace with API or Zustand)
    setStudents([
      {
        title: "John",
        picture: "",
        class: "I-CS",
        contact: "9876543210",
        reg_number: "C001",
      },
      {
        title: "Jane",
        picture: "",
        class: "II-CS",
        contact: "9876543211",
        reg_number: "C002",
      },
      {
        title: "Mike",
        picture: "",
        class: "I-BCA",
        contact: "9876543212",
        reg_number: "B001",
      },
    ]);
  }, []);

  const filteredStudents = selectedClass
    ? students.filter((s) => s.class === selectedClass)
    : students;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Attendance Page</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Classes</option>
          {predefinedClasses.map((cls) => (
            <option key={cls} value={cls}>{cls}</option>
          ))}
        </select>

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      <StudentAttendance
        students={filteredStudents}
        userRole="admin"
        selectedClass={selectedClass}
        selectedDate={selectedDate}
        onAttendanceChange={(records) => setAttendanceHistory(records)}
      />
    </div>
  );
}
