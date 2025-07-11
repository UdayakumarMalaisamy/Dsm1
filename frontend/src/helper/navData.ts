import {
  Home,
  Users,
  CalendarClock,
  UserCheck,
  ClipboardList,
  FileText,
  File,
  Calendar,
  BookOpen,
  UserPlus,
  User,
} from "lucide-react";

const navData = [
  {
    title: "Dashboard",
    link: "/dashboard",
    icon: Home,
    role: ["admin", "teacher", "student", "parent"],
  },
  {
    title: "Teachers",
    link: "/teachers",
    icon: Users,
    role: ["admin", "parent"],
  },
  {
    title: "Timetable",
    link: "/timetable",
    icon: CalendarClock,
    role: ["admin", "teacher", "student", "parent"],
  },
  {
    title: "Students",
    link: "/students",
    icon: UserCheck,
    role: ["teacher", "admin"],
  },
  {
    title: "Attendance",
    link: "/attendance",
    icon: ClipboardList,
    role: ["teacher"],
  },
  {
    title: "Tasks",
    link: "/task",
    icon: FileText,
    role: ["teacher", "student"]
  },
  {
    title: "Results",
    link: "/result",
    icon: BookOpen,
    role: ["teacher", "student"],
  },
  {
    title: "Calendar",
    link: "/calendar",
    icon: Calendar,
    role: ["admin", "teacher", "student", "parent"],
  },
  {
    title: "Parents",
    link: "/parents",
    icon: UserPlus,
    role: ["admin", "teacher"],
  },
  {
    title: "Register",
    link: "/register",
    icon: File,
    role: ["admin"],
  },
  {
    title: "User Management",
    link: "/user-management",
    icon: Users,
    role: ["admin"],
  },
  {
    title: "Profile", // ✅ New entry
    link: "/student-profile",
    icon: User,
    role: ["student"],
  },
];

export default navData;
