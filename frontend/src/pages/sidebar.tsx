// src/pages/sidebar.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from '../store/useAuthStore';
import { clearAuthData } from '../utils/tokenUtils';
import { NavLink } from "react-router-dom";
import navData from "../helper/navData";

interface SidebarProps {
  userRole: "admin" | "teacher" | "student" | "parent";
}

const Sidebar: React.FC<SidebarProps> = ({ userRole }) => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    clearAuthData();
    navigate('/login');
  };
  return (
    <aside className="w-64 h-screen bg-gray-900 text-white fixed shadow-lg flex flex-col">
      {/* Header */}
      <div className="p-4 text-2xl font-bold tracking-wide bg-gray-800 border-b border-gray-700">
        🎓 {userRole.charAt(0).toUpperCase() + userRole.slice(1)} Panel
      </div>

      {/* Nav Links */}
      <nav className="p-4 flex-1 overflow-y-auto space-y-1">
        {navData
          .filter((item) => item.role.includes(userRole))
          .map(({ title, link, icon: Icon }) => (
            <NavLink
              key={title}
              to={link}
              className={({ isActive }) =>
                `group flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "hover:bg-gray-700 text-gray-300"
                }`
              }
            >
              <Icon className="text-lg transition-transform group-hover:scale-110" />
              <span className="text-sm font-medium">{title}</span>
            </NavLink>
          ))}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 p-3 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors duration-200"
        >
          <span className="text-lg">🚪</span>
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
      
      {/* Footer (optional) */}
      <div className="p-4 text-xs text-gray-500 border-t border-gray-700">
        © {new Date().getFullYear()} Department App
      </div>
    </aside>
  );
};

export default Sidebar;
