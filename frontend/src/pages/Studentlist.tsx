import Students, {
  type StudentData,
  type ColumnConfig,
} from "../component/Teacher/Student";
import { useState } from "react";

const initialStudents: StudentData[] = [];

const predefinedClasses = [
  "I-CS", "II-CS", "III-CS",
  "I-BCA", "II-BCA", "III-BCA",
  "I-IT", "II-IT", "III-IT",
];

export default function StudentListPage() {
  const [students, setStudents] = useState<StudentData[]>(initialStudents);
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [newClass, setNewClass] = useState<string>("");
  const [customClasses, setCustomClasses] = useState<string[]>([]);
  const [, setProfileStudent] = useState<StudentData | null>(null);
  const [] = useState<boolean>(false);
  const [] = useState<StudentData | null>(null);
  const [] = useState<string | null>(null);

  const dynamicClasses = Array.from(new Set(students.map((s) => s.class)));
  const allClasses = Array.from(new Set([...predefinedClasses, ...customClasses, ...dynamicClasses]));

  const handleAddClass = () => {
    const trimmed = newClass.trim();
    if (trimmed && !allClasses.includes(trimmed)) {
      setCustomClasses((prev) => [...prev, trimmed]);
      setSelectedClass(trimmed);
      setNewClass("");
    }
  };

  const handleDeleteClass = (cls: string) => {
    setCustomClasses((prev) => prev.filter((c) => c !== cls));
    if (selectedClass === cls) setSelectedClass("");
  };

  const filteredStudents = selectedClass
    ? students.filter((s) => s.class === selectedClass)
    : students;

  const columns: ColumnConfig<StudentData>[] = [
    {
      key: "picture",
      label: "Photo",
      isImage: true,
      render: (item) => (
        <img
          src={item.picture || "https://ui-avatars.com/api/?name=Student"}
          alt="student"
          onClick={() => setProfileStudent(item)}
          className="w-10 h-10 rounded-full object-cover cursor-pointer hover:scale-105 transition"
        />
      ),
    },
    {
      key: "title",
      label: "Name",
      render: (item) => <span>{item.title}</span>,
    },
    { key: "class", label: "Class" },
    { key: "reg_number", label: "Reg No" },
    { key: "contact", label: "Contact" },
  ];



  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <label className="block text-lg font-semibold">Select Class</label>
        <div className="relative w-full max-w-sm">
          <select
            className="border border-gray-300 px-4 py-2 rounded w-full appearance-none bg-white shadow-sm focus:ring-2 focus:ring-indigo-500"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="">-- All Classes --</option>
            {allClasses.map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4 flex gap-2 items-center">
          <input
            type="text"
            value={newClass}
            onChange={(e) => setNewClass(e.target.value)}
            placeholder="Add new class (e.g., IV-CS)"
            className="border px-3 py-2 rounded w-full max-w-sm"
          />
          <button
            onClick={handleAddClass}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Add
          </button>
          {newClass && customClasses.includes(newClass.trim()) && (
            <button
              onClick={() => handleDeleteClass(newClass.trim())}
              className="px-4 py-2 bg-red-600 text-white rounded"
            >
              Delete
            </button>
          )}
        </div>
      </div>

      <Students
        data={filteredStudents}
        userRole="admin"
        columns={columns}
        entityName={selectedClass ? `Students of ${selectedClass}` : "All Students"}
        onChange={(updated) => {
          const merged = students
            .filter((s) => !filteredStudents.includes(s))
            .concat(updated);
          setStudents(merged);
        }}
      />
    </div>
  );
}
