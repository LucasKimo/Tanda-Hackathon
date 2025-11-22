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
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-6 h-6 text-yellow-500" />
            <h2 className="text-gray-900">Perfect Match</h2>
          </div>
          <p className="text-gray-600">We think you'll really connect with this person</p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-xl space-y-6">
{/* Avatar */}
<div className="w-24 h-24 rounded-full mx-auto overflow-hidden bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center">
  {match.profileImage ? (
    <img
      src={match.profileImage}
      alt={match.name}
      className="w-full h-full object-cover"
    />
  ) : (
    <span className="text-white text-2xl">
      {match.name.charAt(0)}
    </span>
  )}
</div>

          {/* Profile Info */}
          <div className="text-center space-y-2">
            <h3 className="text-gray-900">{match.name}</h3>
            <p className="text-gray-600">{match.role}</p>
          </div>

          {/* Match Score */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Match Score</span>
              <span className="text-purple-600">{matchPercentage}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500"
                style={{ width: `${matchPercentage}%` }}
              />
            </div>
          </div>

          {/* Shared Interests */}
          {match.sharedInterests.length > 0 && (
            <div className="space-y-3">
              <p className="text-gray-600">You both selected:</p>
              <div className="flex flex-wrap gap-2">
                {match.sharedInterests.map(interest => (
                  <Badge key={interest} variant="secondary">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* All Interests */}
          <div className="space-y-3">
            <p className="text-gray-600">Their interests:</p>
            <div className="flex flex-wrap gap-2">
              {match.interests.map(interest => (
                <Badge key={interest} variant="outline">
                  {interest}
                </Badge>
              ))}
            </div>
          </div>

          {/* What they're looking for */}
          {match.lookingFor && (
            <div className="space-y-2 p-4 bg-blue-50 rounded-lg">
              <p className="text-gray-900">What they're looking for:</p>
              <p className="text-gray-700">{match.lookingFor}</p>
            </div>
          )}

          {/* Icebreaker Questions */}
          {questions.length > 0 && (
            <div className="space-y-3 pt-4 border-t">
              <p className="text-gray-900">Ask them...</p>
              <ul className="space-y-2">
                {questions.map((question, index) => (
                  <li key={index} className="text-gray-600 flex gap-2">
                    <span className="text-purple-500">•</span>
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
            className="flex-1"
            onClick={onSkip}
          >
            <X className="w-5 h-5 mr-2" />
            Skip
          </Button>
          <Button
            size="lg"
            className="flex-1"
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