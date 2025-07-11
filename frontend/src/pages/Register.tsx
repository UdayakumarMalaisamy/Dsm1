import React, { useState } from "react";
import Students, { type ColumnConfig } from "../component/Teacher/Student"; // assumes reusable Students component

// Result data structure
interface Result {
  studentName: string;
  reg_number: string;
  class: string;
  mark: string;
  grade: string;
  taskTitle: string;
}

// Sample task list
const tasks = [
  { title: "Test 1" },
  { title: "Assignment 1" },
  { title: "Project Work" },
];

// Columns for the Students table
const resultColumns: ColumnConfig<Result>[] = [
  { label: "Student Name", key: "studentName" },
  { label: "Register Number", key: "reg_number" },
  { label: "Class", key: "class" },
  { label: "Mark", key: "mark" },
  { label: "Grade", key: "grade" },
];

const ResultPage: React.FC = () => {
  const [results, setResults] = useState<Result[]>([]);
  const [selectedTask, setSelectedTask] = useState<string>("");

  // Filter results based on selected task
  const filteredResults = results.filter((r) => r.taskTitle === selectedTask);

  // Update handler that syncs only selected task's results
  const handleResultsChange = (newResults: Result[]) => {
    const others = results.filter((r) => r.taskTitle !== selectedTask);
    const updated = [
      ...others,
      ...newResults.map((r) => ({ ...r, taskTitle: selectedTask })),
    ];
    setResults(updated);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">📋 Task-wise Student Results</h1>

      {/* Task Selector */}
      <div className="space-y-1">
        <label className="text-lg font-medium">Select Task</label>
        <select
          value={selectedTask}
          onChange={(e) => setSelectedTask(e.target.value)}
          className="border px-4 py-2 rounded-lg w-full shadow-sm"
        >
          <option value="">-- Choose a Task --</option>
          {tasks.map((task, idx) => (
            <option key={idx} value={task.title}>
              {task.title}
            </option>
          ))}
        </select>
      </div>

      {/* Result Form Table */}
      {!selectedTask ? (
        <div className="bg-gray-100 p-4 rounded border border-dashed text-gray-600">
          👉 Please select a task to enter results.
        </div>
      ) : (
        <Students
          data={filteredResults}
          columns={resultColumns}
          userRole="teacher"
          entityName={`Result for "${selectedTask}"`}
          onChange={handleResultsChange}
        />
      )}
    </div>
  );
};

export default ResultPage;
