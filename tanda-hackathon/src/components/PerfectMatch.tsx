import { Sparkles, Heart, X, Info } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import type { Match } from '../App';
import { getIcebreakerQuestions } from '../utils/icebreakers';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface PerfectMatchProps {
  match: Match;
  onSave: () => void;
  onSkip: () => void;
}

export function PerfectMatch({ match, onSave, onSkip }: PerfectMatchProps) {
  const [showInfo, setShowInfo] = useState(false);
  const questions = getIcebreakerQuestions(match.interests).slice(0, 3);
  const matchPercentage = Math.min(100, match.score * 25);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-900">
      <div className="max-w-md w-full h-[600px] relative">
        {/* Perfect Match Badge */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 bg-yellow-400 text-gray-900 px-4 py-2 rounded-full shadow-lg">
          <Sparkles className="w-5 h-5" />
          <span>Perfect Match</span>
        </div>

        {/* Info Button */}
        <button
          onClick={() => setShowInfo(!showInfo)}
          className="absolute top-4 right-4 z-10 bg-gray-900/50 backdrop-blur-sm text-white p-2 rounded-full hover:bg-gray-900/70 transition-colors"
        >
          <Info className="w-5 h-5" />
        </button>

        {/* Main Card */}
        <div className="relative h-full rounded-3xl overflow-hidden shadow-2xl">
          {/* Background Image */}
          <div className="absolute inset-0">
            {match.imageUrl ? (
              <ImageWithFallback
                src={match.imageUrl}
                alt={match.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-purple-400 to-blue-400" />
            )}
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/40 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative h-full flex flex-col justify-between p-6 text-white">
            {/* Top Info */}
            <div className="pt-12 flex items-start gap-4">
              {match.profileImage && (
                <img
                  src={match.profileImage}
                  alt={match.name}
                  className="w-16 h-16 rounded-full object-cover border-3 border-white shadow-lg flex-shrink-0"
                />
              )}
              <div className="flex-1">
                <h2 className="text-white">{match.name}</h2>
                <p className="text-white/90 mt-1">{match.role}</p>
              </div>
            </div>

            {/* Bottom Info */}
            <div className="space-y-4">
              {/* Match Score - Only show when info is toggled */}
              {showInfo && (
                <div className="space-y-2 bg-white/10 backdrop-blur-md rounded-2xl p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white/90">Match Score</span>
                    <span className="text-yellow-400">{matchPercentage}%</span>
                  </div>
                  <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400 transition-all duration-500"
                      style={{ width: `${matchPercentage}%` }}
                    />
                  </div>
                  {match.sharedInterests.length > 0 && (
                    <div className="mt-3">
                      <p className="text-white/90">You both selected:</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {match.sharedInterests.map(interest => (
                          <Badge key={interest} className="bg-yellow-400/20 text-yellow-400 border-yellow-400/30">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* What they're looking for */}
              {match.lookingFor && (
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4">
                  <p className="text-white">{match.lookingFor}</p>
                </div>
              )}

              {/* Interests */}
              <div className="flex flex-wrap gap-2">
                {match.interests.map(interest => (
                  <Badge key={interest} className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                    {interest}
                  </Badge>
                ))}
              </div>

              {/* Icebreaker Questions - Only show when info is toggled */}
              {showInfo && questions.length > 0 && (
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 space-y-2">
                  <p className="text-white">Ask them...</p>
                  <ul className="space-y-1">
                    {questions.map((question, index) => (
                      <li key={index} className="text-white/90 flex gap-2">
                        <span className="text-yellow-400">•</span>
                        <span>{question}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="absolute -bottom-20 left-0 right-0 flex gap-6 justify-center">
          <Button
            variant="outline"
            size="lg"
            className="w-16 h-16 rounded-full bg-white border-2 border-gray-300 hover:bg-gray-100 hover:border-gray-400"
            onClick={onSkip}
          >
            <X className="w-7 h-7 text-red-500" />
          </Button>
          <Button
            size="lg"
            className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 border-0"
            onClick={onSave}
          >
            <Heart className="w-7 h-7 text-white" />
          </Button>
        </div>
      </div>
    </div>
  );
}