import { useState } from 'react';
import { ArrowLeft, ChevronDown, ChevronUp, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import type { Match, Profile } from '../AttendeeApp';
import { getIcebreakerQuestions } from '../utils/icebreakers';

interface SavedProfilesProps {
  profiles: Match[];
  allProfiles: Profile[];
  userProfile: Profile;
  onBack: () => void;
}

export function SavedProfiles({ profiles, allProfiles, userProfile, onBack }: SavedProfilesProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Get profiles that were not saved
  const savedIds = new Set(profiles.map(p => p.id));
  const unsavedProfiles = allProfiles.filter(p => !savedIds.has(p.id));

  // Get all attendees sorted A-Z (including user)
  const allAttendees = [
    userProfile, // User always first
    ...allProfiles.sort((a, b) => a.name.localeCompare(b.name)) // Others sorted A-Z
  ];

  // If showing all attendees view
  if (showAll) {
    return (
      <div className="min-h-screen p-4 pb-20 relative z-10">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Header */}
          <div className="space-y-4">
            <Button variant="ghost" onClick={() => setShowAll(false)} className="text-white hover:bg-cyan-500/20">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Saved
            </Button>
            <div>
              <h2 className="neon-text bg-gradient-to-r from-cyan-200 to-blue-200 bg-clip-text text-transparent">All Event Attendees</h2>
              <p className="text-white mt-2" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                {allAttendees.length} people at this event (sorted A-Z)
              </p>
            </div>
          </div>

          {/* All Attendees List */}
          <div className="space-y-4">
            {allAttendees.map(attendee => {
              const isExpanded = expandedId === attendee.id;
              const isUser = attendee.id === userProfile.id;
              const isSaved = savedIds.has(attendee.id);
              const questions = getIcebreakerQuestions(attendee.interests).slice(0, 3);

              return (
                <div
                  key={attendee.id}
                  className={`glass-card rounded-xl shadow-2xl overflow-hidden ${
                    isUser 
                      ? 'border-2 border-cyan-400/50' 
                      : isSaved 
                      ? 'border border-purple-400/30' 
                      : 'border border-slate-400/20'
                  }`}
                >
                  <div className="p-6 space-y-4">
                    <div className="flex items-start gap-4">
                      {/* Avatar */}
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden ${
                        isUser 
                          ? 'bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-500 ring-2 ring-cyan-400' 
                          : isSaved 
                          ? 'bg-gradient-to-br from-purple-500 via-violet-500 to-indigo-500' 
                          : 'bg-gradient-to-br from-slate-500 via-slate-600 to-slate-700'
                      }`}>
                        {attendee.profileImage ? (
                          <img 
                            src={attendee.profileImage} 
                            alt={attendee.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-white">{attendee.name.charAt(0)}</span>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="text-white" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                            {attendee.name}
                          </h3>
                          {isUser && (
                            <Badge className="bg-gradient-to-r from-cyan-600 to-blue-600 border-cyan-400/50 text-white">
                              You
                            </Badge>
                          )}
                          {isSaved && !isUser && (
                            <Badge className="bg-gradient-to-r from-purple-600 to-indigo-600 border-purple-400/50 text-white">
                              Saved
                            </Badge>
                          )}
                        </div>

                        {/* What they're looking for */}
                        {attendee.lookingFor && (
                          <div className={`mt-3 p-3 rounded-lg ${
                            isUser 
                              ? 'bg-cyan-500/10 border border-cyan-400/20' 
                              : isSaved 
                              ? 'bg-indigo-500/10 border border-indigo-400/20' 
                              : 'bg-slate-500/10 border border-slate-400/20'
                          }`}>
                            <p className="text-white" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>Looking for:</p>
                            <p className="text-slate-100 mt-1" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>{attendee.lookingFor}</p>
                          </div>
                        )}

                        {/* Interests */}
                        <div className="mt-3 space-y-2">
                          <p className="text-slate-300 text-sm" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>Skills:</p>
                          <p className="text-slate-300 text-sm" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                            {attendee.skillsDescription || attendee.interests.join(', ')}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Expand/Collapse Button - only for non-user profiles */}
                    {!isUser && (
                      <>
                        <Button
                          variant="outline"
                          className={`w-full ${
                            isSaved 
                              ? 'border-purple-400/30 text-white hover:bg-purple-500/20' 
                              : 'border-slate-400/30 text-slate-300 hover:bg-slate-500/20'
                          }`}
                          onClick={() => toggleExpanded(attendee.id)}
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
                          <div className={`pt-4 border-t space-y-3 ${
                            isSaved ? 'border-purple-400/20' : 'border-slate-400/20'
                          }`}>
                            <p className="text-white" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>Ask them...</p>
                            <ul className="space-y-2">
                              {questions.map((question, index) => (
                                <li key={index} className="text-slate-100 flex gap-2" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                                  <span className={isSaved ? 'text-purple-400' : 'text-slate-400'}>•</span>
                                  <span>{question}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </>
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

  return (
    <div className="min-h-screen p-4 pb-20 relative z-10">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <Button variant="ghost" onClick={onBack} className="text-white hover:bg-purple-500/20">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h2 className="neon-text bg-gradient-to-r from-purple-200 to-indigo-200 bg-clip-text text-transparent">Saved Profiles</h2>
            <p className="text-white mt-2" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
              These are people you want to reconnect with. Ask for their LinkedIn or Instagram!
            </p>
          </div>
        </div>

        {/* Saved Profile List */}
        <div className="space-y-4">
          {profiles.map(profile => {
            const isExpanded = expandedId === profile.id;
            const questions = getIcebreakerQuestions(profile.interests).slice(0, 3);

            return (
              <div
                key={profile.id}
                className="glass-card rounded-xl shadow-2xl overflow-hidden neon-border"
              >
                <div className="p-6 space-y-4">
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 via-violet-500 to-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 neon-border overflow-hidden">
                      {profile.profileImage ? (
                        <img 
                          src={profile.profileImage} 
                          alt={profile.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-white">{profile.name.charAt(0)}</span>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>{profile.name}</h3>

                      {/* What they're looking for */}
                      {profile.lookingFor && (
                        <div className="mt-3 p-3 bg-indigo-500/10 border border-indigo-400/20 rounded-lg">
                          <p className="text-white" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>Looking for:</p>
                          <p className="text-slate-100 mt-1" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>{profile.lookingFor}</p>
                        </div>
                      )}

                      {/* Skills */}
                      <div className="mt-3 space-y-2">
                        <p className="text-white text-sm" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>Skills:</p>
                        <p className="text-slate-100 text-sm" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                          {profile.skillsDescription || profile.interests.join(', ')}
                        </p>
                      </div>

                      {/* Shared Interests */}
                      {profile.sharedInterests.length > 0 && (
                        <div className="mt-3 space-y-2">
                          <p className="text-white" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>Shared skills:</p>
                          <div className="flex flex-wrap gap-2">
                            {profile.sharedInterests.map(interest => (
                              <Badge key={interest} className="bg-gradient-to-r from-purple-600 to-indigo-600 border-purple-400/50 text-white">
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
                    className="w-full border-purple-400/30 text-white hover:bg-purple-500/20"
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
                    <div className="pt-4 border-t border-purple-400/20 space-y-3">
                      <p className="text-white" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>Ask them...</p>
                      <ul className="space-y-2">
                        {questions.map((question, index) => (
                          <li key={index} className="text-slate-100 flex gap-2" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                            <span className="text-purple-400">•</span>
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

        {/* Unsaved Profiles Section */}
        {unsavedProfiles.length > 0 && (
          <div className="space-y-4 mt-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>Other Attendees</h3>
                <p className="text-slate-300 text-sm" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                  Profiles you didn't save
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {unsavedProfiles.map(profile => {
                const isExpanded = expandedId === profile.id;
                const questions = getIcebreakerQuestions(profile.interests).slice(0, 3);

                return (
                  <div
                    key={profile.id}
                    className="glass-card rounded-xl shadow-2xl overflow-hidden border border-purple-400/20"
                  >
                    <div className="p-6 space-y-4">
                      <div className="flex items-start gap-4">
                        {/* Avatar */}
                        <div className="w-16 h-16 bg-gradient-to-br from-slate-500 via-slate-600 to-slate-700 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
                          {profile.profileImage ? (
                            <img 
                              src={profile.profileImage} 
                              alt={profile.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-white">{profile.name.charAt(0)}</span>
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-slate-200" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>{profile.name}</h3>

                          {/* What they're looking for */}
                          {profile.lookingFor && (
                            <div className="mt-3 p-3 bg-slate-500/10 border border-slate-400/20 rounded-lg">
                              <p className="text-slate-200" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>Looking for:</p>
                              <p className="text-slate-300 mt-1" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>{profile.lookingFor}</p>
                            </div>
                          )}

                          {/* Interests */}
                          <div className="mt-3 space-y-2">
                            <p className="text-slate-300 text-sm" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>Skills:</p>
                            <p className="text-slate-300 text-sm" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                              {profile.skillsDescription || profile.interests.join(', ')}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Expand/Collapse Button */}
                      <Button
                        variant="outline"
                        className="w-full border-slate-400/30 text-slate-300 hover:bg-slate-500/20"
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
                        <div className="pt-4 border-t border-slate-400/20 space-y-3">
                          <p className="text-slate-200" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>Ask them...</p>
                          <ul className="space-y-2">
                            {questions.map((question, index) => (
                              <li key={index} className="text-slate-300 flex gap-2" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                                <span className="text-slate-400">•</span>
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
        )}

        {/* View All Attendees Button */}
        <div className="pt-6">
          <Button 
            onClick={() => setShowAll(!showAll)} 
            className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 border border-cyan-400/30"
            size="lg"
          >
            <Users className="w-5 h-5 mr-2" />
            View All Event Attendees ({allProfiles.length + 1})
          </Button>
        </div>
      </div>
    </div>
  );
}