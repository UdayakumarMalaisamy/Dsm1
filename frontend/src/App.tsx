import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useAuthStore } from './store/useAuthStore';
import { getToken, getUser } from './utils/tokenUtils';

// Page components
import Sidebar from "./pages/sidebar";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/Dashboard";
import TeacherList from "./pages/Teacherlist";
import StudentList from "./pages/Studentlist";
import Attendance from "./pages/Attendance";
import Task from "./pages/Task";
import Result from "./pages/Result";
import Timetable from "./pages/Timetable";
import Calendar from "./pages/Calender";
import Parentslist from "./pages/Parentslist";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentProfilePage from "./pages/StudentProfilePage";
import PasswordChange from "./components/PasswordChange";
import UserManagement from "./pages/UserManagement";

// Define allowed user roles
type UserRole = "admin" | "teacher" | "student" | "parent";

// Helper to safely get user role
const getUserRole = (): UserRole => {
  const user = getUser();
  if (user && user.role) {
    return user.role;
  }
  return "teacher"; // Default to student for view-only access
};

// Protected Route Wrapper
const ProtectedRoute: React.FC<{
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}> = ({ children, allowedRoles }) => {
  const token = getToken();
  const user = getUser();
  const location = useLocation();

  if (!token || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  const { setUser, setToken } = useAuthStore();
  const userRole = getUserRole();

  useEffect(() => {
    // Initialize auth state from localStorage
    const token = getToken();
    const user = getUser();
    if (token && user) {
      setToken(token);
      setUser(user);
    }
  }, [setUser, setToken]);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/change-password" element={<PasswordChange />} />

        {/* Protected Routes with Layout */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div className="flex">
                <Sidebar userRole={userRole} />
                <main className="ml-64 p-6 w-full">
                  <Routes>
                    <Route 
                      path="/dashboard" 
                      element={
                        userRole === 'admin' ? <AdminDashboard /> : <Dashboard />
                      } 
                    />

                    {/* Student Dashboard */}
                    <Route
                      path="/student-dashboard"
                      element={
                        <ProtectedRoute allowedRoles={["student"]}>
                          <StudentDashboard />
                        </ProtectedRoute>
                      }
                    />

                    <Route
                      path="/students"
                      element={
                        <ProtectedRoute allowedRoles={["admin", "teacher"]}>
                          <StudentList />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/parents"
                      element={
                        <ProtectedRoute allowedRoles={["admin"]}>
                          <Parentslist />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/attendance"
                      element={
                        <ProtectedRoute allowedRoles={["admin", "teacher"]}>
                          <Attendance />
                        </ProtectedRoute>
                      }
                    />
                    <Route path="/task" element={<Task />} />
                    <Route path="/result" element={<Result />} />
                    <Route
                      path="/timetable"
                      element={<Timetable userRole={userRole} />}
                    />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route
                      path="/teachers"
                      element={
                        <ProtectedRoute allowedRoles={["admin"]}>
                          <TeacherList />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/user-management"
                      element={
                        <ProtectedRoute allowedRoles={["admin"]}>
                          <UserManagement />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/student-profile"
                      element={<StudentProfilePage />}
                    />
                    <Route path="*" element={<Navigate to="/dashboard" />} />
                  </Routes>
                </main>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
