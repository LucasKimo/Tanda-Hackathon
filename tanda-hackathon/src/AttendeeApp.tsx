// src/AttendeeApp.tsx
import React, { useState, useEffect } from "react";
import { EventJoin } from "./components/EventJoin";
import { ProfileSetup } from "./components/ProfileSetup";
import { WaitingScreen } from "./components/WaitingScreen";
import { PerfectMatch } from "./components/PerfectMatch";
import { SwipeDeck } from "./components/SwipeDeck";
import { SavedProfiles } from "./components/SavedProfiles";
import "./index.css";

export interface Profile {
  id: string;
  name: string;
  role: string;
  interests: string[];
  lookingFor: string;
  profileImage?: string | null;
}

export interface Match extends Profile {
  score: number;
  sharedInterests: string[];
}

type Screen = "join" | "setup" | "waiting" | "perfect-match" | "swipe" | "saved";

// Mock data for demonstration
const MOCK_PROFILES: Profile[] = [
  {
    id: "2",
    name: "Sarah Chen",
    role: "Product Designer",
    interests: ["Design", "AI", "Startups"],
    lookingFor: "Looking for a technical co-founder for my AI design tool startup",
  },
  {
    id: "3",
    name: "Marcus Johnson",
    role: "Full Stack Developer",
    interests: ["AI", "Startups", "Web3"],
    lookingFor: "Seeking mentorship from experienced founders and potential collaborators",
  },
  {
    id: "4",
    name: "Emily Rodriguez",
    role: "Marketing Manager",
    interests: ["Growth", "Startups", "Content"],
    lookingFor: "Networking with startup founders who need growth marketing help",
  },
  {
    id: "5",
    name: "David Kim",
    role: "Data Scientist",
    interests: ["AI", "Data", "ML"],
    lookingFor: "Exploring job opportunities at early-stage AI companies",
  },
  {
    id: "6",
    name: "Lisa Wang",
    role: "UX Researcher",
    interests: ["Design", "Psychology", "Research"],
    lookingFor: "Partnership opportunities for user research projects",
  },
  {
    id: "7",
    name: "Tom Bradley",
    role: "Startup Founder",
    interests: ["Startups", "Sales", "Growth"],
    lookingFor: "Raising a seed round and connecting with potential investors",
  },
  {
    id: "8",
    name: "Nina Patel",
    role: "Software Engineer",
    interests: ["AI", "Open Source", "Developer Tools"],
    lookingFor: "Interested in contributing to open source AI projects and finding collaborators",
  },
];

function calculateMatches(userProfile: Profile, allProfiles: Profile[]): Match[] {
  return allProfiles
    .map<Match>((profile) => {
      const sharedInterests = profile.interests.filter((interest) =>
        userProfile.interests.includes(interest)
      );

      let score = sharedInterests.length;

      // Bonus point for role keyword overlap
      const userRoleKeywords = userProfile.role.toLowerCase().split(" ");
      const profileRoleKeywords = profile.role.toLowerCase().split(" ");
      const hasRoleOverlap = userRoleKeywords.some((keyword) =>
        profileRoleKeywords.some(
          (pkeyword) => keyword.includes(pkeyword) || pkeyword.includes(keyword)
        )
      );
      if (hasRoleOverlap) score += 1;

      return {
        ...profile,
        score,
        sharedInterests,
      };
    })
    .sort((a, b) => b.score - a.score);
}

export function AttendeeApp() {
  const [screen, setScreen] = useState<Screen>("join");
  const [userProfile, setUserProfile] = useState<Profile | null>(null);
  const [roomProfiles, setRoomProfiles] = useState<Profile[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [savedProfiles, setSavedProfiles] = useState<Match[]>([]);
  const [eventName] = useState("Tech Mixer 2025");

  useEffect(() => {
    if (screen === "waiting") {
      const interval = setInterval(() => {
        setRoomProfiles((prev) => {
          if (prev.length < MOCK_PROFILES.length) {
            return [...prev, MOCK_PROFILES[prev.length]];
          }
          return prev;
        });
      }, 1500);

      const timeout = setTimeout(() => {
        if (userProfile) {
          const calculatedMatches = calculateMatches(userProfile, roomProfiles);
          setMatches(calculatedMatches);
          setScreen("perfect-match");
        }
      }, 5000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [screen, roomProfiles, userProfile]);

  const handleJoin = () => {
    setScreen("setup");
  };

  const handleProfileComplete = (profile: Profile) => {
    setUserProfile(profile);
    setScreen("waiting");
  };

  const handlePerfectMatchSave = () => {
    if (matches[0]) {
      setSavedProfiles((prev) => [...prev, matches[0]]);
    }
    setScreen("swipe");
  };

  const handlePerfectMatchSkip = () => {
    setScreen("swipe");
  };

  const handleSaveProfile = (match: Match) => {
    setSavedProfiles((prev) => {
      if (!prev.find((p) => p.id === match.id)) {
        return [...prev, match];
      }
      return prev;
    });
  };

  const handleViewSaved = () => {
    setScreen("saved");
  };

  const handleBackToSwipe = () => {
    setScreen("swipe");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {screen === "join" && (
        <EventJoin eventName={eventName} onJoin={handleJoin} />
      )}
      {screen === "setup" && (
        <ProfileSetup onComplete={handleProfileComplete} />
      )}
      {screen === "waiting" && (
        <WaitingScreen peopleCount={roomProfiles.length} />
      )}
      {screen === "perfect-match" && matches[0] && (
        <PerfectMatch
          match={matches[0]}
          onSave={handlePerfectMatchSave}
          onSkip={handlePerfectMatchSkip}
        />
      )}
      {screen === "swipe" && (
        <SwipeDeck
          matches={matches.slice(1)}
          savedCount={savedProfiles.length}
          onSave={handleSaveProfile}
          onViewSaved={handleViewSaved}
        />
      )}
      {screen === "saved" && (
        <SavedProfiles profiles={savedProfiles} onBack={handleBackToSwipe} />
      )}
    </div>
  );
}

// Optional: keep default export for convenience
export default AttendeeApp;
