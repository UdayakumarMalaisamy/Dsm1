"use client";

import {
  Users,
  Calendar,
  UserCheck,
  GraduationCap,
  UserX,
  User,
  UserX2,
} from "lucide-react";

type UserRole = "admin" | "teacher" | "student" | "parent";

export interface CalendarEvent {
  id: number;
  title: string;
  date: string;
  description: string;
  type: string;
}

interface OverviewProps {
  userRole: UserRole;
  todayEvents: CalendarEvent[];
}

export default function Overview({ userRole, todayEvents }: OverviewProps) {
  const totalStudents = 3;
  const totalParents = 3;
  const totalTeachers = 5;
  const absentTeachers = 1;

  const presentToday = 2;
  const absentToday = 1;
  const attendanceRate = Math.round((presentToday / totalStudents) * 100);

  const getDashboardCards = () => {
    const baseCards = [
      {
        title: "Total Students",
        value: totalStudents.toString(),
        description: "Enrolled students",
        icon: GraduationCap,
        color: "text-blue-600",
        bg: "bg-blue-100",
      },
      {
        title: "Present Today",
        value: presentToday.toString(),
        description: `${attendanceRate}% attendance rate`,
        icon: UserCheck,
        color: "text-green-600",
        bg: "bg-green-100",
      },
      {
        title: "Absent Today",
        value: absentToday.toString(),
        description: "Students absent",
        icon: UserX,
        color: "text-red-600",
        bg: "bg-red-100",
      },
      {
        title: "Today's Events",
        value: todayEvents.length.toString(),
        description: "Until tonight",
        icon: Calendar,
        color: "text-purple-600",
        bg: "bg-purple-100",
      },
      {
        title: "Total Teachers",
        value: totalTeachers.toString(),
        description: "Faculty members",
        icon: User,
        color: "text-amber-600",
        bg: "bg-amber-100",
      },
      {
        title: "Absent Teachers",
        value: absentTeachers.toString(),
        description: "Teachers not present today",
        icon: UserX2,
        color: "text-rose-600",
        bg: "bg-rose-100",
      },
    ];

    if (userRole === "admin") {
      baseCards.push({
        title: "Total Parents",
        value: totalParents.toString(),
        description: "Registered parents",
        icon: Users,
        color: "text-orange-600",
        bg: "bg-orange-100",
      });
    }

    return baseCards;
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-50 w-full">
      {/* Header */}
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">
            Dashboard Overview
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Welcome back! Here’s what’s happening today.
          </p>
        </div>
        <span className="capitalize bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-lg text-center sm:min-w-[100px]">
          {userRole}
        </span>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {getDashboardCards().map((card, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-xl p-4 shadow hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between">
              <h4 className="text-gray-700 text-sm font-medium">{card.title}</h4>
              <div className={`p-2 rounded-full ${card.bg}`}>
                <card.icon className={`w-5 h-5 ${card.color}`} />
              </div>
            </div>
            <div className="mt-2 text-2xl font-bold text-gray-900">{card.value}</div>
            <p className="text-xs text-gray-500">{card.description}</p>
          </div>
        ))}
      </div>

      {/* Today Activity */}
      <div className="mt-10 bg-white border border-gray-200 p-5 rounded-xl shadow hover:shadow-md transition-all">
        <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">
          Today’s Events
        </h2>
        {todayEvents.length > 0 ? (
          <ul className="space-y-3 text-sm text-gray-700">
            {todayEvents.map((event) => (
              <li key={event.id} className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full" />
                {event.title} ({event.type}) - {event.date}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No events scheduled for today.</p>
        )}
      </div>
    </div>
  );
}
