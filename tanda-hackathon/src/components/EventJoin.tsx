import { Users } from 'lucide-react';
import { Button } from './ui/button';

interface EventJoinProps {
  eventName: string;
  onJoin: () => void;
}

export function EventJoin({ eventName, onJoin }: EventJoinProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="space-y-4">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto">
            <Users className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-gray-900">Welcome to</h1>
          <h2 className="text-gray-900">{eventName}</h2>
        </div>

        <p className="text-gray-600">
          Connect with amazing people at this event. Create your profile and start networking!
        </p>

        <div className="space-y-3">
          <Button onClick={onJoin} className="w-full" size="lg">
            Get Started
          </Button>
          <p className="text-gray-500">Takes 30 seconds</p>
        </div>
      </div>
    </div>
  );
}
