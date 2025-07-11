// src/store/useCalendarStore.ts
import { create } from "zustand";

export type EventType = "Holiday" | "Exam" | "Seminar" | "Class" | "Event";

export interface CalendarEvent {
  id: number;
  date: string;
  title: string;
  description: string;
  type: EventType;
}

interface CalendarState {
  events: CalendarEvent[];
  setEvents: (events: CalendarEvent[]) => void;
}

export const useCalendarStore = create<CalendarState>((set) => ({
  events: [
    {
      id: 1,
      date: "2025-01-26",
      title: "Republic Day",
      description: "National Holiday",
      type: "Holiday",
    },
    {
      id: 2,
      date: "2025-04-10",
      title: "Mid-Term Exam",
      description: "Semester 2 Midterm Exam",
      type: "Exam",
    },
    {
      id: 3,
      date: "2025-05-15",
      title: "Guest Lecture",
      description: "AI in Education - Prof. Sharma",
      type: "Seminar",
    },
  ],
  setEvents: (events) => set({ events }),
}));
