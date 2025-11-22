import { useState } from 'react';
import type { Person } from '../types/person';

/**
 * Props for the SwipeCard component
 * @param person - The person profile to display on the card
 * @param onSwipe - Callback function triggered when card is swiped left or right
 */
interface SwipeCardProps {
  person: Person;
  onSwipe: (direction: 'left' | 'right') => void;
}

/**
 * SwipeCard Component
 * Displays a single person's profile card with swipe gestures and button controls
 * Supports both touch swipe gestures (mobile) and button clicks (desktop)
 */
export function SwipeCard({ person, onSwipe }: SwipeCardProps) {
  // State to track touch gesture positions
  const [touchStart, setTouchStart] = useState<number | null>(null); // X position where touch started
  const [touchEnd, setTouchEnd] = useState<number | null>(null);     // X position where touch ended
  const [offset, setOffset] = useState(0);                           // Current horizontal offset during swipe

  // Minimum distance (in pixels) required to register as a swipe
  const minSwipeDistance = 50;

  /**
   * Touch Start Handler
   * Records the starting X position when user touches the card
   */
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  /**
   * Touch Move Handler
   * Updates the card position as user drags their finger across the screen
   * Calculates offset from starting position for visual feedback
   */
  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
    if (touchStart) {
      setOffset(e.targetTouches[0].clientX - touchStart);
    }
  };

  /**
   * Touch End Handler
   * Determines if the swipe was significant enough to trigger an action
   * Positive distance = left swipe (reject)
   * Negative distance = right swipe (match)
   */
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      setOffset(0);
      return;
    }

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      onSwipe('left');
    } else if (isRightSwipe) {
      onSwipe('right');
    }

    // Reset all touch tracking state
    setOffset(0);
    setTouchStart(null);
    setTouchEnd(null);
  };

  /**
   * Button Click Handler
   * Alternative to swipe gestures for desktop users
   * Directly triggers the swipe action in the specified direction
   */
  const handleButtonClick = (direction: 'left' | 'right') => {
    onSwipe(direction);
  };

  // Calculate visual feedback during swipe
  const rotation = offset * 0.05;                    // Card rotates slightly as it's dragged
  const opacity = 1 - Math.abs(offset) / 300;       // Card fades out as it moves further

  return (
    // Main card container with max dimensions
    <div className="w-full max-w-[500px] h-full max-h-[600px] relative">
      {/*
        Swipeable card element
        - Handles touch events for swipe gestures
        - Applies dynamic transform and opacity based on drag position
        - Transitions are disabled during active drag for smooth movement
      */}
      <div
        className="bg-white rounded-[20px] shadow-[0_10px_40px_rgba(0,0,0,0.2)] overflow-hidden absolute w-full h-[calc(100%-80px)] top-0 left-0 cursor-grab select-none touch-pan-y active:cursor-grabbing"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{
          transform: `translateX(${offset}px) rotate(${rotation}deg)`,
          opacity: opacity,
          transition: touchStart ? 'none' : 'transform 0.3s ease, opacity 0.3s ease'
        }}
      >
        {/* Profile image section - takes up top half of card */}
        <div className="w-full h-1/2 overflow-hidden bg-gray-100">
          <img
            src={person.profileImage}
            alt={person.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Profile information section - takes up bottom half of card */}
        <div className="p-6 h-1/2 overflow-y-auto">
          {/* Name and age */}
          <h2 className="text-3xl mb-2 text-gray-800">
            {person.name}, {person.age}
          </h2>

          {/* Occupation */}
          <p className="text-base text-indigo-600 font-semibold mb-1">
            {person.occupation}
          </p>

          {/* Location */}
          <p className="text-sm text-gray-500 mb-4">
            {person.location}
          </p>

          {/* Bio description */}
          <p className="text-base text-gray-600 leading-relaxed mb-4">
            {person.bio}
          </p>

          {/* Interest tags - displayed as badges */}
          <div className="flex flex-wrap gap-2">
            {person.interests.map((interest, index) => (
              <span
                key={index}
                className="bg-gray-100 px-3 py-2 rounded-2xl text-sm text-indigo-600 border border-indigo-600"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action buttons container - positioned at bottom */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-8 p-4">
        {/* Reject button (left swipe) */}
        <button
          className="w-[60px] h-[60px] rounded-full border-none text-3xl cursor-pointer transition-all duration-200 shadow-[0_4px_15px_rgba(0,0,0,0.2)] flex items-center justify-center bg-white text-red-400 border-2 border-red-400 hover:bg-red-400 hover:text-white hover:scale-110 active:scale-95"
          onClick={() => handleButtonClick('left')}
        >
          ✕
        </button>

        {/* Accept button (right swipe) */}
        <button
          className="w-[60px] h-[60px] rounded-full border-none text-3xl cursor-pointer transition-all duration-200 shadow-[0_4px_15px_rgba(0,0,0,0.2)] flex items-center justify-center bg-white text-green-500 border-2 border-green-500 hover:bg-green-500 hover:text-white hover:scale-110 active:scale-95"
          onClick={() => handleButtonClick('right')}
        >
          ♥
        </button>
      </div>
    </div>
  );
}
