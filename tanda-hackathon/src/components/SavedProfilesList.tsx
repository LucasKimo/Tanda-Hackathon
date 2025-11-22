import { ArrowLeft, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import type { Match } from '../App';

interface SavedProfilesListProps {
  savedProfiles: Match[];
  mutualMatches: Match[];
  onBack: () => void;
  onViewProfile: (profile: Match) => void;
}

export function SavedProfilesList({ savedProfiles, mutualMatches, onBack, onViewProfile }: SavedProfilesListProps) {
  const nonMutualSaved = savedProfiles.filter(
    profile => !mutualMatches.find(m => m.id === profile.id)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" onClick={onBack} className="flex-shrink-0">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Swipe
          </Button>
          <h1 className="text-gray-900">Connections</h1>
        </div>

        {/* Empty State */}
        {savedProfiles.length === 0 && mutualMatches.length === 0 && (
          <div className="text-center py-16 space-y-4">
            <div className="w-20 h-20 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full flex items-center justify-center mx-auto">
              <Heart className="w-10 h-10 text-gray-400" />
            </div>
            <div>
              <h2 className="text-gray-900 mb-2">No connections yet</h2>
              <p className="text-gray-600">Start swiping to save profiles you're interested in!</p>
            </div>
          </div>
        )}

        {/* Mutual Matches Section */}
        {mutualMatches.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-red-500 rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-white fill-white" />
              </div>
              <div>
                <h2 className="text-gray-900">Mutual Matches</h2>
                <p className="text-gray-600">They saved your profile too!</p>
              </div>
            </div>
            <div className="space-y-3">
              {mutualMatches.map(profile => (
                <button
                  key={profile.id}
                  onClick={() => onViewProfile(profile)}
                  className="w-full bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all border-2 border-pink-200 hover:border-pink-300"
                >
                  <div className="flex gap-4">
                    {/* Profile Image */}
                    <div className="relative flex-shrink-0">
                      {profile.profileImage ? (
                        <img
                          src={profile.profileImage}
                          alt={profile.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-pink-400" />
                      )}
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center border-2 border-white">
                        <Heart className="w-3 h-3 text-white fill-white" />
                      </div>
                    </div>

                    {/* Profile Info */}
                    <div className="flex-1 text-left">
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <h3 className="text-gray-900">{profile.name}</h3>
                          <p className="text-gray-600">{profile.role}</p>
                        </div>
                        <Badge className="bg-pink-100 text-pink-700 border-pink-200">
                          {Math.min(100, profile.score * 25)}% match
                        </Badge>
                      </div>
                      {profile.sharedInterests.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {profile.sharedInterests.slice(0, 3).map(interest => (
                            <Badge key={interest} variant="secondary" className="text-xs">
                              {interest}
                            </Badge>
                          ))}
                          {profile.sharedInterests.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{profile.sharedInterests.length - 3}
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Saved Profiles Section */}
        {nonMutualSaved.length > 0 && (
          <div>
            <h2 className="text-gray-900 mb-4">Saved Profiles</h2>
            <div className="space-y-3">
              {nonMutualSaved.map(profile => (
                <button
                  key={profile.id}
                  onClick={() => onViewProfile(profile)}
                  className="w-full bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex gap-4">
                    {/* Profile Image */}
                    {profile.profileImage ? (
                      <img
                        src={profile.profileImage}
                        alt={profile.name}
                        className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex-shrink-0" />
                    )}

                    {/* Profile Info */}
                    <div className="flex-1 text-left">
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <h3 className="text-gray-900">{profile.name}</h3>
                          <p className="text-gray-600">{profile.role}</p>
                        </div>
                        <Badge variant="secondary">
                          {Math.min(100, profile.score * 25)}% match
                        </Badge>
                      </div>
                      {profile.sharedInterests.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {profile.sharedInterests.slice(0, 3).map(interest => (
                            <Badge key={interest} variant="secondary" className="text-xs">
                              {interest}
                            </Badge>
                          ))}
                          {profile.sharedInterests.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{profile.sharedInterests.length - 3}
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
