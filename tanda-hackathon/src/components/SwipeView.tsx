import { useState } from 'react';
import { SwipeCard } from './SwipeCard';
import { personDummyData } from '../data/person';
import type { Person } from '../types/person';

/**
 * SwipeView Component
 * Main container for the swipe interface
 * Manages the queue of profiles, tracks matches, and handles swipe actions
 */
export function SwipeView() {
  // State to track which profile is currently being displayed (index in personDummyData array)
  const [currentIndex, setCurrentIndex] = useState(0);

  // State to store all matched profiles (when user swipes right)
  const [matches, setMatches] = useState<Person[]>([]);

  // Get the current person to display based on the index
  const currentPerson = personDummyData[currentIndex];

  /**
   * Handle Swipe Action
   * Processes left (reject) or right (accept/match) swipes
   * Updates matches list if accepted, then moves to next profile
   * Loops back to start if all profiles have been viewed
   */
  const handleSwipe = (direction: 'left' | 'right') => {
    // If swiped right, add person to matches array
    if (direction === 'right') {
      setMatches([...matches, currentPerson]);
      console.log('Matched with:', currentPerson.name);
    } else {
      console.log('Passed on:', currentPerson.name);
    }

    // Move to next profile, or loop back to start if at end
    if (currentIndex < personDummyData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
      console.log('All profiles viewed! Starting over...');
    }
  };

  // Empty state - shown if no profiles are available (edge case)
  if (!currentPerson) {
    return (
      <div className="flex-1 flex flex-col h-full">
        <div className="text-center text-white p-8">
          <h2 className="text-3xl mb-4">No more profiles!</h2>
          <p className="text-xl opacity-90">Check back later for more connections.</p>
        </div>
      </div>
    );
  }

  // Main swipe interface layout
  return (
    <div className="flex-1 flex flex-col h-full">
      {/* App header with branding and match counter */}
      <header className="p-4 bg-white/95 flex justify-between items-center shadow-[0_2px_10px_rgba(0,0,0,0.1)]">
        {/* App title/logo */}
        <h1 className="text-2xl text-indigo-600 font-bold">NetworkMatch</h1>

        {/* Match counter badge - displays total number of right swipes */}
        <div className="bg-indigo-600 text-white px-4 py-2 rounded-[20px] text-sm font-semibold">
          {matches.length} {matches.length === 1 ? 'Match' : 'Matches'}
        </div>
      </header>

      {/* Card display area - centered content */}
      <div className="flex-1 flex justify-center items-center p-4 relative">
        {/* SwipeCard with key prop to force re-render on profile change */}
        <SwipeCard
          key={currentPerson.id}
          person={currentPerson}
          onSwipe={handleSwipe}
        />
      </div>

      {/* Progress indicator - shows current position in profile queue */}
      <div className="text-center py-2 text-white text-sm font-semibold">
        {currentIndex + 1} / {personDummyData.length}
      </div>
    </div>
  );
}
