import { useState } from 'react';
import { Heart, X, Bookmark, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import type { Match } from '../AttendeeApp';
import { getIcebreakerQuestions } from '../utils/icebreakers';

interface SwipeDeckProps {
  matches: Match[];
  savedCount: number;
  onSave: (match: Match) => void;
  onViewSaved: () => void;
}

export function SwipeDeck({ matches, savedCount, onSave, onViewSaved }: SwipeDeckProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showQuestions, setShowQuestions] = useState(false);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  const currentMatch = matches[currentIndex];
  const hasMore = currentIndex < matches.length - 1;

  const handleSkip = () => {
    setShowQuestions(false);
    if (hasMore) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSave = () => {
    if (currentMatch) {
      onSave(currentMatch);
    }
    setShowQuestions(false);
    if (hasMore) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const offset = currentX - startX;
    setSwipeOffset(offset);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    const threshold = 100; // pixels to trigger swipe

    if (swipeOffset > threshold) {
      // Swipe right - save
      handleSave();
    } else if (swipeOffset < -threshold) {
      // Swipe left - skip
      handleSkip();
    }
    
    setSwipeOffset(0);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const offset = e.clientX - startX;
    setSwipeOffset(offset);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    const threshold = 100;

    if (swipeOffset > threshold) {
      handleSave();
    } else if (swipeOffset < -threshold) {
      handleSkip();
    }
    
    setSwipeOffset(0);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      setSwipeOffset(0);
    }
  };

  if (!currentMatch) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <div className="space-y-2">
            <h2 className="text-gray-900">You've seen everyone!</h2>
            <p className="text-gray-600">
              Check out your saved profiles to reconnect with people you liked.
            </p>
          </div>
          <Button size="lg" onClick={onViewSaved}>
            View Saved Profiles ({savedCount})
          </Button>
        </div>
      </div>
    );
  }

  const questions = getIcebreakerQuestions(currentMatch.interests).slice(0, 3);

  // Calculate rotation and opacity for swipe animation
  const rotation = swipeOffset / 20;
  const opacity = Math.max(0.5, 1 - Math.abs(swipeOffset) / 200);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <div className="max-w-md w-full space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-gray-900">Discover</h2>
            <p className="text-gray-600">
              {currentIndex + 1} of {matches.length}
            </p>
          </div>
          <Button variant="outline" onClick={onViewSaved}>
            <Bookmark className="w-4 h-4 mr-2" />
            Saved ({savedCount})
          </Button>
        </div>

        {/* Card Stack */}
        <div className="relative h-[500px]">
          {/* Background card (next card preview) */}
          {hasMore && (
            <div className="absolute inset-0 bg-white rounded-2xl shadow-lg transform scale-95 opacity-50" />
          )}

          {/* Current card */}
          <div 
            className="absolute inset-0 bg-white rounded-2xl shadow-xl overflow-hidden cursor-grab active:cursor-grabbing select-none" 
            style={{ 
              transform: `translateX(${swipeOffset}px) rotate(${rotation}deg)`, 
              opacity: opacity,
              transition: isDragging ? 'none' : 'transform 0.3s ease, opacity 0.3s ease'
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
          >
            {/* Swipe Indicators */}
            {swipeOffset > 0 && (
              <div 
                className="absolute top-8 left-8 bg-green-500 text-white px-6 py-3 rounded-lg rotate-12 z-10"
                style={{ opacity: Math.min(1, swipeOffset / 100) }}
              >
                <Heart className="w-8 h-8" />
              </div>
            )}
            {swipeOffset < 0 && (
              <div 
                className="absolute top-8 right-8 bg-red-500 text-white px-6 py-3 rounded-lg -rotate-12 z-10"
                style={{ opacity: Math.min(1, Math.abs(swipeOffset) / 100) }}
              >
                <X className="w-8 h-8" />
              </div>
            )}

            <div className="h-full flex flex-col">
              {/* Avatar Section */}
              <div className="bg-gradient-to-br from-purple-400 to-blue-400 h-48 flex items-center justify-center">
                <span className="text-white">{currentMatch.name.charAt(0)}</span>
              </div>

              {/* Content Section */}
              <div className="flex-1 p-6 space-y-4 overflow-y-auto">
                <div>
                  <h3 className="text-gray-900">{currentMatch.name}</h3>
                  <p className="text-gray-600">{currentMatch.role}</p>
                </div>

                {/* What they're looking for */}
                {currentMatch.lookingFor && (
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-gray-900">Looking for:</p>
                    <p className="text-gray-700 mt-1">{currentMatch.lookingFor}</p>
                  </div>
                )}

                {/* Interests */}
                <div className="space-y-2">
                  <p className="text-gray-600">Interests</p>
                  <div className="flex flex-wrap gap-2">
                    {currentMatch.interests.map(interest => (
                      <Badge key={interest} variant="outline">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Icebreaker Questions Toggle */}
                <button
                  onClick={() => setShowQuestions(!showQuestions)}
                  className="flex items-center gap-2 text-purple-600 hover:text-purple-700"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>
                    {showQuestions ? 'Hide' : 'Show'} icebreaker questions
                  </span>
                </button>

                {/* Questions */}
                {showQuestions && questions.length > 0 && (
                  <div className="space-y-3 p-4 bg-purple-50 rounded-lg">
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
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <Button
            variant="outline"
            size="lg"
            className="w-16 h-16 rounded-full"
            onClick={handleSkip}
          >
            <X className="w-6 h-6" />
          </Button>
          <Button
            size="lg"
            className="w-16 h-16 rounded-full"
            onClick={handleSave}
          >
            <Heart className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}