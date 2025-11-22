import { Sparkles, Target } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import type { Match } from '../AttendeeApp';

interface GetTalkingProps {
  matches: Match[];
  onSwipeAgain: () => void;
  onEditProfile: () => void;
  onViewSaved: () => void;
}

export function GetTalking({ matches, onSwipeAgain, onEditProfile, onViewSaved }: GetTalkingProps) {
  // Calculate total shared interests
  const totalSharedInterests = matches.reduce((acc, match) => {
    return acc + match.sharedInterests.length;
  }, 0);

  return (
    <div className="min-h-screen p-4 pb-20 relative z-10">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header with Emoji */}
        <div className="text-center space-y-4 pt-8">
          <div className="text-6xl">🎉</div>
          <div>
            <h1 className="neon-text bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
              Get Talking!
            </h1>
            <p className="text-white mt-2" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
              You've matched with {matches.length} awesome {matches.length === 1 ? 'person' : 'people'}
            </p>
          </div>
        </div>

        {/* Matches List */}
        {matches.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-white" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
              Your Matches
            </h2>
            
            <div className="space-y-3">
              {matches.map(match => (
                <div
                  key={match.id}
                  className="glass-card rounded-xl p-4 border border-purple-400/30 hover:border-purple-400/50 transition-all"
                >
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 via-violet-500 to-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
                      {match.profileImage ? (
                        <img 
                          src={match.profileImage} 
                          alt={match.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-white text-xl">{match.name.charAt(0)}</span>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0 space-y-2">
                      <h3 className="text-white" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                        {match.name}
                      </h3>

                      {/* Skills Description */}
                      <p className="text-slate-300 text-sm" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                        {match.skillsDescription || match.interests.join(', ')}
                      </p>

                      {/* Shared Interests Badges */}
                      <div className="flex flex-wrap gap-2">
                        {match.sharedInterests.slice(0, 3).map(interest => (
                          <Badge 
                            key={interest} 
                            className="bg-gradient-to-r from-purple-600 to-indigo-600 border-purple-400/50 text-white text-xs"
                          >
                            {interest}
                          </Badge>
                        ))}
                        {match.sharedInterests.length > 3 && (
                          <Badge className="bg-purple-500/20 border-purple-400/30 text-purple-200 text-xs">
                            +{match.sharedInterests.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Next Steps */}
        <div className="glass-card rounded-xl p-6 border border-cyan-400/30">
          <div className="flex items-start gap-3">
            <Target className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-cyan-200 mb-2">Next Steps:</h3>
              <p className="text-slate-300 text-sm" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                Start conversations with your matches and make meaningful connections at this event!
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            onClick={onViewSaved}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 border border-purple-400/30"
            size="lg"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            View Saved Profiles
          </Button>
          
          <div className="grid grid-cols-2 gap-3">
            <Button 
              onClick={onSwipeAgain}
              variant="outline"
              className="border-purple-400/30 text-white hover:bg-purple-500/20"
            >
              Swipe Again
            </Button>
            
            <Button 
              onClick={onEditProfile}
              variant="outline"
              className="border-slate-400/30 text-slate-300 hover:bg-slate-500/20"
            >
              Edit Profile
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="glass-card rounded-xl p-6 text-center border border-purple-400/20">
            <div className="text-4xl text-purple-300 mb-2">{matches.length}</div>
            <div className="text-slate-300 text-sm">Matches</div>
          </div>
          
          <div className="glass-card rounded-xl p-6 text-center border border-cyan-400/20">
            <div className="text-4xl text-cyan-300 mb-2">{totalSharedInterests}</div>
            <div className="text-slate-300 text-sm">Shared Interests</div>
          </div>
        </div>
      </div>
    </div>
  );
}