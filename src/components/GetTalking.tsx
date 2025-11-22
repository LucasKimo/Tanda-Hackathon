import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Profile {
  id: number;
  name: string;
  occupation: string;
  description: string;
  interests: string[];
  image: string;
}

export default function GetTalking() {
  const navigate = useNavigate();
  const [likedProfiles, setLikedProfiles] = useState<Profile[]>([]);

  useEffect(() => {
    const liked = localStorage.getItem('likedProfiles');
    if (liked) {
      setLikedProfiles(JSON.parse(liked));
    }
  }, []);

  const handleStartOver = () => {
    navigate('/swipe');
  };

  const handleBackToProfile = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8">
        {/* Celebration Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-5xl font-bold text-gray-800 mb-2">Get Talking!</h1>
          <p className="text-xl text-gray-600">
            You've matched with {likedProfiles.length} awesome {likedProfiles.length === 1 ? 'person' : 'people'}
          </p>
        </div>

        {/* Matched Profiles List */}
        {likedProfiles.length > 0 ? (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Matches</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {likedProfiles.map((profile) => (
                <div
                  key={profile.id}
                  className="flex items-start gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl hover:shadow-lg transition-shadow"
                >
                  <img
                    src={profile.image}
                    alt={profile.name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800">{profile.name}</h3>
                    <p className="text-gray-600 mb-2">{profile.occupation}</p>
                    <div className="flex flex-wrap gap-1">
                      {profile.interests.map((interest) => (
                        <span
                          key={interest}
                          className="px-2 py-1 bg-purple-200 text-purple-700 rounded-full text-xs font-medium"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mb-8 text-center p-8 bg-gray-50 rounded-xl">
            <div className="text-4xl mb-2">😢</div>
            <p className="text-gray-600">
              You didn't match with anyone this time. Try again!
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-xl text-center">
            <p className="text-gray-700 text-lg mb-2">
              🎯 <strong>Next Steps:</strong>
            </p>
            <p className="text-gray-600">
              Start conversations with your matches and make meaningful connections at this event!
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleStartOver}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              Swipe Again
            </button>
            <button
              onClick={handleBackToProfile}
              className="flex-1 bg-white text-purple-600 font-bold py-4 rounded-xl shadow-lg border-2 border-purple-500 hover:bg-purple-50 transform hover:scale-105 transition-all"
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* Fun Stats */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
            <div className="text-3xl font-bold text-blue-600">{likedProfiles.length}</div>
            <div className="text-sm text-gray-600">Matches</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
            <div className="text-3xl font-bold text-green-600">
              {likedProfiles.reduce((sum, p) => sum + p.interests.length, 0)}
            </div>
            <div className="text-sm text-gray-600">Shared Interests</div>
          </div>
        </div>
      </div>
    </div>
  );
}
