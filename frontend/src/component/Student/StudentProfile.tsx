// src/component/Teacher/CompactStudentProfile.tsx
import React, { useState } from "react";
import { type StudentData } from "../Teacher/Student";
import {
  GraduationCap,
  ShieldCheck,
  Mail,
  Phone,
  CalendarDays,
} from "lucide-react";

const CompactStudentProfile: React.FC<{ student: StudentData }> = ({ student }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <div className="h-24 bg-gradient-to-r from-blue-500 to-purple-600"></div>
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
          <img
            src={student.picture}
            alt="Profile"
            className="w-16 h-16 rounded-full border-4 border-white shadow-lg object-cover"
          />
        </div>
      </div>

      <div className="pt-12 pb-6 px-6">
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">{student.title}</h3>
          <div className="inline-flex items-center gap-2 mt-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            <GraduationCap size={14} />
            {student.class}
          </div>
        </div>

        <div className={`space-y-3 transition-all duration-300 ${isHovered ? "opacity-100" : "opacity-70"}`}>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <ShieldCheck size={14} className="text-blue-500" />
            <span className="font-medium">Reg:</span> {student.reg_number}
          </div>

          {student.email && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Mail size={14} className="text-blue-500" />
              <span className="truncate">{student.email}</span>
            </div>
          )}

          {student.contact && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Phone size={14} className="text-blue-500" />
              <span>{student.contact}</span>
            </div>
          )}

          {student.dob && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <CalendarDays size={14} className="text-blue-500" />
              <span>{student.dob}</span>
            </div>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100">
          <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105">
            View Full Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompactStudentProfile;
