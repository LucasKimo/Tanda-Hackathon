import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Profile {
  id: number;
  name: string;
  occupation: string;
  description: string;
  interests: string[];
  image: string;
}

const MOCK_PROFILES: Profile[] = [
  {
    id: 1,
    name: 'Sarah Chen',
    occupation: 'Software Engineer',
    description: 'Passionate about building scalable applications and mentoring junior developers. Love discussing tech trends and startups.',
    interests: ['Technology', 'Gaming', 'Travel'],
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=600&fit=crop'
  },
  {
    id: 2,
    name: 'Marcus Johnson',
    occupation: 'Product Designer',
    description: 'Creating intuitive user experiences that delight. Always looking to collaborate on creative projects.',
    interests: ['Art', 'Photography', 'Music'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop'
  },
  {
    id: 3,
    name: 'Emma Rodriguez',
    occupation: 'Marketing Manager',
    description: 'Digital marketing enthusiast with a passion for storytelling. Let\'s talk about brand strategy!',
    interests: ['Fashion', 'Reading', 'Food'],
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop'
  },
  {
    id: 4,
    name: 'Alex Kim',
    occupation: 'Data Scientist',
    description: 'Turning data into insights. Excited about AI/ML and its applications in solving real-world problems.',
    interests: ['Technology', 'Sports', 'Fitness'],
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop'
  },
  {
    id: 5,
    name: 'Olivia Taylor',
    occupation: 'Entrepreneur',
    description: 'Building sustainable businesses. Always open to discussing new ideas and potential collaborations.',
    interests: ['Travel', 'Food', 'Reading'],
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop'
  }
];

export default function SwipeCard() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedProfiles, setLikedProfiles] = useState<Profile[]>([]);
  const [showLikedList, setShowLikedList] = useState(false);

  useEffect(() => {
    // Check if user has created a profile
    const userProfile = localStorage.getItem('userProfile');
    if (!userProfile) {
      navigate('/');
    }
  }, [navigate]);

  const currentProfile = MOCK_PROFILES[currentIndex];

  const handleLike = () => {
    setLikedProfiles([...likedProfiles, currentProfile]);
    handleNext();
  };

  const handlePass = () => {
    handleNext();
  };

  const handleNext = () => {
    if (currentIndex < MOCK_PROFILES.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // All profiles exhausted, navigate to Get Talking screen
      localStorage.setItem('likedProfiles', JSON.stringify(likedProfiles));
      navigate('/get-talking');
    }
  };

  if (!currentProfile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header with Liked List Button */}
      <div className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-purple-600">NetworkSwipe</h1>
        <button
          onClick={() => setShowLikedList(!showLikedList)}
          className="bg-pink-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-pink-600 transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            />
          </svg>
          Liked ({likedProfiles.length})
        </button>
      </div>

      {/* Liked Profiles List */}
      {showLikedList && (
        <div className="bg-white border-b shadow-lg p-4 max-h-64 overflow-y-auto">
          <h2 className="text-xl font-bold mb-3">Your Matches</h2>
          {likedProfiles.length === 0 ? (
            <p className="text-gray-500">No matches yet. Start swiping!</p>
          ) : (
            <div className="space-y-2">
              {likedProfiles.map((profile) => (
                <div key={profile.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                  <img
                    src={profile.image}
                    alt={profile.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{profile.name}</p>
                    <p className="text-sm text-gray-600">{profile.occupation}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Main Card */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Profile Image with Name Overlay */}
          <div className="relative h-[500px]">
            <img
              src={currentProfile.image}
              alt={currentProfile.name}
              className="w-full h-full object-cover"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

            {/* Name and Occupation Overlay */}
            <div className="absolute top-4 left-4 text-white">
              <h2 className="text-3xl font-bold drop-shadow-lg">{currentProfile.name}</h2>
              <p className="text-lg drop-shadow-lg opacity-90">{currentProfile.occupation}</p>
            </div>

            {/* Profile Counter */}
            <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full">
              <span className="text-sm font-semibold text-purple-600">
                {currentIndex + 1} / {MOCK_PROFILES.length}
              </span>
            </div>
          </div>

          {/* Description Box */}
          <div className="p-6">
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">About</h3>
              <p className="text-gray-700 leading-relaxed">{currentProfile.description}</p>
            </div>

            {/* Interests */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {currentProfile.interests.map((interest) => (
                  <span
                    key={interest}
                    className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-white shadow-lg p-6">
        <div className="max-w-md mx-auto flex justify-center gap-8">
          {/* Pass Button */}
          <button
            onClick={handlePass}
            className="w-16 h-16 bg-white border-4 border-gray-300 rounded-full flex items-center justify-center hover:border-red-500 hover:bg-red-50 transition-all transform hover:scale-110 shadow-lg"
          >
            <svg className="w-8 h-8 text-gray-400 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Like Button */}
          <button
            onClick={handleLike}
            className="w-16 h-16 bg-white border-4 border-pink-500 rounded-full flex items-center justify-center hover:bg-pink-500 group transition-all transform hover:scale-110 shadow-lg"
          >
            <svg className="w-8 h-8 text-pink-500 group-hover:text-white" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
