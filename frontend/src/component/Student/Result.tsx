import React from "react";
import { GraduationCap, ClipboardList, Star } from "lucide-react";

export interface Result {
  studentName: string;
  reg_number: string;
  class: string;
  mark: string;
  taskTitle: string;
}

interface Props {
  data: Result[];
}

const ResultTableStudent: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md mt-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-indigo-700 flex items-center gap-2">
          <ClipboardList size={24} className="text-indigo-600" />
          My Results
        </h2>
        <span className="text-sm text-gray-500 italic">
          Showing task-wise results
        </span>
      </div>

      {data.length === 0 ? (
        <div className="p-6 text-center text-gray-500 bg-gray-50 rounded-md">
          <GraduationCap className="mx-auto mb-2 text-gray-300" size={48} />
          <p className="text-lg font-medium">No results available yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-md border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-semibold">
              <tr>
                <th className="px-4 py-3 text-left">Task</th>
                <th className="px-4 py-3 text-left">Class</th>
                <th className="px-4 py-3 text-left">Mark</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.map((r, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-indigo-50 transition-colors duration-150"
                >
                  <td className="px-4 py-3 font-medium text-gray-800 flex items-center gap-2">
                    <Star className="text-yellow-500" size={16} />
                    {r.taskTitle}
                  </td>
                  <td className="px-4 py-3 text-gray-700">{r.class}</td>
                  <td
                    className={`px-4 py-3 font-semibold ${
                      +r.mark >= 75
                        ? "text-green-600"
                        : +r.mark >= 50
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {r.mark} / 100
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ResultTableStudent;
