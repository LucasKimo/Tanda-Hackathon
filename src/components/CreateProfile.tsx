import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const INTERESTS = [
  'Technology',
  'Music',
  'Sports',
  'Art',
  'Gaming',
  'Travel',
  'Food',
  'Fashion',
  'Photography',
  'Reading',
  'Fitness',
  'Movies'
];

export default function CreateProfile() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [occupation, setOccupation] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  const handleInterestToggle = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else if (selectedInterests.length < 5) {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleJoinRoom = () => {
    if (name && occupation && selectedInterests.length >= 3) {
      // Save profile data to localStorage or context
      localStorage.setItem('userProfile', JSON.stringify({
        name,
        occupation,
        interests: selectedInterests,
        profilePicture
      }));
      navigate('/swipe');
    } else {
      alert('Please complete your profile (name, occupation, and at least 3 interests)');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 to-purple-600 p-6">
      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Create your profile
        </h1>

        {/* Profile Picture Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white text-center mb-4">
            Profile Header
          </h2>
          <div className="flex justify-center">
            <label htmlFor="profile-picture" className="cursor-pointer">
              <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center overflow-hidden border-4 border-white shadow-lg hover:shadow-xl transition-shadow">
                {profilePicture ? (
                  <img src={profilePicture} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <svg
                    className="w-16 h-16 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                )}
              </div>
              <input
                id="profile-picture"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleProfilePictureChange}
              />
            </label>
          </div>
        </div>

        {/* Name Input */}
        <div className="mb-6">
          <label htmlFor="name" className="block text-white font-semibold mb-2">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border-2 border-white bg-white/90 focus:outline-none focus:ring-2 focus:ring-white focus:bg-white text-black"
            placeholder="Enter your name"
          />
        </div>

        {/* Occupation Input */}
        <div className="mb-6">
          <label htmlFor="occupation" className="block text-white font-semibold mb-2">
            What do you do
          </label>
          <input
            id="occupation"
            type="text"
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border-2 border-white bg-white/90 focus:outline-none focus:ring-2 focus:ring-white focus:bg-white text-black"
            placeholder="Enter your occupation"
          />
        </div>

        {/* Interests Section */}
        <div className="mb-8">
          <label className="block text-white font-semibold mb-3">
            Select 3-5 Interests
          </label>
          <div className="flex flex-wrap gap-2">
            {INTERESTS.map((interest) => (
              <button
                key={interest}
                onClick={() => handleInterestToggle(interest)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  selectedInterests.includes(interest)
                    ? 'bg-white text-purple-600 shadow-lg scale-105'
                    : 'bg-white/30 text-white hover:bg-white/50'
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
          <p className="text-white/80 text-sm mt-2">
            {selectedInterests.length} / 5 selected (minimum 3)
          </p>
        </div>

        {/* Join Room Button */}
        <button
          onClick={handleJoinRoom}
          className="w-full bg-white text-purple-600 font-bold py-4 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
        >
          Join Room
        </button>
      </div>
    </div>
  );
}
