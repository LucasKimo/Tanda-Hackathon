import { useState } from 'react';
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { ArrowLeft, Download, Copy, Play, Square, Calendar, MapPin, Check } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { QRCodeSVG } from 'qrcode.react';
import type { Event, Participant, EventMatch, Save } from "../HostApp";

interface EventDetailProps {
  event: Event;
  participants: Participant[];
  matches: EventMatch[];
  saves: Save[];
  onBack: () => void;
  onUpdateStatus: (eventId: string, status: Event['status']) => void;
}

export function EventDetail({ 
  event, 
  participants, 
  matches, 
  saves, 
  onBack, 
  onUpdateStatus 
}: EventDetailProps) {
  const [copied, setCopied] = useState(false);
  
  const eventUrl = `https://event.network/join/${event.id}`;
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(eventUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadQR = () => {
    const svg = document.getElementById('event-qr-code');
    if (!svg) return;
    
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      
      const downloadLink = document.createElement('a');
      downloadLink.download = `${event.name}-QR.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  const handleStartEvent = () => {
    onUpdateStatus(event.id, 'live');
  };

  const handleEndEvent = () => {
    onUpdateStatus(event.id, 'ended');
  };

  // Calculate stats
  const totalJoined = participants.length;
  const profilesCompleted = participants.length; // Assume all completed
  const matchesSuggested = matches.length;
  const totalLikes = saves.length;
  const avgMatchesPerParticipant = totalJoined > 0 ? (matchesSuggested / totalJoined).toFixed(1) : '0';

  // Calculate top interests
  const interestCounts: Record<string, number> = {};
  participants.forEach(p => {
    p.interests.forEach(interest => {
      interestCounts[interest] = (interestCounts[interest] || 0) + 1;
    });
  });
  
  const topInterests = Object.entries(interestCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([name, count]) => ({ name, count }));

  const getStatusBadgeVariant = (status: Event['status']) => {
    switch (status) {
      case 'live':
        return 'default';
      case 'upcoming':
        return 'secondary';
      case 'ended':
        return 'outline';
    }
  };

  // Recent activity (mock for live events)
  const recentActivity = event.status === 'live' ? [
    { type: 'join', text: 'Ruby joined (Designer · AI, UX)', time: '2 min ago' },
    { type: 'match', text: 'Match created between Ruby & Alex', time: '3 min ago' },
    { type: 'save', text: 'Sam saved 3 profiles', time: '5 min ago' },
  ] : [];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <Button 
        variant="ghost" 
        onClick={onBack}
        className="mb-6"
      >
        <ArrowLeft className="size-4 mr-2" />
        Back to events
      </Button>

      <div className="mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="mb-2">{event.name}</h1>
            <div className="flex flex-wrap items-center gap-3 text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="size-4" />
                <span>{new Date(event.dateTime).toLocaleString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric',
                  hour: 'numeric', 
                  minute: '2-digit' 
                })}</span>
              </div>
              {event.location && (
                <>
                  <span>·</span>
                  <div className="flex items-center gap-2">
                    <MapPin className="size-4" />
                    <span>{event.location}</span>
                  </div>
                </>
              )}
            </div>
          </div>
          <Badge variant={getStatusBadgeVariant(event.status)}>
            {event.status === 'live' && '● '}
            {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* QR Code Section */}
        <Card className="p-6">
          <h3 className="mb-4">Event QR Code</h3>
          <div className="flex flex-col items-center">
            <div className="bg-white p-4 rounded-lg border-2 border-gray-200 mb-4">
              <QRCodeSVG
                id="event-qr-code"
                value={eventUrl}
                size={200}
                level="H"
              />
            </div>
            <p className="text-center text-gray-600 mb-4 break-all px-2">
              {eventUrl}
            </p>
            <div className="flex gap-2 w-full">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={handleDownloadQR}
              >
                <Download className="size-4 mr-2" />
                Download
              </Button>
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={handleCopyLink}
              >
                {copied ? (
                  <>
                    <Check className="size-4 mr-2" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="size-4 mr-2" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>

        {/* Controls Section */}
        <Card className="p-6 lg:col-span-2">
          <h3 className="mb-4">Event Controls</h3>
          
          {event.status === 'upcoming' && (
            <div>
              <p className="text-gray-600 mb-4">
                Start the event when participants begin arriving. This will activate live statistics and matching.
              </p>
              <Button onClick={handleStartEvent} className="w-full">
                <Play className="size-4 mr-2" />
                Start event
              </Button>
            </div>
          )}

          {event.status === 'live' && (
            <div>
              <p className="text-gray-600 mb-4">
                Event is currently live. Participants can join and connect. End the event when it's finished.
              </p>
              <Button onClick={handleEndEvent} variant="destructive" className="w-full">
                <Square className="size-4 mr-2" />
                End event
              </Button>
            </div>
          )}

          {event.status === 'ended' && (
            <div>
              <p className="text-gray-600">
                Event ended at {new Date(event.dateTime).toLocaleTimeString('en-US', { 
                  hour: 'numeric', 
                  minute: '2-digit' 
                })}
              </p>
              <p className="text-gray-600 mt-4">
                This event has ended. Use the stats below to plan your next event.
              </p>
            </div>
          )}
        </Card>
      </div>

      {/* Stats Section */}
      <div className="mb-6">
        <h3 className="mb-4">{event.status === 'live' ? 'Live Statistics' : 'Event Statistics'}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-6">
            <p className="text-gray-600 mb-2">Total joined</p>
            <p className="text-gray-900">{totalJoined}</p>
          </Card>
          <Card className="p-6">
            <p className="text-gray-600 mb-2">Profiles completed</p>
            <p className="text-gray-900">{profilesCompleted}</p>
          </Card>
          <Card className="p-6">
            <p className="text-gray-600 mb-2">Matches suggested</p>
            <p className="text-gray-900">{matchesSuggested}</p>
          </Card>
          <Card className="p-6">
            <p className="text-gray-600 mb-2">Likes / saves</p>
            <p className="text-gray-900">{totalLikes}</p>
          </Card>
        </div>
      </div>

      {event.status === 'live' && (
        <div className="mb-6">
          <Card className="p-6">
            <p className="text-gray-600 mb-2">Avg matches per participant</p>
            <p className="text-gray-900">{avgMatchesPerParticipant}</p>
          </Card>
        </div>
      )}

      {/* Top Interests Chart */}
      {topInterests.length > 0 && (
        <div className="mb-6">
          <Card className="p-6">
            <h3 className="mb-4">Top Interests</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topInterests}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>
      )}

      {/* Recent Activity - only show for live events */}
      {event.status === 'live' && recentActivity.length > 0 && (
        <div className="mb-6">
          <Card className="p-6">
            <h3 className="mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
                  <div className="flex-1">
                    <p className="text-gray-900">{activity.text}</p>
                    <p className="text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Participants Snapshot */}
      {participants.length > 0 && (
        <div>
          <Card className="p-6">
            <h3 className="mb-4">Participants Snapshot</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left pb-3 pr-4">Name</th>
                    <th className="text-left pb-3 pr-4">Role</th>
                    <th className="text-left pb-3">Interests</th>
                  </tr>
                </thead>
                <tbody>
                  {participants.slice(0, 5).map(participant => (
                    <tr key={participant.id} className="border-b border-gray-100 last:border-0">
                      <td className="py-3 pr-4">{participant.name}</td>
                      <td className="py-3 pr-4">{participant.role}</td>
                      <td className="py-3">
                        <div className="flex flex-wrap gap-1">
                          {participant.interests.map(interest => (
                            <span key={interest} className="px-2 py-1 bg-gray-100 rounded text-gray-700">
                              {interest}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {participants.length > 5 && (
              <p className="text-gray-600 mt-4">
                Showing 5 of {participants.length} participants
              </p>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}
