import { useState } from 'react';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import type { Match } from '../App';
import { getIcebreakerQuestions } from '../utils/icebreakers';

interface SavedProfilesProps {
  profiles: Match[];
  onBack: () => void;
}

export function SavedProfiles({ profiles, onBack }: SavedProfilesProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (profiles.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-6">
          <p className="text-gray-600">
            You haven't saved any profiles yet. Go back and start swiping!
          </p>
          <Button onClick={onBack}>Back to Swipe</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 pb-20">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h2 className="text-gray-900">Saved Profiles</h2>
            <p className="text-gray-600 mt-2">
              These are people you want to reconnect with. Ask for their LinkedIn or Instagram!
            </p>
          </div>
        </div>

        {/* Profile List */}
        <div className="space-y-4">
          {profiles.map(profile => {
            const isExpanded = expandedId === profile.id;
            const questions = getIcebreakerQuestions(profile.interests).slice(0, 3);

            return (
              <div
                key={profile.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="p-6 space-y-4">
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white">{profile.name.charAt(0)}</span>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-gray-900">{profile.name}</h3>
                      <p className="text-gray-600">{profile.role}</p>

                      {/* What they're looking for */}
                      {profile.lookingFor && (
                        <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                          <p className="text-gray-900">Looking for:</p>
                          <p className="text-gray-700 mt-1">{profile.lookingFor}</p>
                        </div>
                      )}

                      {/* Shared Interests */}
                      {profile.sharedInterests.length > 0 && (
                        <div className="mt-3 space-y-2">
                          <p className="text-gray-600">Shared interests:</p>
                          <div className="flex flex-wrap gap-2">
                            {profile.sharedInterests.map(interest => (
                              <Badge key={interest} variant="secondary">
                                {interest}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Expand/Collapse Button */}
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => toggleExpanded(profile.id)}
                  >
                    {isExpanded ? (
                      <>
                        <ChevronUp className="w-4 h-4 mr-2" />
                        Hide Icebreaker Questions
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4 mr-2" />
                        Show Icebreaker Questions
                      </>
                    )}
                  </Button>

                  {/* Expanded Content */}
                  {isExpanded && questions.length > 0 && (
                    <div className="pt-4 border-t space-y-3">
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
            );
          })}
        </div>
      </div>
    </div>
  );
}