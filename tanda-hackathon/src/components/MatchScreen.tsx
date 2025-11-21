import { Button } from "../components/ui/button";
import { Sparkles, User, MapPin, Heart } from "lucide-react";
import type { UserData } from "./UserInfoForm";

interface MatchScreenProps {
  userData: UserData;
  onReset: () => void;
}

// Mock matched user data
const matchedUser = {
  name: "Alex Rivera",
  interests: "Startups, Coffee, Design",
  lookingFor: "Co-founder, Mentorship",
  location: "San Francisco",
  aiIcebreaker: "You both love coffee! Ask Alex about their favorite local spot in SF. They're also into design - perfect match for your tech interests!",
};

export const MatchScreen = ({ userData, onReset }: MatchScreenProps) => {
  return (
    <div className="min-h-screen gradient-subtle flex flex-col animate-fade-in">
      {/* Header */}
      <div className="p-6 text-center">
        <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full animate-scale-in">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-semibold">Match Found!</span>
        </div>
      </div>

      {/* Match Cards */}
      <div className="flex-1 px-6 pb-6 space-y-4">
        {/* Matched User Card */}
        <div className="bg-card rounded-3xl p-6 shadow-card border-2 border-accent/20 animate-slide-up">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-accent to-secondary rounded-2xl flex items-center justify-center shadow-button">
              <User className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-display font-bold">{matchedUser.name}</h3>
              <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                <MapPin className="w-3 h-3" />
                <span>{matchedUser.location}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="bg-muted rounded-xl p-3">
              <p className="text-xs font-semibold text-muted-foreground mb-1">INTERESTS</p>
              <p className="text-sm">{matchedUser.interests}</p>
            </div>

            <div className="bg-muted rounded-xl p-3">
              <p className="text-xs font-semibold text-muted-foreground mb-1">LOOKING FOR</p>
              <p className="text-sm">{matchedUser.lookingFor}</p>
            </div>
          </div>
        </div>

        {/* AI Icebreaker Card */}
        <div className="bg-gradient-to-br from-primary to-accent rounded-3xl p-6 shadow-card animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <h4 className="font-display font-bold text-white">AI Icebreaker</h4>
          </div>
          <p className="text-white/95 text-sm leading-relaxed">
            {matchedUser.aiIcebreaker}
          </p>
        </div>

        {/* Your Profile Card */}
        <div className="bg-card rounded-2xl p-4 shadow-card border border-border/50 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <p className="text-xs font-semibold text-muted-foreground mb-2">YOUR PROFILE</p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm">{userData.name}</p>
              <p className="text-xs text-muted-foreground">{userData.interests}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Actions */}
      <div className="p-6 space-y-3 border-t border-border/50 bg-card/50 backdrop-blur-sm">
        <Button
          variant="vibrant"
          size="touch"
          className="w-full"
        >
          <Heart className="w-5 h-5 mr-2" />
          Connect Now
        </Button>
        
        <Button
          variant="outline"
          size="default"
          className="w-full"
          onClick={onReset}
        >
          Find Another Match
        </Button>
      </div>
    </div>
  );
};
