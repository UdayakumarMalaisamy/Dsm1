import React, { useState, useEffect } from "react";
import { type Task } from "../../helper/task";
import { Plus, Save, Trash2 } from "lucide-react";

interface Props {
  tasks: Task[];
  onSave: (updatedTasks: Task[]) => void;
}

const TeacherTaskComponent: React.FC<Props> = ({ tasks, onSave }) => {
  const [taskList, setTaskList] = useState<Task[]>([...tasks]);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    setTaskList([...tasks]);
    setErrors(Array(tasks.length).fill(""));
  }, [tasks]);

  const validateTask = (task: Task): string | null => {
    if (!task.title.trim()) return "Title is required";
    if (!task.dueDate) return "Due date is required";
    if (new Date(task.dueDate) < new Date()) return "Due date cannot be in the past";
    return null;
  };

  const handleChange = (index: number, field: keyof Omit<Task, "id">, value: string) => {
    const updated = [...taskList];
    updated[index][field] = value;
    setTaskList(updated);

    const error = validateTask(updated[index]);
    setErrors((prev) => {
      const newErrors = [...prev];
      newErrors[index] = error || "";
      return newErrors;
    });
  };

  const handleAddRow = () => {
    const newTask: Task = {
      id: Math.max(0, ...taskList.map((t) => t.id)) + 1,
      title: "",
      description: "",
      dueDate: "",
    };
    setTaskList([...taskList, newTask]);
    setErrors([...errors, ""]);
  };

  const handleRemoveRow = (index: number) => {
    setTaskList(taskList.filter((_, i) => i !== index));
    setErrors(errors.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    const validationErrors = taskList.map(validateTask).map((error) => error || "");
    if (validationErrors.some((error) => error)) {
      setErrors(validationErrors);
      alert("Please fix all errors before saving.");
      return;
    }
    onSave(taskList);
    alert("Tasks saved successfully!");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Manage Class Tasks</h2>
        <button
          onClick={handleAddRow}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition"
        >
          <Plus size={16} /> Add Task
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-md overflow-hidden">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr className="text-left text-sm text-gray-600">
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Due Date</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {taskList.map((task, index) => (
              <tr key={task.id} className="even:bg-gray-50">
                <td className="px-4 py-3">
                  <input
                    type="text"
                    placeholder="Enter title"
                    value={task.title}
                    onChange={(e) => handleChange(index, "title", e.target.value)}
                    className={`w-full px-3 py-2 rounded-md border text-sm focus:outline-none focus:ring-2 ${
                      errors[index] ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-blue-300"
                    }`}
                  />
                  {errors[index] && (
                    <p className="text-xs text-red-600 mt-1">{errors[index]}</p>
                  )}
                </td>
                <td className="px-4 py-3">
                  <input
                    type="text"
                    placeholder="Enter description"
                    value={task.description}
                    onChange={(e) => handleChange(index, "description", e.target.value)}
                    className="w-full px-3 py-2 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </td>
                <td className="px-4 py-3">
                  <input
                    type="date"
                    value={task.dueDate}
                    onChange={(e) => handleChange(index, "dueDate", e.target.value)}
                    className={`w-full px-3 py-2 rounded-md border text-sm focus:outline-none focus:ring-2 ${
                      errors[index] ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-blue-300"
                    }`}
                  />
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => handleRemoveRow(index)}
                    className="inline-flex items-center text-red-500 hover:text-red-700 text-sm"
                  >
                    <Trash2 size={16} className="mr-1" />
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-end pt-4 border-t mt-4">
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-5 py-2 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition"
        >
          <Save size={16} />
          Save All
        </button>
      </div>
    </div>
  );
};

export default TeacherTaskComponent;
