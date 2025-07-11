import { useState, useEffect } from "react";

export type AttendanceRecord = {
  reg_number: string;
  student_name: string;
  class: string;
  date: string;
  status: "Present" | "Absent" | "Late";
  marked_by?: string;
  notes?: string;
};

export type StudentData = {
  title: string;
  picture: string;
  class: string;
  contact: string;
  reg_number: string;
  email?: string;
  dob?: string;
  address?: string;
};

interface AttendanceProps {
  students: StudentData[];
  userRole: "admin" | "teacher" | "student" | "parent";
  selectedClass?: string;
  selectedDate: string;
  onAttendanceChange?: (records: AttendanceRecord[]) => void;
}

export default function StudentAttendance({
  students,
  userRole,
  selectedClass,
  selectedDate,
  onAttendanceChange,
}: AttendanceProps) {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [bulk, setBulk] = useState<"Present" | "Absent" | "Late" | "">("");
  const [search, setSearch] = useState("");
  const [showNotes, setShowNotes] = useState<string | null>(null);

  const isEditable = userRole === "admin" || userRole === "teacher";

  // ✅ Only set records if different date or student count
  useEffect(() => {
    const needsReset =
      records.length !== students.length ||
      (records[0] && records[0].date !== selectedDate);

    if (needsReset) {
      const initialRecords: AttendanceRecord[] = students.map((s) => ({
        reg_number: s.reg_number,
        student_name: s.title,
        class: s.class,
        date: selectedDate,
        status: "Present",
        notes: "",
      }));
      setRecords(initialRecords);

      // ⚠️ Don't call parent's onAttendanceChange immediately — it might cause re-render loop
      if (onAttendanceChange) {
        // Defer to avoid syncing in the same render phase
        setTimeout(() => {
          onAttendanceChange(initialRecords);
        }, 0);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [students, selectedDate]);

  const filtered = students.filter((s) => {
    const matchClass = !selectedClass || s.class === selectedClass;
    const matchSearch =
      !search ||
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.reg_number.toLowerCase().includes(search.toLowerCase());
    return matchClass && matchSearch;
  });

  const updateStatus = (reg: string, status: "Present" | "Absent" | "Late") => {
    const updated = records.map((r) =>
      r.reg_number === reg ? { ...r, status } : r
    );
    setRecords(updated);
    onAttendanceChange?.(updated);
  };

  const updateNotes = (reg: string, note: string) => {
    const updated = records.map((r) =>
      r.reg_number === reg ? { ...r, notes: note } : r
    );
    setRecords(updated);
    onAttendanceChange?.(updated);
  };

  const applyBulk = () => {
    if (!bulk) return;
    const updated = records.map((r) => ({ ...r, status: bulk }));
    setRecords(updated);
    setBulk("");
    onAttendanceChange?.(updated);
  };

  const stats = {
    total: records.length,
    present: records.filter((r) => r.status === "Present").length,
    absent: records.filter((r) => r.status === "Absent").length,
    late: records.filter((r) => r.status === "Late").length,
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">
          Attendance - {selectedClass || "All"}
        </h2>
        <div className="text-sm text-gray-600">
          Date: {new Date(selectedDate).toLocaleDateString()}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 text-center">
        <div className="bg-blue-100 p-2 rounded">Total: {stats.total}</div>
        <div className="bg-green-100 p-2 rounded">Present: {stats.present}</div>
        <div className="bg-red-100 p-2 rounded">Absent: {stats.absent}</div>
        <div className="bg-yellow-100 p-2 rounded">Late: {stats.late}</div>
      </div>

      {/* Controls */}
      <div className="flex gap-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search student..."
          className="border p-2 rounded w-full"
        />
        {isEditable && (
          <>
            <select
              value={bulk}
              onChange={(e) => setBulk(e.target.value as any)}
              className="border p-2 rounded"
            >
              <option value="">Bulk</option>
              <option value="Present">Mark All Present</option>
              <option value="Absent">Mark All Absent</option>
              <option value="Late">Mark All Late</option>
            </select>
            <button
              onClick={applyBulk}
              className="bg-indigo-600 text-white px-4 py-2 rounded"
            >
              Apply
            </button>
          </>
        )}
      </div>

      {/* Table */}
      <table className="w-full border mt-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Name</th>
            <th className="p-2">Reg</th>
            <th className="p-2">Class</th>
            <th className="p-2">Status</th>
            <th className="p-2">Notes</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((student) => {
            const record = records.find((r) => r.reg_number === student.reg_number);
            return (
              <tr key={student.reg_number} className="border-t">
                <td className="p-2">{student.title}</td>
                <td className="p-2">{student.reg_number}</td>
                <td className="p-2">{student.class}</td>
                <td className="p-2">
                  {isEditable ? (
                    <select
                      value={record?.status}
                      onChange={(e) =>
                        updateStatus(student.reg_number, e.target.value as any)
                      }
                      className="border rounded px-2 py-1"
                    >
                      <option value="Present">Present</option>
                      <option value="Absent">Absent</option>
                      <option value="Late">Late</option>
                    </select>
                  ) : (
                    record?.status
                  )}
                </td>
                <td className="p-2">
                  {isEditable ? (
                    <button
                      className="text-blue-600 text-sm"
                      onClick={() => setShowNotes(student.reg_number)}
                    >
                      {record?.notes ? "Edit" : "Add"} Note
                    </button>
                  ) : (
                    record?.notes || "-"
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Note Modal */}
      {showNotes && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <textarea
              value={
                records.find((r) => r.reg_number === showNotes)?.notes || ""
              }
              onChange={(e) => updateNotes(showNotes, e.target.value)}
              className="w-full h-24 border p-2 mb-4"
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowNotes(null)} className="bg-gray-300 px-4 py-1 rounded">
                Close
              </button>
              <button onClick={() => setShowNotes(null)} className="bg-blue-600 text-white px-4 py-1 rounded">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
