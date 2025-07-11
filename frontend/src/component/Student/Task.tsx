import React from "react";
import { type Task } from "../../helper/task";
import { Calendar, Info, AlertCircle, Clock } from "lucide-react";

interface StudentTaskComponentProps {
  tasks: Task[];
}

const StudentTaskComponent: React.FC<StudentTaskComponentProps> = ({ tasks }) => {
  const formatDate = (dueDate: string): string => {
    if (!dueDate) return "Not set";
    const date = new Date(dueDate);
    return isNaN(date.getTime()) ? "Invalid date" : date.toLocaleDateString();
  };

  const getTaskStatus = (dueDate: string): "pending" | "overdue" | "upcoming" => {
    const today = new Date();
    const due = new Date(dueDate);
    if (!dueDate || isNaN(due.getTime())) return "pending";
    return due < today ? "overdue" : "upcoming";
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "overdue":
        return (
          <span className="inline-flex items-center gap-1 text-red-600 bg-red-100 px-2 py-1 text-xs rounded-full font-medium">
            <AlertCircle size={12} /> Overdue
          </span>
        );
      case "upcoming":
        return (
          <span className="inline-flex items-center gap-1 text-yellow-700 bg-yellow-100 px-2 py-1 text-xs rounded-full font-medium">
            <Clock size={12} /> Upcoming
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-gray-700 bg-gray-100 px-2 py-1 text-xs rounded-full font-medium">
            <Clock size={12} /> Pending
          </span>
        );
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-lg p-6 rounded-xl shadow-md mt-6 border border-gray-200 transition-all">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
          📘 Tasks
          <span
            className="tooltip text-gray-400 hover:text-gray-600 transition"
            title="Tasks assigned to you by your teacher"
          >
            <Info size={16} />
          </span>
        </h2>
        <p className="text-sm text-gray-500">Showing {tasks.length} task{tasks.length !== 1 && "s"}</p>
      </div>

      {tasks.length === 0 ? (
        <div className="py-12 text-center text-gray-500 border border-dashed border-gray-300 rounded-md">
          <p className="text-lg">No tasks have been assigned yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-md border border-gray-100">
          <table className="min-w-full text-sm divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-600 uppercase tracking-wide">Title</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600 uppercase tracking-wide">Description</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600 uppercase tracking-wide">Due Date</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600 uppercase tracking-wide">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {tasks.map((task) => {
                const status = getTaskStatus(task.dueDate);
                return (
                  <tr
                    key={task.id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-4 py-4 text-gray-800 font-medium">
                      {task.title || "Untitled Task"}
                    </td>
                    <td className="px-4 py-4 text-gray-700">
                      {task.description || "No description provided"}
                    </td>
                    <td className="px-4 py-4 text-gray-600 whitespace-nowrap flex items-center gap-2">
                      <Calendar size={16} className="text-gray-400" />
                      {formatDate(task.dueDate)}
                    </td>
                    <td className="px-4 py-4">{getStatusBadge(status)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StudentTaskComponent;
