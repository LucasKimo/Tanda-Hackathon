import { SwipeView } from './components/SwipeView';

/**
 * App Component
 * Root component of the NetworkMatch application
 * Provides the main container with gradient background and renders the SwipeView
 */
function App() {
  return (
    // Main app container with full height viewport and purple gradient background
    <div className="h-screen bg-navy-blue flex flex-col">
      {/* SwipeView contains the entire swipe interface including header, cards, and controls */}
      <SwipeView />
    </div>
  );
}

export default App;
