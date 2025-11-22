// src/HostApp.tsx
import React, { useState } from "react";
import { EventsOverview } from "./components/EventsOverview";
import { CreateEvent } from "./components/CreateEvent";
import { EventDetail } from "./components/EventDetail";
import "./hostindex.css";

export interface Event {
  id: string;
  name: string;
  dateTime: string;
  location: string;
  status: "upcoming" | "live" | "ended";
  interestTags: string[];
  eventType: string;
}

export interface Participant {
  id: string;
  eventId: string;
  name: string;
  role: string;
  interests: string[];
  createdAt: string;
}

export interface EventMatch {
  id: string;
  eventId: string;
  participantAId: string;
  participantBId: string;
  score: number;
}

export interface Save {
  id: string;
  eventId: string;
  fromParticipantId: string;
  toParticipantId: string;
}

// Mock data
const initialEvents: Event[] = [
  {
    id: "1",
    name: "AI & Design Mixer",
    dateTime: "2025-11-25T18:00",
    location: "TechHub Downtown",
    status: "upcoming",
    interestTags: ["AI", "Design", "Product"],
    eventType: "Tech networking",
  },
  {
    id: "2",
    name: "Startup Founders Meetup",
    dateTime: "2025-11-23T19:00",
    location: "Innovation Lab",
    status: "live",
    interestTags: ["Startups", "Product", "Business"],
    eventType: "Startup mixer",
  },
  {
    id: "3",
    name: "Student Tech Night",
    dateTime: "2025-11-20T17:00",
    location: "Campus Center",
    status: "ended",
    interestTags: ["Web dev", "AI", "Data"],
    eventType: "Student meetup",
  },
];

const initialParticipants: Participant[] = [
  {
    id: "p1",
    eventId: "2",
    name: "Ruby Chen",
    role: "Designer",
    interests: ["AI", "UX", "Design"],
    createdAt: "2025-11-23T19:15",
  },
  {
    id: "p2",
    eventId: "2",
    name: "Alex Kim",
    role: "Product Manager",
    interests: ["Product", "Startups", "AI"],
    createdAt: "2025-11-23T19:20",
  },
  {
    id: "p3",
    eventId: "2",
    name: "Sam Rivera",
    role: "Engineer",
    interests: ["Web dev", "AI", "Data"],
    createdAt: "2025-11-23T19:25",
  },
  {
    id: "p4",
    eventId: "2",
    name: "Jordan Lee",
    role: "Founder",
    interests: ["Startups", "Business", "Product"],
    createdAt: "2025-11-23T19:30",
  },
  {
    id: "p5",
    eventId: "2",
    name: "Taylor Wu",
    role: "Designer",
    interests: ["Design", "UX", "Product"],
    createdAt: "2025-11-23T19:35",
  },
  {
    id: "p6",
    eventId: "3",
    name: "Chris Park",
    role: "Student",
    interests: ["Web dev", "AI"],
    createdAt: "2025-11-20T17:10",
  },
  {
    id: "p7",
    eventId: "3",
    name: "Morgan Davis",
    role: "Student",
    interests: ["Data", "AI"],
    createdAt: "2025-11-20T17:15",
  },
];

const initialMatches: EventMatch[] = [
  { id: "m1", eventId: "2", participantAId: "p1", participantBId: "p2", score: 0.85 },
  { id: "m2", eventId: "2", participantAId: "p3", participantBId: "p4", score: 0.72 },
  { id: "m3", eventId: "2", participantAId: "p1", participantBId: "p5", score: 0.9 },
  { id: "m4", eventId: "3", participantAId: "p6", participantBId: "p7", score: 0.8 },
];

const initialSaves: Save[] = [
  { id: "s1", eventId: "2", fromParticipantId: "p3", toParticipantId: "p1" },
  { id: "s2", eventId: "2", fromParticipantId: "p3", toParticipantId: "p2" },
  { id: "s3", eventId: "2", fromParticipantId: "p3", toParticipantId: "p4" },
  { id: "s4", eventId: "2", fromParticipantId: "p1", toParticipantId: "p2" },
];

type View = "overview" | "create" | "detail";

export function HostApp() {
  const [currentView, setCurrentView] = useState<View>("overview");
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [participants] = useState<Participant[]>(initialParticipants);
  const [matches] = useState<EventMatch[]>(initialMatches);
  const [saves] = useState<Save[]>(initialSaves);

  const handleCreateEvent = (event: Omit<Event, "id">) => {
    const newEvent: Event = {
      ...event,
      id: Date.now().toString(),
    };
    setEvents([newEvent, ...events]);
    setCurrentView("overview");
  };

  const handleViewEvent = (eventId: string) => {
    setSelectedEventId(eventId);
    setCurrentView("detail");
  };

  const handleUpdateEventStatus = (eventId: string, status: Event["status"]) => {
    setEvents((prev) => prev.map((e) => (e.id === eventId ? { ...e, status } : e)));
  };

  const selectedEvent = events.find((e) => e.id === selectedEventId);

  return (
    <div className="min-h-screen bg-gray-50">
      {currentView === "overview" && (
        <EventsOverview
          events={events}
          onCreateNew={() => setCurrentView("create")}
          onViewEvent={handleViewEvent}
        />
      )}

      {currentView === "create" && (
        <CreateEvent
          onCreateEvent={handleCreateEvent}
          onCancel={() => setCurrentView("overview")}
        />
      )}

      {currentView === "detail" && selectedEvent && (
        <EventDetail
          event={selectedEvent}
          participants={participants.filter((p) => p.eventId === selectedEvent.id)}
          matches={matches.filter((m) => m.eventId === selectedEvent.id)}
          saves={saves.filter((s) => s.eventId === selectedEvent.id)}
          onBack={() => setCurrentView("overview")}
          onUpdateStatus={handleUpdateEventStatus}
        />
      )}
    </div>
  );
}

// Optional default export
export default HostApp;
