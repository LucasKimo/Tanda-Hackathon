import { Loader2, Users } from 'lucide-react';

interface WaitingScreenProps {
  peopleCount: number;
}

export function WaitingScreen({ peopleCount }: WaitingScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
      <div className="max-w-md w-full text-center space-y-8">
        <Loader2 className="w-16 h-16 text-purple-400 animate-spin mx-auto" style={{ filter: 'drop-shadow(0 0 10px rgba(168, 85, 247, 0.5))' }} />
        
        <div className="space-y-3">
          <h2 className="neon-text bg-gradient-to-r from-purple-200 to-indigo-200 bg-clip-text text-transparent">Finding people for you...</h2>
          <p className="text-white" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
            We're matching you with amazing people at this event
          </p>
        </div>

        <div className="glass-card rounded-xl p-6 shadow-2xl inline-block neon-border">
          <div className="flex items-center gap-3">
            <Users className="w-6 h-6 text-purple-400" />
            <div className="text-left">
              <p className="text-slate-200">People in room</p>
              <p className="text-white" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>{peopleCount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}