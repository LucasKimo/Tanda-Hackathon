import { Users, Zap } from 'lucide-react';
import { Button } from './ui/button';

interface EventJoinProps {
  eventName: string;
  onJoin: () => void;
}

export function EventJoin({ eventName, onJoin }: EventJoinProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="space-y-6">
          <div className="relative inline-block">
            <div
              className="w-48 h-48 rounded-full overflow-hidden mx-auto neon-border relative"
              style={{ animation: 'glow 2s ease-in-out infinite' }}
            >
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrDSbT6WZFXInw0AjgNf0QGfgfIiFtdMWgdA&s"
                alt="Tanda Hackathon"
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className="absolute -top-2 -right-2 w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center"
              style={{ animation: 'pulse-glow 1.5s ease-in-out infinite' }}
            >
              <Zap className="w-6 h-6 text-white" />
            </div>
          </div>

          <div className="space-y-2">
            <h1
              className="text-white"
              style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
            >
              Welcome to
            </h1>
            <h2 className="text-5xl neon-text bg-gradient-to-r from-white via-purple-100 to-indigo-100 bg-clip-text text-transparent">
              {eventName}
            </h2>
          </div>
        </div>

        <p
          className="text-white"
          style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
        >
          Find your teammates and win first place!
        </p>

        <div className="space-y-3">
          <Button
            onClick={onJoin}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 border border-purple-400/30"
            size="lg"
          >
            <span className="flex items-center gap-2">
              Get Started
              <Zap className="w-4 h-4" />
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}
