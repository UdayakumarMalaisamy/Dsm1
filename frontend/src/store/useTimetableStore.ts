import { create } from "zustand";

export interface Course {
  id: number;
  time: string;
  class: string;
  day1: string;
  day2: string;
  day3: string;
  day4: string;
  day5: string;
}

interface TimetableStore {
  timetable: Course[];
  setTimetable: (data: Course[]) => void;
  updateCell: (
    id: number,
    day: keyof Omit<Course, "id" | "time" | "class">,
    value: string
  ) => void;
  addTimeSlot: (newCourse: Course) => void;
}

export const useTimetableStore = create<TimetableStore>((set) => ({
  timetable: [
    {
      id: 1,
      class: "I-CS",
      time: "9:00–10:00 AM",
      day1: "Maths",
      day2: "Physics",
      day3: "Chemistry",
      day4: "English",
      day5: "Computer",
    },
    {
      id: 2,
      class: "II-CS",
      time: "10:00–11:00 AM",
      day1: "DBMS",
      day2: "CN",
      day3: "OS",
      day4: "AI",
      day5: "ML",
    },
  ],
  setTimetable: (data) => set({ timetable: data }),
  updateCell: (id, day, value) =>
    set((state) => ({
      timetable: state.timetable.map((course) =>
        course.id === id ? { ...course, [day]: value } : course
      ),
    })),
  addTimeSlot: (newCourse) =>
    set((state) => ({
      timetable: [...state.timetable, newCourse],
    })),
}));
