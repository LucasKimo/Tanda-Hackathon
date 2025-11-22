import { useState, useEffect } from 'react';
import { EventJoin } from './components/EventJoin';
import { ProfileSetup } from './components/ProfileSetup';
import { WaitingScreen } from './components/WaitingScreen';
import { PerfectMatch } from './components/PerfectMatch';
import { SwipeDeck } from './components/SwipeDeck';
import { SavedProfiles } from './components/SavedProfiles';
import { SavedProfilesList } from './components/SavedProfilesList';

export interface Profile {
  id: string;
  name: string;
  role: string;
  interests: string[];
  lookingFor: string;
  imageUrl?: string;
  profileImage?: string | null;
}

export interface Match extends Profile {
  score: number;
  sharedInterests: string[];
}

type Screen = 'join' | 'setup' | 'waiting' | 'perfect-match' | 'swipe' | 'saved' | 'saved-detail';

// Mock data for demonstration
const MOCK_PROFILES: Profile[] = [
  { 
    id: '2', 
    name: 'Sarah Chen', 
    role: 'Product Designer', 
    interests: ['Design', 'AI', 'Startups'], 
    lookingFor: 'Looking for a technical co-founder for my AI design tool startup',
    imageUrl: 'https://images.unsplash.com/photo-1761522002071-67755dc6c820?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc2Mzc2OTY3M3ww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  { 
    id: '3', 
    name: 'Marcus Johnson', 
    role: 'Full Stack Developer', 
    interests: ['AI', 'Startups', 'Web3'], 
    lookingFor: 'Seeking mentorship from experienced founders and potential collaborators',
    imageUrl: 'https://images.unsplash.com/photo-1737575655055-e3967cbefd03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZlbG9wZXIlMjBwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjM3Njk2NzR8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  { 
    id: '4', 
    name: 'Emily Rodriguez', 
    role: 'Marketing Manager', 
    interests: ['Growth', 'Startups', 'Content'], 
    lookingFor: 'Networking with startup founders who need growth marketing help',
    imageUrl: 'https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMHBvcnRyYWl0fGVufDF8fHx8MTc2Mzc2MjI4NXww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  { 
    id: '5', 
    name: 'David Kim', 
    role: 'Data Scientist', 
    interests: ['AI', 'Data', 'ML'], 
    lookingFor: 'Exploring job opportunities at early-stage AI companies',
    imageUrl: 'https://images.unsplash.com/photo-1752859951149-7d3fc700a7ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwcHJvZmVzc2lvbmFsJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYzNjc1MzgzfDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  { 
    id: '6', 
    name: 'Lisa Wang', 
    role: 'UX Researcher', 
    interests: ['Design', 'Psychology', 'Research'], 
    lookingFor: 'Partnership opportunities for user research projects',
    imageUrl: 'https://images.unsplash.com/photo-1689600944138-da3b150d9cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMHNtaWxlfGVufDF8fHx8MTc2MzczNDU1OHww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  { 
    id: '7', 
    name: 'Tom Bradley', 
    role: 'Startup Founder', 
    interests: ['Startups', 'Sales', 'Growth'], 
    lookingFor: 'Raising a seed round and connecting with potential investors',
    imageUrl: 'https://images.unsplash.com/photo-1758691737644-ef8be18256c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFydHVwJTIwZm91bmRlciUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MzcyMTE4Nnww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  { 
    id: '8', 
    name: 'Nina Patel', 
    role: 'Software Engineer', 
    interests: ['AI', 'Open Source', 'Developer Tools'], 
    lookingFor: 'Interested in contributing to open source AI projects and finding collaborators',
    imageUrl: 'https://images.unsplash.com/photo-1763025957629-4074f535d001?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnRyZXByZW5ldXIlMjBwb3J0cmFpdCUyMG91dGRvb3J8ZW58MXx8fHwxNzYzNzY5NjcyfDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
];

function calculateMatches(userProfile: Profile, allProfiles: Profile[]): Match[] {
  return allProfiles
    .map(profile => {
      const sharedInterests = profile.interests.filter(interest =>
        userProfile.interests.includes(interest)
      );
      let score = sharedInterests.length;

      // Bonus point for role keyword overlap
      const userRoleKeywords = userProfile.role.toLowerCase().split(' ');
      const profileRoleKeywords = profile.role.toLowerCase().split(' ');
      const hasRoleOverlap = userRoleKeywords.some(keyword =>
        profileRoleKeywords.some(pkeyword => keyword.includes(pkeyword) || pkeyword.includes(keyword))
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

export default function App() {
  const [screen, setScreen] = useState<Screen>('join');
  const [userProfile, setUserProfile] = useState<Profile | null>(null);
  const [roomProfiles, setRoomProfiles] = useState<Profile[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [savedProfiles, setSavedProfiles] = useState<Match[]>([]);
  const [mutualMatches, setMutualMatches] = useState<Match[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<Match | null>(null);
  const [eventName] = useState('Tech Mixer 2025');

  useEffect(() => {
    // Simulate people joining the room over time
    if (screen === 'waiting') {
      const interval = setInterval(() => {
        setRoomProfiles(prev => {
          if (prev.length < MOCK_PROFILES.length) {
            return [...prev, MOCK_PROFILES[prev.length]];
          }
          return prev;
        });
      }, 1500);

      // Auto-navigate to perfect match after 5 seconds or 5 people
      const timeout = setTimeout(() => {
        if (userProfile) {
          const calculatedMatches = calculateMatches(userProfile, roomProfiles);
          setMatches(calculatedMatches);
          setScreen('perfect-match');
        }
      }, 5000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [screen, roomProfiles, userProfile]);

  const handleJoin = () => {
    setScreen('setup');
  };

  const handleProfileComplete = (profile: Profile) => {
    setUserProfile(profile);
    setScreen('waiting');
  };

  const handlePerfectMatchSave = () => {
    if (matches[0]) {
      setSavedProfiles(prev => [...prev, matches[0]]);
    }
    setScreen('swipe');
  };

  const handlePerfectMatchSkip = () => {
    setScreen('swipe');
  };

  const handleSaveProfile = (match: Match) => {
    setSavedProfiles(prev => {
      if (!prev.find(p => p.id === match.id)) {
        return [...prev, match];
      }
      return prev;
    });
    
    // Simulate mutual match: 40% chance they also saved you
    if (Math.random() < 0.4) {
      setMutualMatches(prev => {
        if (!prev.find(p => p.id === match.id)) {
          return [...prev, match];
        }
        return prev;
      });
    }
  };

  const handleViewSaved = () => {
    setScreen('saved');
  };

  const handleBackToSwipe = () => {
    setScreen('swipe');
  };

  const handleViewProfile = (profile: Match) => {
    setSelectedProfile(profile);
    setScreen('saved-detail');
  };

  const handleBackToList = () => {
    setSelectedProfile(null);
    setScreen('saved');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {screen === 'join' && (
        <EventJoin eventName={eventName} onJoin={handleJoin} />
      )}
      {screen === 'setup' && (
        <ProfileSetup onComplete={handleProfileComplete} />
      )}
      {screen === 'waiting' && (
        <WaitingScreen peopleCount={roomProfiles.length} />
      )}
      {screen === 'perfect-match' && matches[0] && (
        <PerfectMatch
          match={matches[0]}
          onSave={handlePerfectMatchSave}
          onSkip={handlePerfectMatchSkip}
        />
      )}
      {screen === 'swipe' && (
        <SwipeDeck
          matches={matches.slice(1)}
          savedCount={savedProfiles.length}
          onSave={handleSaveProfile}
          onViewSaved={handleViewSaved}
        />
      )}
      {screen === 'saved' && (
        <SavedProfilesList
          savedProfiles={savedProfiles}
          mutualMatches={mutualMatches}
          onBack={handleBackToSwipe}
          onViewProfile={handleViewProfile}
        />
      )}
      {screen === 'saved-detail' && selectedProfile && (
        <SavedProfiles
          profile={selectedProfile}
          onBack={handleBackToList}
        />
      )}
    </div>
  );
}