// pages/TaskPage.tsx
import React, { useState } from "react";
import TeacherTaskComponent from "../component/Teacher/Task";
import StudentTaskComponent from "../component/Student/Task";

interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
}

// Mock data
const mockTasks: Task[] = [
  { id: 1, title: "Complete Project Proposal", description: "Submit final proposal", dueDate: "2025-06-01" },
  { id: 2, title: "DBMS Assignment", description: "Solve 10 questions", dueDate: "2025-06-05" },
];

import { getUser } from '../utils/tokenUtils';

// Get user role from auth
const getUserRole = (): "teacher" | "student" => {
  const user = getUser();
  if (user && (user.role === 'teacher' || user.role === 'student')) {
    return user.role;
  }
  return 'student'; // Default to student
};

const TaskPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const userRole = getUserRole();

  const handleSave = (updatedTasks: Task[]) => {
    setTasks(updatedTasks);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">📝 Task Management</h1>
      {userRole === "teacher" ? (
        <TeacherTaskComponent tasks={tasks} onSave={handleSave} />
      ) : (
        <StudentTaskComponent tasks={tasks} />
      )}
    </div>
  );
};

export default TaskPage;