import { useState, useEffect, useRef } from 'react';
import { Heart, X, Bookmark, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import type { Match } from '../App';
import { getIcebreakerQuestions } from '../utils/icebreakers';
import { GetTalking } from './GetTalking';

interface SwipeDeckProps {
  matches: Match[];
  savedCount: number;
  savedMatches: Match[];
  onSave: (match: Match) => void;
  onViewSaved: () => void;
  onEditProfile: () => void;
}

export function SwipeDeck({ matches, savedCount, savedMatches, onSave, onViewSaved, onEditProfile }: SwipeDeckProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showQuestions, setShowQuestions] = useState(false);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  
  const swipeOffsetRef = useRef(0);
  const currentMatchRef = useRef(matches[currentIndex]);

  const currentMatch = matches[currentIndex];
  const hasMore = currentIndex < matches.length - 1;

  // Update refs when values change
  useEffect(() => {
    swipeOffsetRef.current = swipeOffset;
  }, [swipeOffset]);

  useEffect(() => {
    currentMatchRef.current = currentMatch;
  }, [currentMatch]);

  const handleSkip = () => {
    setShowQuestions(false);
    setCurrentIndex(currentIndex + 1);
  };

  const handleSave = () => {
    if (currentMatchRef.current) {
      onSave(currentMatchRef.current);
    }
    setShowQuestions(false);
    setCurrentIndex(currentIndex + 1);
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
    const finalOffset = swipeOffsetRef.current;

    if (finalOffset > threshold) {
      // Swipe right - save
      if (currentMatchRef.current) {
        onSave(currentMatchRef.current);
      }
      setShowQuestions(false);
      setCurrentIndex(currentIndex + 1);
    } else if (finalOffset < -threshold) {
      // Swipe left - skip
      setShowQuestions(false);
      setCurrentIndex(currentIndex + 1);
    }
    
    setSwipeOffset(0);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setStartX(e.clientX);
  };

  // Use useEffect to handle global mouse events when dragging
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const offset = e.clientX - startX;
      setSwipeOffset(offset);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      const threshold = 100;
      const finalOffset = swipeOffsetRef.current;

      if (finalOffset > threshold) {
        // Swipe right - save
        if (currentMatchRef.current) {
          onSave(currentMatchRef.current);
        }
        setShowQuestions(false);
        setCurrentIndex(currentIndex + 1);
      } else if (finalOffset < -threshold) {
        // Swipe left - skip
        setShowQuestions(false);
        setCurrentIndex(currentIndex + 1);
      }
      
      setSwipeOffset(0);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, startX, currentIndex, matches.length, onSave]);

  if (!currentMatch) {
    return (
      <GetTalking 
        matches={savedMatches}
        onSwipeAgain={() => setCurrentIndex(0)}
        onEditProfile={onEditProfile}
        onViewSaved={onViewSaved}
      />
    );
  }

  const questions = getIcebreakerQuestions(currentMatch.interests).slice(0, 3);

  // Calculate rotation and opacity for swipe animation
  const rotation = swipeOffset / 20;
  const opacity = Math.max(0.5, 1 - Math.abs(swipeOffset) / 200);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
      <div className="max-w-md w-full space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="neon-text bg-gradient-to-r from-purple-200 to-indigo-200 bg-clip-text text-transparent">Discover</h2>
            <p className="text-white" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
              {currentIndex + 1} of {matches.length}
            </p>
          </div>
          <Button variant="outline" onClick={onViewSaved} className="border-purple-400/30 text-white hover:bg-purple-500/20">
            <Bookmark className="w-4 h-4 mr-2" />
            Saved ({savedCount})
          </Button>
        </div>

        {/* Card Stack */}
        <div className="relative h-[500px]">
          {/* Background card (next card preview) */}
          {hasMore && (
            <div className="absolute inset-0 glass-card rounded-2xl shadow-lg transform scale-95 opacity-50" />
          )}

          {/* Current card */}
          <div 
            className="absolute inset-0 glass-card rounded-2xl shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing select-none neon-border" 
            style={{ 
              transform: `translateX(${swipeOffset}px) rotate(${rotation}deg)`, 
              opacity: opacity,
              transition: isDragging ? 'none' : 'transform 0.3s ease, opacity 0.3s ease'
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
          >
            {/* Swipe Indicators */}
            {swipeOffset > 0 && (
              <div 
                className="absolute top-8 left-8 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl rotate-12 z-10 shadow-lg border border-green-400"
                style={{ opacity: Math.min(1, swipeOffset / 100) }}
              >
                <Heart className="w-8 h-8" />
              </div>
            )}
            {swipeOffset < 0 && (
              <div 
                className="absolute top-8 right-8 bg-gradient-to-r from-red-500 to-rose-500 text-white px-6 py-3 rounded-xl -rotate-12 z-10 shadow-lg border border-red-400"
                style={{ opacity: Math.min(1, Math.abs(swipeOffset) / 100) }}
              >
                <X className="w-8 h-8" />
              </div>
            )}

            <div className="h-full flex flex-col">
              {/* Avatar Section */}
              <div className="bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-600 h-48 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20" />
                {currentMatch.profileImage ? (
                  <img 
                    src={currentMatch.profileImage} 
                    alt={currentMatch.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-white relative z-10">{currentMatch.name.charAt(0)}</span>
                )}
              </div>

              {/* Content Section */}
              <div className="flex-1 p-6 space-y-4 overflow-y-auto bg-slate-900/40">
                <div>
                  <h3 className="text-indigo-100">{currentMatch.name}</h3>
                </div>

                {/* What they're looking for */}
                {currentMatch.lookingFor && (
                  <div className="p-3 bg-indigo-500/10 border border-indigo-400/20 rounded-lg">
                    <p className="text-indigo-300">Looking for:</p>
                    <p className="text-indigo-200/80 mt-1">{currentMatch.lookingFor}</p>
                  </div>
                )}

                {/* Interests */}
                <div className="space-y-2">
                  <p className="text-indigo-300/70">Skills</p>
                  <p className="text-indigo-200/80">{currentMatch.skillsDescription || currentMatch.interests.join(', ')}</p>
                </div>

                {/* Icebreaker Questions Toggle */}
                <button
                  onClick={() => setShowQuestions(!showQuestions)}
                  className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>
                    {showQuestions ? 'Hide' : 'Show'} icebreaker questions
                  </span>
                </button>

                {/* Questions */}
                {showQuestions && questions.length > 0 && (
                  <div className="space-y-3 p-4 bg-purple-500/10 border border-purple-400/20 rounded-lg">
                    <p className="text-indigo-300">Ask them...</p>
                    <ul className="space-y-2">
                      {questions.map((question, index) => (
                        <li key={index} className="text-indigo-200/70 flex gap-2">
                          <span className="text-purple-400">•</span>
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
            className="w-16 h-16 rounded-full border-red-400/40 text-red-400 hover:bg-red-500/20 hover:border-red-400"
            onClick={handleSkip}
          >
            <X className="w-6 h-6" />
          </Button>
          <Button
            size="lg"
            className="w-16 h-16 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 border border-green-400/40"
            onClick={handleSave}
          >
            <Heart className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}