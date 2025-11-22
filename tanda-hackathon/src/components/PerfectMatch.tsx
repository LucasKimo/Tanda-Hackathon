import { Sparkles, Heart, X } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import type { Match } from '../AttendeeApp';
import { getIcebreakerQuestions } from '../utils/icebreakers';

interface PerfectMatchProps {
  match: Match;
  onSave: () => void;
  onSkip: () => void;
}

export function PerfectMatch({ match, onSave, onSkip }: PerfectMatchProps) {
  const questions = getIcebreakerQuestions(match.interests).slice(0, 3);
  const matchPercentage = Math.min(100, match.score * 25);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-6 h-6 text-yellow-400" />
            <h2 className="neon-text bg-gradient-to-r from-purple-200 to-indigo-200 bg-clip-text text-transparent">Perfect Match</h2>
          </div>
          <p className="text-white" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>We think you'll really connect with this person</p>
        </div>

        <div className="glass-card rounded-2xl p-8 shadow-2xl space-y-6 neon-border">
          {/* Avatar */}
          <div className="w-24 h-24 bg-gradient-to-br from-purple-500 via-violet-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto neon-border overflow-hidden">
            {match.profileImage ? (
              <img 
                src={match.profileImage} 
                alt={match.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-white">{match.name.charAt(0)}</span>
            )}
          </div>

          {/* Profile Info */}
          <div className="text-center space-y-2">
            <h3 className="text-white" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>{match.name}</h3>
            <p className="text-slate-200" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>{match.role}</p>
          </div>

          {/* Match Score */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-white" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>Match Score</span>
              <span className="text-purple-300" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>{matchPercentage}%</span>
            </div>
            <div className="h-2 bg-slate-800/50 rounded-full overflow-hidden border border-purple-500/20">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-500"
                style={{ width: `${matchPercentage}%` }}
              />
            </div>
          </div>

          {/* Shared Interests */}
          {match.sharedInterests.length > 0 && (
            <div className="space-y-3">
              <p className="text-white" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                Shared Skills:
              </p>
              <div className="flex flex-wrap gap-2">
                {match.sharedInterests.map(interest => (
                  <Badge key={interest} className="bg-gradient-to-r from-purple-600 to-indigo-600 border-purple-400/50 text-white">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* All Skills */}
          <div className="space-y-3">
            <p className="text-white" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>Their skills:</p>
            <p className="text-slate-100" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>{match.skillsDescription || match.interests.join(', ')}</p>
          </div>

          {/* What they're looking for */}
          {match.lookingFor && (
            <div className="space-y-2 p-4 bg-indigo-500/10 border border-indigo-400/20 rounded-lg">
              <p className="text-white" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>What they're looking for:</p>
              <p className="text-slate-100" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>{match.lookingFor}</p>
            </div>
          )}

          {/* Icebreaker Questions */}
          {questions.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-purple-400/20">
              <p className="text-white" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>Ask them...</p>
              <ul className="space-y-2">
                {questions.map((question, index) => (
                  <li key={index} className="text-slate-100 flex gap-2" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                    <span className="text-purple-400">•</span>
                    <span>{question}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="lg"
            className="flex-1 border-red-400/40 text-red-300 hover:bg-red-500/20"
            onClick={onSkip}
          >
            <X className="w-5 h-5 mr-2" />
            Skip
          </Button>
          <Button
            size="lg"
            className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 border border-green-400/40 text-white"
            onClick={onSave}
          >
            <Heart className="w-5 h-5 mr-2" />
            Save & Continue
          </Button>
        </div>
      </div>
    </div>
  );
}