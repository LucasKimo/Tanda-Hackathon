import { Button } from "../components/ui/button";
import { Sparkles, Users, Zap } from "lucide-react";

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen gradient-subtle flex flex-col items-center justify-center p-6 animate-fade-in">
      <div className="max-w-md w-full space-y-8 text-center">
        {/* Logo/Icon */}
        <div className="animate-scale-in">
          <div className="w-24 h-24 mx-auto gradient-primary rounded-3xl flex items-center justify-center shadow-card mb-4">
            <Sparkles className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-5xl font-display font-bold text-foreground mt-4">
            VibeMatch
          </h1>
          <p className="text-lg text-muted-foreground mt-2">
            Connect instantly at live events
          </p>
        </div>

        {/* Feature Cards */}
        <div className="space-y-3 animate-slide-up">
          <div className="bg-card rounded-xl p-4 shadow-card border border-border/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-sm">Instant Matching</p>
                <p className="text-xs text-muted-foreground">Get paired in seconds</p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl p-4 shadow-card border border-border/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-accent" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-sm">AI Icebreakers</p>
                <p className="text-xs text-muted-foreground">Smart conversation starters</p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl p-4 shadow-card border border-border/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-secondary" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-sm">Real Connections</p>
                <p className="text-xs text-muted-foreground">Meet people who vibe</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <Button
          size="touch"
          className="w-full"
          onClick={onStart}
        >
          Get Started
        </Button>

        <p className="text-xs text-muted-foreground">
          Scan the event QR code to join
        </p>
      </div>
    </div>
  );
};
