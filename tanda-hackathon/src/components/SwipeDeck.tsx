import { useState } from 'react';
import { Heart, X, Bookmark, Info } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import type { Match } from '../App';
import { getIcebreakerQuestions } from '../utils/icebreakers';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface SwipeDeckProps {
  matches: Match[];
  savedCount: number;
  onSave: (match: Match) => void;
  onViewSaved: () => void;
}

export function SwipeDeck({ matches, savedCount, onSave, onViewSaved }: SwipeDeckProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showInfo, setShowInfo] = useState(false);

  const currentMatch = matches[currentIndex];
  const hasMore = currentIndex < matches.length - 1;

  const handleSkip = () => {
    setShowInfo(false);
    if (hasMore) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSave = () => {
    if (currentMatch) {
      onSave(currentMatch);
    }
    setShowInfo(false);
    if (hasMore) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  if (!currentMatch) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-900">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <div className="space-y-2">
            <h2 className="text-white">You've seen everyone!</h2>
            <p className="text-gray-300">
              Check out your saved profiles to reconnect with people you liked.
            </p>
          </div>
          <Button size="lg" onClick={onViewSaved} className="bg-white text-gray-900 hover:bg-gray-100">
            View Saved Profiles ({savedCount})
          </Button>
        </div>
      </div>
    );
  }

  const questions = getIcebreakerQuestions(currentMatch.interests).slice(0, 3);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-900">
      <div className="max-w-md w-full h-[600px] relative">
        {/* Header */}
        <div className="absolute -top-16 left-0 right-0 flex justify-between items-center text-white z-10">
          <div>
            <p className="text-gray-300">
              {currentIndex + 1} of {matches.length}
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={onViewSaved}
            className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
          >
            <Bookmark className="w-4 h-4 mr-2" />
            Saved ({savedCount})
          </Button>
        </div>

        {/* Info Button */}
        <button
          onClick={() => setShowInfo(!showInfo)}
          className="absolute top-4 right-4 z-10 bg-gray-900/50 backdrop-blur-sm text-white p-2 rounded-full hover:bg-gray-900/70 transition-colors"
        >
          <Info className="w-5 h-5" />
        </button>

        {/* Card Stack */}
        <div className="relative h-full">
          {/* Background card (next card preview) */}
          {hasMore && (
            <div className="absolute inset-0 bg-white rounded-3xl shadow-lg transform scale-95 opacity-50" />
          )}

          {/* Current card */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl">
            {/* Background Image */}
            <div className="absolute inset-0">
              {currentMatch.imageUrl ? (
                <ImageWithFallback
                  src={currentMatch.imageUrl}
                  alt={currentMatch.name}
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
              <div className="pt-8 flex items-start gap-4">
                {currentMatch.profileImage && (
                  <img
                    src={currentMatch.profileImage}
                    alt={currentMatch.name}
                    className="w-16 h-16 rounded-full object-cover border-3 border-white shadow-lg flex-shrink-0"
                  />
                )}
                <div className="flex-1">
                  <h2 className="text-white">{currentMatch.name}</h2>
                  <p className="text-white/90 mt-1">{currentMatch.role}</p>
                </div>
              </div>

              {/* Bottom Info */}
              <div className="space-y-4">
                {/* Icebreaker Questions - Only show when info is toggled */}
                {showInfo && questions.length > 0 && (
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 space-y-2">
                    <p className="text-white">Ask them...</p>
                    <ul className="space-y-1">
                      {questions.map((question, index) => (
                        <li key={index} className="text-white/90 flex gap-2">
                          <span className="text-pink-400">•</span>
                          <span>{question}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* What they're looking for */}
                {currentMatch.lookingFor && (
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4">
                    <p className="text-white">{currentMatch.lookingFor}</p>
                  </div>
                )}

                {/* Interests */}
                <div className="flex flex-wrap gap-2">
                  {currentMatch.interests.map(interest => (
                    <Badge key={interest} className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="absolute -bottom-20 left-0 right-0 flex gap-6 justify-center">
          <Button
            variant="outline"
            size="lg"
            className="w-16 h-16 rounded-full bg-white border-2 border-gray-300 hover:bg-gray-100 hover:border-gray-400"
            onClick={handleSkip}
          >
            <X className="w-7 h-7 text-red-500" />
          </Button>
          <Button
            size="lg"
            className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 border-0"
            onClick={handleSave}
          >
            <Heart className="w-7 h-7 text-white" />
          </Button>
        </div>
      </div>
    </div>
  );
}