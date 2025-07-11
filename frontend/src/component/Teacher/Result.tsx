import React from "react";

export interface Result {
  studentName: string;
  reg_number: string;
  class: string;
  mark: string;
}

interface Props {
  data: Result[];
  onChange: (data: Result[]) => void;
}

const ResultTableTeacher: React.FC<Props> = ({ data, onChange }) => {
  const handleChange = (index: number, field: keyof Result, value: string) => {
    const updated = [...data];
    updated[index][field] = value;
    onChange(updated);
  };

  const handleAdd = () => {
    onChange([...data, { studentName: "", reg_number: "", class: "", mark: "" }]);
  };

  const handleRemove = (index: number) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="mb-2 flex justify-between items-center">
        <h3 className="text-lg font-bold text-indigo-700">📌 Student Marks</h3>
        <button
          onClick={handleAdd}
          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
        >
          ➕ Add Row
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Reg. Number</th>
              <th className="p-2 border">Class</th>
              <th className="p-2 border">Mark</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((r, idx) => (
              <tr key={idx}>
                <td className="border p-2">
                  <input
                    value={r.studentName}
                    onChange={(e) => handleChange(idx, "studentName", e.target.value)}
                    className="w-full border px-2 py-1 rounded"
                  />
                </td>
                <td className="border p-2">
                  <input
                    value={r.reg_number}
                    onChange={(e) => handleChange(idx, "reg_number", e.target.value)}
                    className="w-full border px-2 py-1 rounded"
                  />
                </td>
                <td className="border p-2">
                  <input
                    value={r.class}
                    onChange={(e) => handleChange(idx, "class", e.target.value)}
                    className="w-full border px-2 py-1 rounded"
                  />
                </td>
                <td className="border p-2">
                  <input
                    value={r.mark}
                    onChange={(e) => handleChange(idx, "mark", e.target.value)}
                    className="w-full border px-2 py-1 rounded"
                  />
                </td>
                <td className="border p-2 text-center">
                  <button
                    onClick={() => handleRemove(idx)}
                    className="text-red-500 hover:underline"
                  >
                    ❌ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultTableTeacher;
