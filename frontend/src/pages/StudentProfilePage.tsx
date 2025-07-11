// src/pages/StudentProfilePage.tsx
import React, { useState } from "react";
import {
  Mail,
  Phone,
  CalendarDays,
  MapPin,
  GraduationCap,
  User,
  Droplet,
  Users,
  ShieldCheck,
  Star,
  Award,
  BookOpen,
} from "lucide-react";
import type { StudentData } from "../component/Teacher/Student";

// ✅ Fallback sample student data
const dummyStudent: StudentData = {
  picture: "https://via.placeholder.com/150",
  title: "Joshna R",
  class: "III-BCA",
  reg_number: "BCA20231234",
  email: "joshna@example.com",
  contact: "+91 9876543210",
  dob: "2004-06-20",
  gender: "Female",
  blood_group: "B+",
  guardian_name: "Ravi Kumar",
  guardian_contact: "+91 9876540000",
  address: "12, Gandhi Street, Coimbatore, Tamil Nadu",
};

const StudentProfilePage: React.FC = () => {
  const studentJson = localStorage.getItem("selectedStudent");
  const student: StudentData = studentJson ? JSON.parse(studentJson) : dummyStudent; // fallback to sample data
  const [activeTab, setActiveTab] = useState("personal");

  const personalInfo = [
    { icon: Mail, label: "Email", value: student.email },
    { icon: Phone, label: "Contact", value: student.contact },
    { icon: CalendarDays, label: "Date of Birth", value: student.dob },
    { icon: User, label: "Gender", value: student.gender },
    { icon: Droplet, label: "Blood Group", value: student.blood_group },
    { icon: MapPin, label: "Address", value: student.address },
  ];

  const guardianInfo = [
    { icon: Users, label: "Guardian Name", value: student.guardian_name },
    { icon: Phone, label: "Guardian Contact", value: student.guardian_contact },
  ];

  const academicInfo = [
    { icon: GraduationCap, label: "Class", value: student.class },
    { icon: ShieldCheck, label: "Registration Number", value: student.reg_number },
    { icon: Award, label: "Academic Year", value: "2023-2024" },
    { icon: BookOpen, label: "Semester", value: "5th Semester" },
  ];

  const InfoCard = ({ items, title }: { items: any[]; title: string }) => (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
        {title}
      </h3>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-all duration-200 group"
          >
            <item.icon size={18} className="text-blue-600 group-hover:scale-110 transition-transform duration-200" />
            <div className="flex-1">
              <span className="text-sm text-gray-500 block">{item.label}</span>
              <span className="text-gray-800 font-medium">{item.value || "Not provided"}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-6 relative">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-blue-600 to-purple-600"></div>
          <div className="relative z-10 flex flex-col items-center pt-16 pb-8 px-6">
            <div className="relative">
              <img
                src={student.picture}
                alt="Student"
                className="w-32 h-32 rounded-full border-4 border-white shadow-2xl object-cover"
              />
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <Star size={16} className="text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold mt-6 text-gray-800">{student.title}</h1>
            <div className="flex flex-wrap gap-3 mt-4">
              <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                {student.class}
              </span>
              <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                {student.reg_number}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-lg p-2 mb-6">
          <div className="flex gap-2">
            {[
              { id: "personal", label: "Personal Info", icon: User },
              { id: "guardian", label: "Guardian Info", icon: Users },
              { id: "academic", label: "Academic Info", icon: GraduationCap },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <tab.icon size={18} />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {activeTab === "personal" && <InfoCard items={personalInfo} title="Personal Information" />}
          {activeTab === "guardian" && <InfoCard items={guardianInfo} title="Guardian Information" />}
          {activeTab === "academic" && <InfoCard items={academicInfo} title="Academic Information" />}
        </div>
      </div>
    </div>
  );
};

export default StudentProfilePage;
