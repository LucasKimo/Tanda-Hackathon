import { Loader2, Users } from 'lucide-react';

interface WaitingScreenProps {
  peopleCount: number;
}

export function WaitingScreen({ peopleCount }: WaitingScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8">
        <Loader2 className="w-16 h-16 text-purple-500 animate-spin mx-auto" />
        
        <div className="space-y-3">
          <h2 className="text-gray-900">Finding people for you...</h2>
          <p className="text-gray-600">
            We're matching you with amazing people at this event
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg inline-block">
          <div className="flex items-center gap-3">
            <Users className="w-6 h-6 text-purple-500" />
            <div className="text-left">
              <p className="text-gray-600">People in room</p>
              <p className="text-gray-900">{peopleCount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
