import { ImageWithFallback } from './figma/ImageWithFallback';

interface SavedProfilesProps {
  profile: Match;
  onBack: () => void;
}

export function SavedProfiles({ profile, onBack }: SavedProfilesProps) {
  const [showInfo, setShowInfo] = useState(false);

  const questions = getIcebreakerQuestions(profile.interests).slice(0, 3);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-900">
      <div className="max-w-md w-full h-[600px] relative">
        {/* Header */}
        <div className="absolute -top-16 left-0 right-0 flex justify-between items-center text-white z-10">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
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
          {/* Current card */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl">
            {/* Background Image */}
            <div className="absolute inset-0">
              {profile.imageUrl ? (
                <ImageWithFallback
                  src={profile.imageUrl}
                  alt={profile.name}
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
                {profile.profileImage && (
                  <img
                    src={profile.profileImage}
                    alt={profile.name}
                    className="w-16 h-16 rounded-full object-cover border-3 border-white shadow-lg flex-shrink-0"
                  />
                )}
                <div className="flex-1">
                  <h2 className="text-white">{profile.name}</h2>
                  <p className="text-white/90 mt-1">{profile.role}</p>
                </div>
              </div>

              {/* Bottom Info */}
              <div className="space-y-4">
                {/* Match Score - Only show when info is toggled */}
                {showInfo && (
                  <div className="space-y-2 bg-white/10 backdrop-blur-md rounded-2xl p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white/90">Match Score</span>
                      <span className="text-pink-400">{Math.min(100, profile.score * 25)}%</span>
                    </div>
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-pink-400 transition-all duration-500"
                        style={{ width: `${Math.min(100, profile.score * 25)}%` }}
                      />
                    </div>
                    {profile.sharedInterests.length > 0 && (
                      <div className="mt-3">
                        <p className="text-white/90">You both selected:</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {profile.sharedInterests.map(interest => (
                            <Badge key={interest} className="bg-pink-400/20 text-pink-400 border-pink-400/30">
                              {interest}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

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
                {profile.lookingFor && (
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4">
                    <p className="text-white">{profile.lookingFor}</p>
                  </div>
                )}

                {/* Interests */}
                <div className="flex flex-wrap gap-2">
                  {profile.interests.map(interest => (
                    <Badge key={interest} className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}