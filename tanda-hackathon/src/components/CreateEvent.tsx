import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import type { Event } from "../HostApp";

interface CreateEventProps {
  onCreateEvent: (event: Omit<Event, "id">) => void;
  onCancel: () => void;
}

const AVAILABLE_INTERESTS = [
  "AI",
  "Design",
  "Product",
  "Data",
  "Startups",
  "Web dev",
  "Mobile",
  "UX",
  "Business",
  "Marketing",
  "Sales",
  "Engineering",
];

const EVENT_TYPES = ["Tech networking", "Startup mixer", "Student meetup"];

export function CreateEvent({ onCreateEvent, onCancel }: CreateEventProps) {
  const [eventName, setEventName] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [location, setLocation] = useState("");
  const [eventType, setEventType] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!eventName || !dateTime || !eventType || selectedInterests.length === 0) {
      alert("Please fill in all required fields");
      return;
    }

    onCreateEvent({
      name: eventName,
      dateTime,
      location,
      status: "upcoming",
      interestTags: selectedInterests,
      eventType,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-6 py-10">
        {/* Back link */}
        <Button
          variant="ghost"
          onClick={onCancel}
          className="mb-6 px-0 text-gray-600 hover:bg-transparent hover:text-gray-900"
        >
          <ArrowLeft className="size-4 mr-2" />
          Back to events
        </Button>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8 md:p-10">
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-1">
              Create new event
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Event name */}
            <div>
              <Label htmlFor="eventName" className="text-gray-900">
                Event name *
              </Label>
              <Input
                id="eventName"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                placeholder="e.g. AI & Design Mixer"
                className="mt-2 bg-gray-100 border-transparent hover:border-gray-300 focus-visible:border-gray-300"
                required
              />
            </div>

            {/* Date & time */}
            <div>
              <Label htmlFor="dateTime" className="text-gray-900">
                Event date &amp; time *
              </Label>
              <Input
                id="dateTime"
                type="datetime-local"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                className="mt-2 bg-gray-100 border-transparent hover:border-gray-300 focus-visible:border-gray-300"
                required
              />
            </div>

            {/* Location */}
            <div>
              <Label htmlFor="location" className="text-gray-900">
                Location
              </Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. TechHub Downtown"
                className="mt-2 bg-gray-100 border-transparent hover:border-gray-300 focus-visible:border-gray-300"
              />
            </div>

            {/* Event type */}
            <div>
              <Label htmlFor="eventType" className="text-gray-900">
                Event type *
              </Label>
              <Select value={eventType} onValueChange={setEventType}>
                <SelectTrigger className="mt-2 bg-gray-100 border-transparent hover:border-gray-300 focus-visible:border-gray-300">
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  {EVENT_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Interests */}
            <div>
              <Label className="text-gray-900">Default interests *</Label>
              <p className="text-sm text-gray-600 mt-1 mb-3">
                Select interests that participants can choose from
              </p>
              <div className="flex flex-wrap gap-2">
                {AVAILABLE_INTERESTS.map((interest) => {
                  const selected = selectedInterests.includes(interest);
                  return (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => toggleInterest(interest)}
                      className={`px-4 py-2 rounded-full border text-sm transition-colors ${
                        selected
                          ? "bg-gray-900 text-white border-gray-900"
                          : "bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      {interest}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="sm:w-32"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Create event
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
