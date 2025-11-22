import { useState } from "react";
import { Calendar, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import type { Event } from "../HostApp";

type Filter = "upcoming" | "live" | "ended";

interface EventsOverviewProps {
  events: Event[];
  onCreateNew: () => void;
  onViewEvent: (id: string) => void;
}

export function EventsOverview({
  events,
  onCreateNew,
  onViewEvent,
}: EventsOverviewProps) {
  const [filter, setFilter] = useState<Filter>("upcoming");

  const upcomingCount = events.filter((e) => e.status === "upcoming").length;
  const liveCount = events.filter((e) => e.status === "live").length;

  const filteredEvents = events.filter((e) =>
    filter === "ended" ? e.status === "ended" : e.status === filter
  );

  return (
    <div className="max-w-5xl mx-auto p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="mb-2">Events</h1>
          <p className="text-muted-foreground">
            Manage your networking events and view live statistics
          </p>
        </div>
        <Button onClick={onCreateNew}>
          + <span className="ml-2">Create new event</span>
        </Button>
      </div>

      {/* Tabs */}
      <div className="inline-flex items-center gap-1 rounded-full bg-muted p-1 mb-8">
        <button
          type="button"
          onClick={() => setFilter("upcoming")}
          className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${
            filter === "upcoming"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground"
          }`}
        >
          <span>Upcoming</span>
          <span className="inline-flex items-center justify-center rounded-full bg-secondary px-2 text-xs">
            {upcomingCount}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setFilter("live")}
          className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${
            filter === "live"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground"
          }`}
        >
          <span>Live</span>
          <span className="inline-flex items-center justify-center rounded-full bg-secondary px-2 text-xs">
            {liveCount}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setFilter("ended")}
          className={`px-3 py-1 rounded-full text-sm ${
            filter === "ended"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground"
          }`}
        >
          Past
        </button>
      </div>

      {/* Event cards */}
      <div className="space-y-4">
        {filteredEvents.map((event) => (
          <Card
            key={event.id}
            className="max-w-md shadow-md border border-gray-200"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3>{event.name}</h3>
                <Badge variant="secondary" className="capitalize">
                  {event.status === "ended" ? "Ended" : event.status}
                </Badge>
              </div>

              <div className="flex flex-col gap-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="size-4" />
                  <span>
                    {new Date(event.dateTime).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                {event.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="size-4" />
                    <span>{event.location}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {event.interestTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs rounded-md bg-gray-100 text-gray-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => onViewEvent(event.id)}
              >
                Open
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}