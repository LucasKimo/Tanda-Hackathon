import { useState, useEffect } from 'react';
import { EventJoin } from './components/EventJoin';
import { ProfileSetup } from './components/ProfileSetup';
import { WaitingScreen } from './components/WaitingScreen';
import { PerfectMatch } from './components/PerfectMatch';
import { SwipeDeck } from './components/SwipeDeck';
import { SavedProfiles } from './components/SavedProfiles';

export interface Profile {
  id: string;
  name: string;
  role: string;
  interests: string[];
  lookingFor: string;
  profileImage?: string | null;
  skillsDescription?: string; // Full text description of skills
}

export interface Match extends Profile {
  score: number;
  sharedInterests: string[];
}

type Screen = 'join' | 'setup' | 'waiting' | 'perfect-match' | 'swipe' | 'saved';
const MOCK_PROFILES: Profile[] = [
  { 
    id: '2', 
    name: 'Joyanne', 
    role: 'Year 2 Computer Science (Intelligent Systems minor)', 
    interests: ['Intelligent Systems', 'Frontend Development', 'Hackathons'], 
    skillsDescription: 'Next.js, React, Tailwind, FastAPI',
    lookingFor: 'Looking for teammates to build an AI-powered project (open to ideas!).',
    profileImage: '/members/joyanne.jpg'
  },
  { 
    id: '3', 
    name: 'Andrew', 
    role: 'Final Year Computer Science (QUT)', 
    interests: ['Full Stack', 'Cloud', 'Hackathons'], 
    skillsDescription: 'TypeScript, React, Node.js, MongoDB, AWS',
    lookingFor: 'Looking for a team to ship a full-stack hackathon project (bonus if you love pizza).',
    profileImage: '/members/andrew.jpg'
  },
  { 
    id: '4', 
    name: 'Adyn', 
    role: '3rd Year Mathematics & Computer Science', 
    interests: ['Applied Mathematics', 'Full Stack', 'Dev Tools'], 
    skillsDescription: 'Applied mathematics, TypeScript, React, .NET, Python, HIT, Octopus Deploy, TailwindCSS',
    lookingFor: 'Teammates keen on data-heavy or optimisation-type problems.',
    profileImage: '/members/Adyn.jpg'
  },
  { 
    id: '5', 
    name: 'Rudra', 
    role: 'Aspiring DevOps & System Administrator', 
    interests: ['DevOps', 'System Administration', 'Infrastructure'], 
    skillsDescription: 'Linux, Docker, Kubernetes, Istio, Grafana, Terraform',
    lookingFor: 'Looking for teammates interested in scalable infra and platform tooling.',
    profileImage: '/members/rudra.jpg'
  },
  { 
    id: '6', 
    name: 'Will', 
    role: '2nd Year IT / Computer Science (QUT)', 
    interests: ['Backend Development', 'AI/ML', 'Hackathons'], 
    skillsDescription: 'Tailwind, Python, Flask, OpenAI',
    lookingFor: 'Someone who has appealing ideas and wants to build something fun quickly.',
    profileImage: '/members/will.jpg'
  },
  { 
    id: '7', 
    name: 'Daniel', 
    role: '2nd Year Startup Founder', 
    interests: ['Entrepreneurship', 'Product', 'Operations'], 
    skillsDescription: 'Early-stage startup building, customer discovery, operations (McDonald’s).',
    lookingFor: 'Technical teammates to build and iterate on startup ideas fast.',
    profileImage: '/members/daniel.jpg'
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
  const [eventName] = useState('Tanda Hackathon');

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
          setScreen('swipe'); // Skip perfect match, go directly to swipe
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
  };

  const handleViewSaved = () => {
    setScreen('saved');
  };

  const handleBackToSwipe = () => {
    setScreen('swipe');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      
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
          matches={matches}
          savedCount={savedProfiles.length}
          savedMatches={savedProfiles}
          onSave={handleSaveProfile}
          onViewSaved={handleViewSaved}
          onEditProfile={() => setScreen('setup')}
        />
      )}
      {screen === 'saved' && (
        <SavedProfiles
          profiles={savedProfiles}
          allProfiles={roomProfiles}
          userProfile={userProfile!}
          onBack={handleBackToSwipe}
        />
      )}
    </div>
  );
}